import express from "express";
import {Subject, from} from "rxjs";
import {mergeAll} from "rxjs/operators";
import {Logger, toHtml} from "sambal";
import webpack from "webpack";
import path from "path";
import webpackDevMiddleware from "webpack-dev-middleware";
import {RenderFunction, SAMBAL_CONFIG_FILE, CACHE_FOLDER, SambalEvent} from "./constants";
import {isEntryChunk} from "./utils";
import {match, Match} from "path-to-regexp";
import nodeExternals from "webpack-node-externals";
import WebpackListenerPlugin from "./WebpackListenerPlugin";

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

class DevServer {
    private expressApp;
    private sambalConfig;
    private configReady$: Subject<SambalEvent> = new Subject<SambalEvent>();
    private compilerListener: WebpackListenerPlugin = new WebpackListenerPlugin();
    private isServerStarted: boolean = false;
    private log: Logger = new Logger({name: "devServer"});
    constructor(private port: Number) {
        
    }

    start() {
        this.expressApp = express();
        this.onChangeHandler();
        this.watchSambalConfig();
    }

    private async watchSambalConfig() {
        const configFile = `${process.cwd()}/${SAMBAL_CONFIG_FILE}`;
        const compiler = webpack({
            mode: "production",
            entry: configFile,
            target: "node",
            output: {
                path: path.resolve(process.cwd(), CACHE_FOLDER),
                filename: `sambal.config.[hash].js`,
                libraryTarget: "umd"
            },
            externals: [nodeExternals()]
        });
        
        const watching = compiler.watch({
            // Example watchOptions
            aggregateTimeout: 300,
            poll: 1000
        }, (err, stats) => { // Stats Object
            if (err) {
                this.log.error(err.stack || err.message);
                return;
            }
            const info = stats.toJson();
            if (stats.hasErrors()) {
                this.log.error(info.errors);
                return;
            }
            if (stats.hasWarnings()) {
                this.log.warn(info.warnings);
            }
            for (const asset of info.assets) {
                const entryAsset = asset.chunks.filter(chunkId => isEntryChunk(info.chunks, chunkId));
                if (entryAsset.length === 1) {
                    const configPath = path.resolve(process.cwd(), `${CACHE_FOLDER}/${asset.name}`);
                    this.sambalConfig = require(configPath);
                    this.configReady$.next({
                        type: "sambal",
                        assets: asset.name
                    });
                }
            }
        });
    }

    private addWebpackMiddleware() {
        if (!this.sambalConfig.webpack || !this.sambalConfig.webpack.entry) {
            return;
        }
    
        const compiler = webpack({
            mode: "production",
            entry: this.sambalConfig.webpack.entry,
            output: {
                publicPath: "/_sambal",
                // filename: "[name].js",
                libraryTarget: "umd"
            },
            plugins: [this.compilerListener],
            ...WEBPACK_CONFIG
        });
    
        const webpackMiddleware = webpackDevMiddleware(compiler, {
            publicPath: "/_sambal",
        });
        this.expressApp.use(webpackMiddleware);
    }

    private route(req, res) {
        if (Array.isArray(this.sambalConfig.routes)) {
            let isRendered = false;
            for (const route of this.sambalConfig.routes) {
                const matcher = match(route.path);
                const result = matcher(req.path);
                if (result) {
                    isRendered = true;
                    this.renderPage(result.path, result.params, route.render, res);
                    break;
                }
            }
            if (!isRendered) {
                res.send(`No matching route found for ${req.path}`);
            }
        } else {
            res.send("No routes found in sambal.config.js");
        }
    }

    private async renderPage(path: string, params: any, render: RenderFunction, res) {
        const obs$ = render({
            path: path,
            params: params
        });
        const html = await obs$.pipe(toHtml()).toPromise();
        res.send(html);
    }

    private onChangeHandler() {
        const events$ = from([this.configReady$, this.compilerListener.bundleChanged$]).pipe(mergeAll());
        events$.subscribe({
            next: d => {
                console.log(d);
                if (!this.isServerStarted) {
                    this.startServer();
                }
            },
            complete: () => {
                
            },
            error: (err) => {
                
            }
        });
    }

    private startServer() {
        this.isServerStarted = true;
        this.addWebpackMiddleware();
        this.expressApp.get('/*', this.route.bind(this));
        this.expressApp.listen(this.port, () => {
            this.log.info(`Dev server started on port ${this.port}`);
        });
    }
}

export default DevServer;

