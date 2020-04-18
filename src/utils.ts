import shelljs from "shelljs";
import path from "path";
import fs from "fs";
import {WebpackEntrypoints} from "./constants";
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

// webpack entry can be a string, array of strings, or an object. Normalize into object
export function getWebpackEntry(entrypoints): WebpackEntrypoints {
    const webpackEntries = {};
    if (typeof(entrypoints) === "string") {
        webpackEntries["main"] = entrypoints;
    } else if (Array.isArray(entrypoints)) {
        for (let i = 0; i < entrypoints.length; i++) {
            webpackEntries[`main${i}`] = entrypoints[i];
        }
    } else {
        for (const key of Object.keys(entrypoints)) {
            webpackEntries[key] = entrypoints[key];
        }
    }
    return webpackEntries;
}

export function parseWebpackStatsEntrypoints(entrypoints): WebpackEntrypoints {
    const entries = {};
    for (const key of Object.keys(entrypoints)) {
        const assetName = entrypoints[key].assets[0];
        entries[key] = assetName;
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
