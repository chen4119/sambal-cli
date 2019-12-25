import webpack from "webpack";
import path from "path";

const WEBPACK_CONFIG = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
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

export async function build(input: string, dest: string) {
    return new Promise<string[]>((resolve, reject) => {
        const output = path.normalize(`${dest}/${path.dirname(input)}`);
        const compiler = webpack({
            mode: "production",
            entry: input,
            output: {
                path: output,
                filename: "[name]-[hash].js",
                libraryTarget: "umd"
            },
            ...WEBPACK_CONFIG
        });

        compiler.run((err, stats) => {
            if (err) {
                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                reject(err);
                return;
            }
            const info = stats.toJson();
            if (stats.hasErrors()) {
                reject(info.errors);
                return;
            }
            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }
            resolve(info.assets.map(asset => path.join(path.dirname(input), asset.name)));
        });
    });
}