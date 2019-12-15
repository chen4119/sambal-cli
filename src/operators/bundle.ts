import {pipe} from "rxjs";
import {mergeMap} from "rxjs/operators";
import Bundler from "../Bundler";

export function bundle(bundler: Bundler) {
    return pipe(
        mergeMap(async (d: {data: any, html: CheerioStatic}) => {
            if (d.html) {
                await bundler.bundle(d.html);
            }
            return d;
        })
    );
}