import {Observable} from "rxjs";
import path from "path";
import nodeExternals from "webpack-node-externals";

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

export type JsMapping = {
    input: string,
    output: string
}

export type WebpackEntrypoints = {
    [key: string]: string
}

export type WebpackEvent = {
    type: "bundle" | "sambal",
    entries: WebpackEntrypoints,
    webpackConfig?: any
}

export const DEFAULT_SERVER_WEBPACK_CONFIG = {
    // entry: `${process.cwd()}/${SAMBAL_CONFIG_FILE}`,
    target: "node",
    output: {
        path: path.resolve(process.cwd(), CACHE_FOLDER),
        filename: `sambal.config.[hash].js`,
        libraryTarget: "umd"
    },
    externals: [nodeExternals()]
};
