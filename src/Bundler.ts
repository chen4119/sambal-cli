import {build} from "./Rollup";
import path from "path";

class Bundler {
    private bundledFileMap: Map<string, string> = new Map<string, string>(); // map a src file to dest file
    constructor(private destFolder: string) {

    }

    async bundle($: CheerioStatic) {
        const scriptSelector = 'script[src]';
        const entriesToBundle = [];
        const self = this;
        $(scriptSelector).each(function() {
            const jsFile = $(this).attr("src");
            if (!self.bundledFileMap.has(jsFile)) {
                entriesToBundle.push(jsFile);
            }
        });
        for (const entry of entriesToBundle) {
            const output = await build(entry, this.destFolder);
            self.bundledFileMap.set(entry, output);
        }
        $(scriptSelector).each(function() {
            const jsFile = $(this).attr("src");
            if (self.bundledFileMap.has(jsFile)) {
                const bundledFilePath = self.bundledFileMap.get(jsFile);
                $(this).attr("src", path.relative(self.destFolder, bundledFilePath));
            }
        });
    }
}

export default Bundler;