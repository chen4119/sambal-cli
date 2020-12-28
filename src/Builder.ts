import {Subject, pipe, empty, forkJoin, of} from "rxjs";
import {mergeMap, tap, map, filter} from "rxjs/operators";
import path from "path";
import url from "url";
import {Logger, toHtml} from "sambal";
import {Route, WebpackEntrypoints, SAMBAL_CONFIG_FILE, DEFAULT_SERVER_WEBPACK_CONFIG} from "./constants";
import {
    writeText,
    parseWebpackStatsEntrypoints,
    webpackCallback,
    mapJsEntryToWebpackOutput,
    substituteJsPath,
    getRouteMatcher
} from "./utils";
import {RenderFunction, OUTPUT_FOLDER, JsMapping} from "./constants";
import webpack from "webpack";
import Asset from "./Asset";
import {sitemap} from "./sitemap";

type RouteRenderer = {
    match: (url: string) => false | {path: string, index: number, params?: unknown},
    render: RenderFunction
};

const CHANGE_FREQ_REGEX = /^(always|hourly|daily|weekly|monthly|yearly|never)$/;

class Builder {
    private router: RouteRenderer[];
    private log: Logger;
    private asset: Asset;
    private sambalConfig;
    private siteMapSubject: Subject<any>;

    constructor(private serverWebpackConfig, private clientWebpackConfigs: any[]) {
        this.log = new Logger({name: "Builder"});
        this.router = [];
        this.siteMapSubject = new Subject();
    }

    async start() {
        await this.loadSambalConfig();
        this.buildRouter(this.sambalConfig.routes);
        const jsMapping = await this.bundle();
        sitemap(OUTPUT_FOLDER, this.sambalConfig.baseUrl, this.siteMapSubject);
        let count = 0;
        return new Promise<void>((resolve, reject) => {
            this.sambalConfig.sitemap$
            .pipe(this.parseSiteMapRoute())
            .pipe(this.routeUrl(jsMapping))
            .pipe(this.outputHtml())
            .subscribe({
                next: d => {
                    count++;
                    this.log.info("Wrote %s", d);
                },
                complete: () => {
                    this.log.info("Generated %i pages", count);
                    this.siteMapSubject.complete();
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
                matcher = getRouteMatcher(r.path);
            } catch (e) {
                throw new Error(`Invalid route path: ${r.path}`);
            }
            return {
                match: matcher,
                render: r.render
            };
        });
    }

    private async loadSambalConfig() {
        const configFile = `${process.cwd()}/${SAMBAL_CONFIG_FILE}`;
        let config: any = {
            mode: 'production',
            entry: configFile,
            ...DEFAULT_SERVER_WEBPACK_CONFIG
        };
        if (this.serverWebpackConfig) {
            config = {
                ...this.serverWebpackConfig,
                mode: 'production',
                ...DEFAULT_SERVER_WEBPACK_CONFIG
            };
        }
        const entrypoints = await this.build(config);
        this.sambalConfig = require(entrypoints.main);

        this.asset = new Asset(this.sambalConfig.asset$ ? this.sambalConfig.asset$ : empty(), OUTPUT_FOLDER);
        await this.asset.init();
        await this.asset.generate();
    }

    private async bundle(): Promise<JsMapping[]> {
        let jsMapping: JsMapping[] = [];
        for (let i = 0; i < this.clientWebpackConfigs.length; i++) {
            const webpackConfig = {
                ...this.clientWebpackConfigs[i],
                mode: 'production'
            };
            const entrypoints = await this.build(webpackConfig);
            jsMapping = jsMapping.concat(mapJsEntryToWebpackOutput(webpackConfig.entry, entrypoints));
        }
        return jsMapping;
    }

    private async build(webpackConfig) {
        return new Promise<WebpackEntrypoints>((resolve, reject) => {
            const compiler = webpack(webpackConfig);
            compiler.run(webpackCallback((err, stats) => {
                if (!err) {
                    const entrypoints = parseWebpackStatsEntrypoints(stats);
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
                this.log.warn("Invalid route from sitemap$.  Route is either a string or an url object.  See https://www.sitemaps.org/protocol.html for url properties: %j", route);
                return null;
            }),
            filter(d => d !== null)
        );
    }

    private routeUrl(jsMapping: JsMapping[]) {
        return pipe(
            mergeMap((link: any) => {
                for (const route of this.router) {
                    const result = route.match(link.loc);
                    if (result) {
                        this.siteMapSubject.next(link);
                        this.log.info("Rendering %s", link.loc);
                        return forkJoin({
                            uri: of(link.loc),
                            html: this.renderHtml(route, result.path, result.params, jsMapping)
                        })
                    }
                }
                this.log.warn("No route found for %s", link.loc);
                return empty();
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