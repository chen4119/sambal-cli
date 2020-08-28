import shelljs from "shelljs";
import path from "path";
import fs from "fs";
import {WebpackEntrypoints, JsMapping} from "./constants";
import {Logger} from "sambal";

const log = new Logger({name: "Webpack"});

export function writeText(output: string, content: string): Promise<string> {
    return new Promise((resolve, reject) => {
        shelljs.mkdir("-p", path.dirname(output));
        fs.writeFile(output, content, "utf-8", (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(output);
            }
        });
    });
}

export function writeBuffer(output: string, content: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
        shelljs.mkdir("-p", path.dirname(output));
        fs.writeFile(output, content, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(output);
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

export function parseWebpackStatsEntrypoints(stats): WebpackEntrypoints {
    const entries = {};
    for (const key of Object.keys(stats.entrypoints)) {
        const assetName = stats.entrypoints[key].assets[0];
        let outputPath = '';
        if (stats.publicPath) {
            outputPath = stats.publicPath;
        } else if (stats.outputPath) {
            outputPath = stats.outputPath;
        }
        entries[key] = (outputPath) ?  path.normalize(`${outputPath}/${assetName}`) : `/${assetName}`;
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

export function isUrl(src: string) {
    return src.startsWith("http://") || src.startsWith("https://");
}
