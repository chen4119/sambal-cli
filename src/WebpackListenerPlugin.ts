import {Subject} from "rxjs";
import {isEntryChunk} from "./utils";
import {SambalEvent} from "./constants";

class WebpackListenerPlugin {
    private emitted$: Subject<SambalEvent> = new Subject<SambalEvent>();
    constructor() {
        
    }

    get bundleChanged$(): Subject<SambalEvent> {
        return this.emitted$;
    }

    apply(compiler) {
        compiler.hooks.done.tap("WebpackListenerPlugin", stats => {
            const info = stats.toJson();
            const entries = [];
            for (const asset of info.assets) {
                const entryAsset = asset.chunks.filter(chunkId => isEntryChunk(info.chunks, chunkId));
                if (entryAsset.length === 1) {
                    entries.push(asset.name);
                }
            }
            this.emitted$.next({
                type: "bundle",
                assets: entries
            });
        });
    }
}

export default WebpackListenerPlugin;