import {Observable, from} from "rxjs";
import {mergeAll} from "rxjs/operators";
import {Packager, LinkedDataStore} from "sambal";
import {build} from "./webpack";
import path from "path";
import {flattenDeep} from "lodash";

class Builder {
    private packager: Packager;
    constructor(private store: LinkedDataStore, private route: (store: LinkedDataStore) => Observable<any> | Observable<any>[]) {
        
    }

    async webpack(src: string, destFolder: string, isModule: boolean) {
        const outputPath: string = path.resolve(process.cwd(), destFolder);
        return await build(src, outputPath);
    }

    async start() {
        const obs$ = this.route(this.store);
        const source = from(flattenDeep([obs$])).pipe(mergeAll());
        this.packager = new Packager(source, {bundle: this.webpack});
        const deliveryFuture = this.packager.deliver();
        this.store.start();
        await deliveryFuture;
    }
}

export default Builder;