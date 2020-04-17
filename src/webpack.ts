import webpack from "webpack";
import path from "path";
import {Logger} from "sambal";

const log = new Logger({name: "Webpack"});
export const WEBPACK_CONFIG = {
    module: {
        rules: [
            /*
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },*/
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                // Apply rule for fonts files
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    }
};

export async function webpackBuild(webpackConfig, dest: string) {
    if (!webpackConfig || !webpackConfig.entry) {
        return [];
    }
    if (typeof(webpackConfig.entry) === "string") {
        return build(webpackConfig.entry, dest);
    } else if (Array.isArray(webpackConfig.entry)) {
        let outputs = [];
        for (const input of webpackConfig.entry) {
            const output = await build(input, dest);
            outputs = outputs.concat(output);
        }
        return outputs;
    } else if (typeof(webpackConfig.entry) === "object") {
        let outputs = {};
        for (const fieldName in webpackConfig.entry) {
            const output = await build(webpackConfig.entry[fieldName], dest);
            outputs[fieldName] = output;
        }
        return outputs;
    }
}

async function build(input: string, dest: string) {
    return new Promise<string[]>((resolve, reject) => {
        const output = path.normalize(`${dest}/${path.dirname(input)}`);
        const compiler = webpack({
            mode: "production",
            entry: input,
            output: {
                path: output,
                publicPath: `/${path.dirname(input)}/`,
                filename: "[name]-[hash].js",
                libraryTarget: "umd"
            },
            ...WEBPACK_CONFIG
        });

        compiler.run((err, stats) => {
            if (err) {
                log.error(err.stack || err.message);
                reject(err);
                return;
            }
            const info = stats.toJson();
            if (stats.hasErrors()) {
                reject(info.errors);
                return;
            }
            if (stats.hasWarnings()) {
                log.warn(info.warnings);
            }
            for (const asset of info.assets) {
                const entryAsset = asset.chunks.filter(chunkId => isEntryChunk(info.chunks, chunkId));
                if (entryAsset.length === 1) {
                    resolve([`/${path.join(path.dirname(input), asset.name)}`]);
                    return;
                }
            }
            reject("No entry asset found"); // Should not happen
        });
    });
}

function isEntryChunk(chunks, chunkId) {
    for (const chunk of chunks) {
        if (chunk.id === chunkId && chunk.entry) {
            return true;
        }
    }
    return false;
}