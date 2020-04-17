import shelljs from "shelljs";
import path from "path";
import fs from "fs";

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

export function isEntryChunk(chunks, chunkId) {
    for (const chunk of chunks) {
        if (chunk.id === chunkId && chunk.entry) {
            return true;
        }
    }
    return false;
}