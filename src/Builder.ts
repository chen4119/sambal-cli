import {Observable, pipe, empty, forkJoin, of} from "rxjs";
import {mergeMap, share, map, filter} from "rxjs/operators";
import path from "path";
import url from "url";
import {Logger, toHtml} from "sambal";
import {Route, WebpackEntrypoints} from "./constants";
import {match, Match} from "path-to-regexp";
import {writeText, parseWebpackStatsEntrypoints, webpackCallback, mapJsEntryToWebpackOutput, substituteJsPath} from "./utils";
import {RenderFunction, OUTPUT_FOLDER, JsMapping} from "./constants";
import webpack from "webpack";
import Asset from "./Asset";
import {sitemap} from "./sitemap";

type RouteRenderer = {
    match: (url: string) => Match<object>,
    render: RenderFunction
};

const CHANGE_FREQ_REGEX = /^(always|hourly|daily|weekly|monthly|yearly|never)$/;

class Builder {
    private router: RouteRenderer[] = [];
    private log: Logger = new Logger({name: "Builder"});
    private asset: Asset;

    constructor(private baseUrl, private webpackConfig, asset$: Observable<any>) {
        this.asset = new Asset(asset$ ? asset$ : empty(), OUTPUT_FOLDER);
    }

    async start(sitemap$: Observable<any>, routes: Route[]) {
        this.buildRouter(routes);
        await this.asset.init();
        await this.asset.generate();
        const jsMapping = await this.bundle();
        let count = 0;
        return new Promise<void>((resolve, reject) => {
            sitemap$
            .pipe(this.routeUrl(jsMapping))
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

    private async bundle(): Promise<JsMapping[]> {
        if (!this.webpackConfig) {
            return [];
        }
        const output = await this.build();
        return mapJsEntryToWebpackOutput(this.webpackConfig.entry, output);
    }

    private async build() {
        return new Promise<WebpackEntrypoints>((resolve, reject) => {
            const compiler = webpack(this.webpackConfig);
            compiler.run(webpackCallback((err, stats) => {
                if (!err) {
                    const entrypoints = parseWebpackStatsEntrypoints(this.webpackConfig.output, stats.entrypoints);
                    resolve(entrypoints);
                } else {
                    reject(err);
                }
            }));
        });
    }

    private isDate(obj: any) {
        return typeof(obj) === "object" && Object.getPrototypeOf(obj) === Date.prototype;
    }

    private parseSiteMapRoute() {
        return pipe(
            map((route: any) => {
                if (typeof(route) === "string") {
                    return {loc: route};
                } else if (route.loc) {
                    const validatedRoute: any = {loc: route.loc};
                    if (this.isDate(route.lastmod)) {
                        validatedRoute.lastmod = route.lastmod;
                    }
                    if (route.changefreq && CHANGE_FREQ_REGEX.test(route.changefreq)) {
                        validatedRoute.changefreq = route.changefreq;
                    }
                    if (typeof(route.priority) === "number" && route.priority >= 0 && route.priority <= 1) {
                        validatedRoute.priority = route.priority;
                    }
                    return validatedRoute;
                }
                this.log.warn("Ignoring invalid route from sitemap$.  Route is either a string or an url object.  See https://www.sitemaps.org/protocol.html for url properties");
                this.log.warn(route);
                return null;
            }),
            filter(d => d !== null)
        );
    }

    private routeUrl(jsMapping: JsMapping[]) {
        return pipe(
            mergeMap((link: any) => {
                const url = this.getUrl(link);
                for (const route of this.router) {
                    const result = route.match(url);
                    if (result) {
                        this.log.info(`Rendering ${url}`);
                        return forkJoin({
                            uri: of(url),
                            html: this.renderHtml(route, result.path, result.params, jsMapping)
                        })
                    }
                }
                this.log.warn(`No route found for ${url}`);
                return empty()
            })
        );
    }

    //TODO: after render, toSchemaOrg to render sitemap or atom feed
    private renderHtml(route, path, params, jsMapping: JsMapping[]) {
        return route
        .render({path: path, params: params})
        .pipe(toHtml({
            editAttribs: (name, attribs) => {
                if (name === 'script' && attribs.src) {
                    return {
                        src: substituteJsPath(jsMapping, attribs.src)
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
        return await writeText(output, content);
    }
}

export default Builder;