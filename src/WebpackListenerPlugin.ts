import {Subject} from "rxjs";
import {parseWebpackStatsEntrypoints} from "./utils";
import {WebpackEvent} from "./constants";

class WebpackListenerPlugin {
    private emitted$: Subject<WebpackEvent> = new Subject<WebpackEvent>();
    constructor(private webpackConfig: any) {
        
    }

    get bundleChanged$(): Subject<WebpackEvent> {
        return this.emitted$;
    }

    apply(compiler) {
        compiler.hooks.done.tap("WebpackListenerPlugin", stats => {
            const info = stats.toJson();
            this.emitted$.next({
                type: "bundle",
                entries: parseWebpackStatsEntrypoints(stats.toJson()),
                webpackConfig: this.webpackConfig
            });
        });
    }
}

export default WebpackListenerPlugin;