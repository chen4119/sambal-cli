import crypto from "crypto";
import path from "path";
import url from "url";
import {Logger} from "sambal";
import {Observable, pipe, from} from "rxjs";
import {mergeMap, mergeAll, map, toArray, filter, tap} from "rxjs/operators";
import sharp, { OutputInfo, Sharp } from "sharp";
import {writeBuffer, isUrl} from "./utils";
import axios from "axios";

type AssetDef = {
    src: string,
    // alt?: string,
    dest?: string,
    responsive: {
        srcset: string,
        media?: string,
        sizes?: string,
        type?: string
    }[]
};

type ImageTransform = {
    src: string,
    dest?: string,
    width?: number,
    resolution?: number
};

class Asset {
    private log: Logger;
    private assets: AssetDef[];
    private imageTransforms: ImageTransform[];
    constructor(private asset$: Observable<any>, private outputFolder) {
        this.log = new Logger({name: "Asset"});
        this.assets = [];
        this.imageTransforms = [];
    }

    async init() {
        await this.parseAsset$();
        await this.getTransforms();
    }

    get transforms() {
        return this.imageTransforms;
    }

    private async parseAsset$() {
        this.assets = await this.asset$
        .pipe(this.parseAssetConfig())
        .pipe(toArray())
        .toPromise();
    }

    private async getTransforms() {
        this.imageTransforms = await from(this.assets)
        .pipe(map(asset => {
            let transformations = [];
            let dest = this.getDestPath(asset.src, asset.dest);
            transformations.push({
                src: asset.src,
                dest: dest
            });
            for (const source of asset.responsive) {
                transformations = transformations.concat(this.parseSrcSet(asset.src, source.srcset));
            }
            return from(transformations);
        }))
        .pipe(mergeAll())
        .pipe(toArray())
        .toPromise();
    }

    async generate() {
        return from(this.imageTransforms)
            .pipe(mergeMap(task => from([this.transformImage(task)])))
            .pipe(mergeAll(2))
            .pipe(mergeMap(transform => {
                if (transform.task.dest.indexOf("[hash]") >= 0) {
                    const hash = crypto.createHash('md5').update(transform.buffer).digest('hex');
                    transform.task.dest = transform.task.dest.replace("[hash]", hash);
                }
                return from([writeBuffer(transform.task.dest, transform.buffer)]);
            }))
            .pipe(mergeAll(2))
            .pipe(tap(output => this.log.info(`Emitted ${output}`)))
            .toPromise();
    }

    async getAsset(src: string): Promise<Buffer> {
        const normalizedPath = path.normalize(path.join(this.outputFolder, src));
        for (const transform of this.imageTransforms) {
            if (transform.dest === normalizedPath) {
                const result = await this.transformImage(transform);
                return result.buffer;
            }
        }
        return null;
    }

    // file1.jpg 240w, file2.jpg 2x, file3.png
    private parseSrcSet(src: string, srcset: string): ImageTransform[] {
        const transforms: ImageTransform[] = [];
        const sources = srcset.split(",");
        for (const source of sources) {
            const splitted = source.trim().split(/[ ]+/);
            const dest = this.getDestPath(src, splitted[0]);
            if (!Asset.isValidAsset(dest)) {
                this.log.warn(`Unsupported file format ${dest}`);
                continue;
            }
            if (splitted.length === 2) {
                const suffix = splitted[1];
                if (suffix.endsWith("w")) {
                    transforms.push({
                        src: src,
                        dest: dest,
                        width: Number(suffix.substring(0, suffix.length - 1))
                    });
                } else if (suffix.endsWith("x")) {
                    transforms.push({
                        src: src,
                        dest: dest,
                        resolution: Number(suffix.substring(0, suffix.length - 1))
                    });
                } 
            } else {
                transforms.push({
                    src: src,
                    dest: dest
                });
            }
        }
        return transforms;
    }

    private getDestPath(src: string, dest: string) {
        if (dest) {
            return path.normalize(path.join(this.outputFolder, dest));
        } else if (isUrl(src)) {
            const uriPath = url.parse(src).pathname;
            return path.normalize(path.join(this.outputFolder, uriPath));
        }
        return path.normalize(path.join(this.outputFolder, src));
    }

    private parseAssetConfig() {
        return pipe(
            map((asset: any) => {
                if (typeof(asset) === "string") {
                    return {
                        src: asset,
                        responsive: []
                    };
                } else if (asset.src && Asset.isValidAsset(asset.src)) {
                    return {
                        ...asset,
                        responsive: asset.responsive ? 
                            this.parseResponsiveConfig(asset.responsive) : []
                    };
                }
                this.log.warn("Ignore asset, unsupported src");
                this.log.warn(asset);
            }),
            filter(d => d !== null)
        );
    }

    static isValidAsset(src: string): boolean {
        return /\.(png|jpe?g|gif|svg|webp)$/i.test(src);
    }

    private parseResponsiveConfig(responsive: any) {
        const validSources = [];
        for (const source of responsive) {
            if (source.srcset) {
                validSources.push({...source});
            } else {
                this.log.warn("Ignore responsive source config, no srcset found");
                this.log.warn(source);
            }
        }
        return validSources;
    }

    private async getSource(src: string): Promise<string | Buffer> {
        if (isUrl(src)) {
            const response = await axios.get(src, {
                responseType: 'arraybuffer'
            });
            return Buffer.from(response.data, 'binary');
        }
        return src;
    }

    private async transformImage(task: ImageTransform): Promise<{task: ImageTransform, buffer: Buffer}> {
        return new Promise(async (resolve, reject) => {
            try {
                let instance = sharp(await this.getSource(task.src));
                if (task.width) {
                    instance.resize(task.width, null);
                }
                instance = this.outputToFormat(instance, task.src, task.dest);
                instance.toBuffer((err: Error, buffer: Buffer, info: OutputInfo) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({task: task, buffer: buffer});
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    private outputToFormat(instance: Sharp, src: string, dest: string) {
        const srcExt = path.extname(src).toLowerCase();
        const destExt = path.extname(dest).toLowerCase();
        if (srcExt === destExt) {
            return instance; // do nothing
        }
        switch (destExt) {
            case "jpeg":
            case "jpg":
                return instance.jpeg();
            case "webp":
                return instance.webp();
            case "png":
                return instance.png();
            default:
                return instance;
        }
    }
}

export default Asset;
