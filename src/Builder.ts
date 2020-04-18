import {Observable, pipe, empty} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";
import path from "path";
import url from "url";
import {Logger, dom, toHtml} from "sambal";
import {Route} from "./constants";
import {match, Match} from "path-to-regexp";
import {writeFile, getWebpackEntry, parseWebpackStatsEntrypoints, webpackCallback} from "./utils";
import {RenderFunction, OUTPUT_FOLDER, WEBPACK_RULES} from "./constants";
import prettier from "prettier";
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
    private prettyHtml: Boolean = true;
    private log: Logger = new Logger({name: "Builder"});
    constructor(private sitemap$: Observable<any>, private routes: Route[], private webpackConfig) {
        this.router = this.routes.map(r => ({
            match: match(r.path),
            render: r.render
        }));
    }

    async start() {
        const jsEntries = await this.bundle();
        return new Promise<void>((resolve, reject) => {
            this.sitemap$
            .pipe(this.renderHtml())
            .pipe(this.outputHtml(jsEntries))
            .subscribe({
                next: d => console.log(d),
                complete: () => {
                    resolve();
                },
                error: (err) => {
                    reject(err);
                }
            });
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

    private renderHtml() {
        return pipe(
            mergeMap((link: any) => {
                const url = this.getUrl(link);
                for (const route of this.router) {
                    const result = route.match(url);
                    if (result) {
                        return route.render({path: result.path, params: result.params});
                    }
                }
                return empty()
            })
        );
    }

    private outputHtml(jsEntries: JsEntries) {
        let dataURI;
        return pipe(
            tap((d: any) => dataURI = d.url),
            dom(($) => {
                const scriptSelector = "script[src]";
                const clazz = this;
                $(scriptSelector).each(function() {
                    const jsFile = $(this).attr("src");
                    $(this).attr("src", clazz.substituteJsPath(jsEntries, jsFile));
                });
            }),
            toHtml(),
            mergeMap(async (html: string) => {
                let prettyHtml = html;
                if (this.prettyHtml) {
                    prettyHtml = prettier.format(html, {parser: "html"});
                }
                const uriPath = url.parse(dataURI).pathname;
                return await this.write(path.join(OUTPUT_FOLDER, uriPath), prettyHtml);
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
        await writeFile(output, content);
        return output;
    }
}

export default Builder;