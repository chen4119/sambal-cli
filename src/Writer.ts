import path from "path";
import crypto from "crypto";
import shelljs from "shelljs";
import prettier from "prettier";
import fs from "fs";

export function clean(folder: string) {
    shelljs.rm("-rf", folder);
}

export async function write(dest: string, content: string) {
    const ext = path.extname(dest).toLowerCase();
    let output = path.normalize(`${dest}/index.html`);
    if (ext === '.html' || ext === '.htm') {
        output = path.normalize(`${dest}`);
    }
    await ensureDirectoryExistThenWriteFile(output, content);
    return output;
}

async function writeFile(output: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(output, content, "utf-8", (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function ensureDirectoryExistThenWriteFile(output: string, content: string) {
    shelljs.mkdir("-p", path.dirname(output));
    return writeFile(output, content);
}
