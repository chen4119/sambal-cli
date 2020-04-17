import {Observable, pipe, empty} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";
// import {build} from "./webpack";
import path from "path";
import {flattenDeep} from "lodash";
import {Logger, toHtml} from "sambal";
import {Route} from "./constants";
import {match, Match} from "path-to-regexp";
import {writeFile} from "./utils";
import {RenderFunction} from "./constants";
import prettier from "prettier";

type RouteRenderer = {
    match: (url: string) => Match<object>,
    render: RenderFunction
};

class Builder {
    private router: RouteRenderer[] = [];
    private prettyHtml: Boolean = true;
    constructor(private log: Logger, private sitemap$: Observable<any>, private routes: Route[], webpackConfig) {
        this.router = this.routes.map(r => ({
            match: match(r.path),
            render: r.render
        }));
    }

    async start() {
        return new Promise<void>((resolve, reject) => {
            this.sitemap$
            .pipe(this.renderHtml())
            .pipe(this.outputHtml())
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

    private outputHtml() {
        return pipe(
            tap(d => console.log(d)),
            toHtml(),
            mergeMap(async (html: string) => {
                let prettyHtml = html;
                if (this.prettyHtml) {
                    prettyHtml = prettier.format(html, {parser: "html"});
                }
                return prettyHtml;
                // const uriPath = getUriPath(sambalInternal.base, sambalInternal.uri, d);
                // return await this.write(path.join(OUTPUT_FOLDER, uriPath), html);
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
        await writeFile(output, content);
        return output;
    }

    /*
    async webpack(src: string, destFolder: string, isModule: boolean) {
        const outputPath: string = path.resolve(process.cwd(), destFolder);
        return await build(src, outputPath);
    }

    async start() {
        const obs$ = await this.route$(this.store);
        const source = from(flattenDeep([obs$])).pipe(mergeAll());
        this.packager = new Packager(source, {bundle: this.webpack});
        const deliveryFuture = this.packager.deliver();
        this.store.start();
        await deliveryFuture;
    }*/
}

export default Builder;