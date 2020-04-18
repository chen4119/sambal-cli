import {Observable} from "rxjs";

export const CACHE_FOLDER = "./.sambal/.temp";
export const OUTPUT_FOLDER = "./public";
export const SAMBAL_CONFIG_FILE = "sambal.config.js";
export const WEBSOCKET_ADDR = "ws://localhost:3001/";

interface RenderProps {
    path: string,
    params?: any
};

export type RenderFunction = (props: RenderProps) => Observable<any>;

export type Route = {
    path: string,
    render: RenderFunction
};

export type WebpackEntrypoints = {
    [key: string]: string
}

export type WebpackEvent = {
    type: "bundle" | "sambal",
    entries: WebpackEntrypoints
}

export const WEBPACK_RULES = {
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