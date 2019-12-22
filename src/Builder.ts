import {Observable, from} from "rxjs";
import {mergeAll} from "rxjs/operators";
import {Packager, LinkedDataStore, OUTPUT_FOLDER} from "sambal";
import {build} from "./Rollup";

class Builder {
    private packager: Packager;
    constructor(private store: LinkedDataStore, private route: (store: LinkedDataStore) => Observable<any> | Observable<any>[]) {
        
    }

    async rollup(src: string) {
        return await build(src, OUTPUT_FOLDER);
    }

    async start() {
        const obs$ = this.route(this.store);
        let source;
        if (Array.isArray(obs$)) {
            source = from(obs$).pipe(mergeAll());
        } else {
            source = obs$;
        }
        this.packager = new Packager(source, {bundle: this.rollup});
        await this.packager.deliver();
    }
}

export default Builder;