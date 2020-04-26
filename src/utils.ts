import shelljs from "shelljs";
import path from "path";
import fs from "fs";
import {WebpackEntrypoints, JsMapping} from "./constants";
import {Logger} from "sambal";

const log = new Logger({name: "Webpack"});

export function writeFile(output: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
        shelljs.mkdir("-p", path.dirname(output));
        fs.writeFile(output, content, "utf-8", (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function mapJsEntryToWebpackOutput(entry, webpackOutput: WebpackEntrypoints): JsMapping[] {
    const mapping: JsMapping[] = [];
    if (typeof(entry) === "string") {
        mapping.push({
            input: entry,
            output: webpackOutput.main
        });
    } else if (Array.isArray(entry)) {
        for (let i = 0; i < entry.length; i++) {
            mapping.push({
                input: entry[i],
                output: webpackOutput.main
            });
        }
    } else {
        for (const key of Object.keys(entry)) {
            mapping.push({
                input: entry[key],
                output: webpackOutput[key]
            });
        }
    }
    return mapping;
}

export function substituteJsPath(jsMapping: JsMapping[], src: string) {
    const srcPath = path.resolve(process.cwd(), src);
    for (const map of jsMapping) {
        const filePath = path.resolve(process.cwd(), map.input);
        if (srcPath === filePath) {
            return map.output;
        }
    }
    return src;
}

export function parseWebpackStatsEntrypoints(output, entrypoints): WebpackEntrypoints {
    const entries = {};
    for (const key of Object.keys(entrypoints)) {
        const assetName = entrypoints[key].assets[0];

        entries[key] = (output && output.publicPath) ?  path.normalize(`${output.publicPath}/${assetName}`) : `/${assetName}`;
    }
    return entries;
}

export function webpackCallback(callback) {
    return (err, stats) => {
        const info = stats.toJson();
        if (err) {
            log.error(err.stack || err.message);
            callback(err, info);
            return;
        }
        if (stats.hasErrors()) {
            log.error(info.errors);
            callback(info.errors, info);
            return;
        }
        if (stats.hasWarnings()) {
            log.warn(info.warnings);
        }
        callback(null, info);
    };
}
