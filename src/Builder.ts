import {Observable, pipe, empty, forkJoin, of} from "rxjs";
import {mergeMap} from "rxjs/operators";
import path from "path";
import url from "url";
import {Logger, toHtml} from "sambal";
import {Route} from "./constants";
import {match, Match} from "path-to-regexp";
import {writeFile, getWebpackEntry, parseWebpackStatsEntrypoints, webpackCallback} from "./utils";
import {RenderFunction, OUTPUT_FOLDER, WEBPACK_RULES} from "./constants";
import webpack from "webpack";

type RouteRenderer = {
    match: (url: string) => Match<object>,
    render: RenderFunction
};

type JsEntries = {
    [key: string]: {
        input: string,
        output: string
    }
}

class Builder {
    private router: RouteRenderer[] = [];
    private log: Logger = new Logger({name: "Builder"});
    constructor(private webpackConfig) {

    }

    async start(sitemap$: Observable<any>, routes: Route[]) {
        this.buildRouter(routes);
        const jsEntries = await this.bundle();
        let count = 0;
        return new Promise<void>((resolve, reject) => {
            sitemap$
            .pipe(this.routeUrl(jsEntries))
            .pipe(this.outputHtml())
            .subscribe({
                next: d => {
                    count++;
                    this.log.info(`Wrote ${d}`);
                },
                complete: () => {
                    this.log.info(`Generated ${count} pages`);
                    resolve();
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }

    private buildRouter(routes: Route[]) {
        this.router = routes.map(r => {
            let matcher;
            try {
                matcher = match(r.path);
            } catch (e) {
                throw new Error(`Invalid route path: ${r.path}`);
            }
            return {
                match: matcher,
                render: r.render
            };
        });
    }

    private async bundle(): Promise<JsEntries> {
        const entries = {};
        if (!this.webpackConfig || !this.webpackConfig.entry) {
            return entries;
        }
        const webpackEntry = getWebpackEntry(this.webpackConfig.entry);
        for (const fieldName in webpackEntry) {
            const input = webpackEntry[fieldName];
            this.log.info(`Bundling ${input}`);
            const output = await this.build(input);
            entries[fieldName] = {
                input: input,
                output: output
            };
        }
        return entries;
    }
    
    private async build(input: string) {
        return new Promise<string>((resolve, reject) => {
            const dest = path.resolve(process.cwd(), OUTPUT_FOLDER);
            const output = path.normalize(`${dest}/${path.dirname(input)}`);
            const compiler = webpack({
                mode: "production",
                entry: input,
                output: {
                    path: output,
                    publicPath: `/${path.dirname(input)}/`,
                    filename: "[name]-[hash].js",
                    libraryTarget: "umd"
                },
                ...WEBPACK_RULES
            });
    
            compiler.run(webpackCallback((err, stats) => {
                if (!err) {
                    const entrypoints = parseWebpackStatsEntrypoints(stats.entrypoints);
                    resolve(`/${path.join(path.dirname(input), entrypoints.main)}`);
                } else {
                    reject(err);
                }
            }));
        });
    }

    private routeUrl(jsEntries: JsEntries) {
        return pipe(
            mergeMap((link: any) => {
                const url = this.getUrl(link);
                for (const route of this.router) {
                    const result = route.match(url);
                    if (result) {
                        this.log.info(`Rendering ${url}`);
                        return forkJoin({
                            uri: of(url),
                            html: this.renderHtml(route, result.path, result.params, jsEntries)
                        })
                    }
                }
                this.log.warn(`No route found for ${url}`);
                return empty()
            })
        );
    }

    private renderHtml(route, path, params, jsEntries: JsEntries) {
        return route
        .render({path: path, params: params})
        .pipe(toHtml({
            editAttribs: (name, attribs) => {
                if (name === 'script' && attribs.src) {
                    return {
                        src: this.substituteJsPath(jsEntries, attribs.src)
                    };
                }
                return attribs;
            }
        }))
        .toPromise();
    }

    private outputHtml() {
        return pipe(
            mergeMap(async (d: {uri: string, html: string}) => {
                const uriPath = url.parse(d.uri).pathname;
                return await this.write(path.join(OUTPUT_FOLDER, uriPath), d.html);
            })
        );
    }

    private substituteJsPath(jsEntries: JsEntries, src: string) {
        const srcPath = path.resolve(process.cwd(), src);
        for (const key of Object.keys(jsEntries)) {
            const filePath = path.resolve(process.cwd(), jsEntries[key].input);
            if (srcPath === filePath) {
                return jsEntries[key].output;
            }
        }
        return src;
    }

    private getUrl(route: any) {
        if (typeof(route) === "object") {
            return route.url;
        }
        return route;
    }

    private async write(dest: string, content: string) {
        const ext = path.extname(dest).toLowerCase();
        let output = dest;
        if (ext !== '.html' && ext !== '.htm') {
            output = `${dest}/index.html`;
        }
        output = path.normalize(output);
        await writeFile(output, content);
        return output;
    }
}

export default Builder;