import {Observable, Subject, Subscriber} from "rxjs";
import anymatch from "anymatch";
import url from "url";
import {OUTPUT_PATH} from "./Constants";
import Bundler from "./Bundler";
import {bundle} from "./operators/bundle";
import {write} from "./Writer";

type callbackFn = (obs: Observable<any>) => Observable<any>;
type route = {
    matcher: string | string[],
    subject: Subject<any>,
    pageSize?: number
}
class Router {
    private pageRoutes: route[] = [];
    private collectionRoutes: route[] = [];
    private bundler = new Bundler(OUTPUT_PATH);

    renderPage(matcher: string | string[], callback: callbackFn) {
        const routeSubject = new Subject();
        const obs = callback(routeSubject);
        if (obs) {
            this.subscribeToRoute(obs);
        }
        this.pageRoutes.push({
            matcher: matcher,
            subject: routeSubject
        });
    }

    renderCollection(name: string, callback: callbackFn, pageSize?: number) {
        const routeSubject = new Subject();
        const obs = callback(routeSubject);
        if (obs) {
            this.subscribeToRoute(obs);
        }
        this.collectionRoutes.push({
            matcher: name,
            subject: routeSubject,
            pageSize: pageSize
        });
    }

    private subscribeToRoute(routeObs: Observable<any>) {
        routeObs
        .pipe(bundle(this.bundler))
        .subscribe(d => {
            const output = `${OUTPUT_PATH}/${this.getUriPathname(d.data)}`;
            write(output, d.html.html());
        });
    }

    private getUriPathname(data: any) {
        return url.parse(data.id).pathname;
    }

    get collectionsToRun(): string[] {
        return this.collectionRoutes.map(r => String(r.matcher));
    }
    
    pages(): Subscriber<any> {
        return Subscriber.create(
            (data:any) => {
                for (const route of this.pageRoutes) {
                    const pathname = this.getUriPathname(data);
                    if (anymatch(route.matcher, pathname)) {
                        route.subject.next(data);
                    } else {
                        console.log("did not match " + route.matcher + " " + pathname);
                    }
                }
            },
            (err: any) => {
                for (const route of this.pageRoutes) {
                    route.subject.error(err);
                }
            },
            () => {
                for (const route of this.pageRoutes) {
                    route.subject.complete();
                }
            }
        );
    }

    collection(name: string): Subscriber<any> {
        return Subscriber.create(
            (data:any) => {
                for (const route of this.collectionRoutes) {
                    if (route.matcher === name) {
                        route.subject.next(data);
                    }
                }
            },
            (err: any) => {
                for (const route of this.collectionRoutes) {
                    if (route.matcher === name) {
                        route.subject.error(err);
                    }
                }
            },
            () => {
                for (const route of this.collectionRoutes) {
                    if (route.matcher === name) {
                        route.subject.complete();
                    }
                }
            }
        );
    }
    
}

export default Router;