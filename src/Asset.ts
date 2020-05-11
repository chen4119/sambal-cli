import crypto from "crypto";
import path from "path";
import url from "url";
import {Logger} from "sambal";
import {Observable, pipe, from} from "rxjs";
import {mergeMap, mergeAll, map, toArray, filter} from "rxjs/operators";
import sharp, { OutputInfo, Sharp } from "sharp";
import {writeBuffer, isUrl} from "./utils";


type AssetDef = {
    src: string,
    alt?: string,
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
    dest: string,
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
        return new Promise<void>((resolve, reject) => {
            from(this.imageTransforms)
            .pipe(mergeMap(task => from([this.transformImage(task.src, task.dest, task.width)])))
            .pipe(mergeAll(2))
            .pipe(mergeMap(transform => {
                if (transform.dest.indexOf("[hash]") >= 0) {
                    const hash = crypto.createHash('md5').update(transform.buffer).digest('hex');
                    transform.dest = transform.dest.replace("[hash]", hash);
                }
                return from([writeBuffer(transform.dest, transform.buffer)]);
            }))
            .pipe(mergeAll(2))
            .subscribe({
                next: output => {
                    this.log.info(`Emitted ${output}`);
                },
                complete: () => {
                    resolve();
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }

    async getAsset(src: string): Promise<Buffer> {
        const normalizedPath = path.normalize(path.join(this.outputFolder, src));
        for (const transform of this.imageTransforms) {
            if (transform.dest === normalizedPath) {
                const result = await this.transformImage(transform.src, transform.dest, transform.width);
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
            const splitted = source.split(/[ ]+/);
            const dest = this.getDestPath(src, splitted[0]);
            if (!Asset.isValidAsset(dest)) {
                this.log.warn(`Unsupported file format ${dest}`);
                continue;
            }
            if (splitted.length === 2) {
                if (splitted[1].endsWith("w")) {
                    transforms.push({
                        src: src,
                        dest: dest,
                        width: Number(splitted[1].substring(0, splitted[1].length - 1))
                    });
                } else if (splitted[1].endsWith("x")) {
                    transforms.push({
                        src: src,
                        dest: dest,
                        resolution: Number(splitted[1].substring(0, splitted[1].length - 1))
                    });
                } 
            }
            transforms.push({
                src: src,
                dest: dest
            });
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

    private getSource(src: string): string | Buffer {
        return src;
    }

    private async transformImage(src: string, dest: string, width?: number): Promise<{dest: string, buffer: Buffer}> {
        return new Promise((resolve, reject) => {
            let instance = sharp(this.getSource(src));
            if (width) {
                instance.resize(width, null);
            }
            instance = this.outputToFormat(instance, src, dest);
            instance.toBuffer((err: Error, buffer: Buffer, info: OutputInfo) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({dest: dest, buffer: buffer});
                }
            });
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
