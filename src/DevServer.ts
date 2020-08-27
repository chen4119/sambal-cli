import express from "express";
import {Subject, from, pipe, empty} from "rxjs";
import {mergeAll, map} from "rxjs/operators";
import {Logger, toHtml} from "sambal";
import webpack from "webpack";
import path from "path";
import shelljs from "shelljs";
import webpackDevMiddleware from "webpack-dev-middleware";
import {
    RenderFunction,
    SAMBAL_CONFIG_FILE,
    CACHE_FOLDER,
    WebpackEvent,
    WEBSOCKET_ADDR,
    JsMapping,
    DEFAULT_SERVER_WEBPACK_CONFIG
} from "./constants";
import {parseWebpackStatsEntrypoints, webpackCallback, mapJsEntryToWebpackOutput, substituteJsPath} from "./utils";
import {match, Match} from "path-to-regexp";
import WebpackListenerPlugin from "./WebpackListenerPlugin";
import WebSocket from "ws";
import Asset from "./Asset";

const PUBLIC_PATH = "/_sambal";
const CMD_REFRESH = "refresh";

class DevServer {
    private expressApp;
    private sambalConfig;
    private webSocketServer: WebSocket.Server;
    private jsMapping: JsMapping[];
    private configReady$: Subject<WebpackEvent>;
    private compilerListeners: WebpackListenerPlugin[];
    private isServerStarted: boolean;
    private isSambalBundled: boolean;
    private asset: Asset;
    private log: Logger;
    constructor(private serverWebpackConfig, private clientWebpackConfigs: any[], private port: Number) {
        this.log = new Logger({name: "Dev Server"});
        this.configReady$ = new Subject<WebpackEvent>();
        this.compilerListeners = [];
        this.isServerStarted = false;
        this.isSambalBundled = false;
    }

    start() {
        shelljs.rm("-rf", CACHE_FOLDER);
        this.expressApp = express();
        this.startWebSocket();
        this.onSambalConfigChanged();
        this.watchSambalConfig();
    }

    private async watchSambalConfig() {
        const configFile = `${process.cwd()}/${SAMBAL_CONFIG_FILE}`;
        let config: any = {
            mode: 'development',
            entry: configFile,
            ...DEFAULT_SERVER_WEBPACK_CONFIG
        };
        if (this.serverWebpackConfig) {
            config = {
                ...this.serverWebpackConfig,
                mode: 'development',
                ...DEFAULT_SERVER_WEBPACK_CONFIG
            };
        }
        const compiler = webpack(config);
        
        const watching = compiler.watch({
            aggregateTimeout: 300,
            poll: 1000
        }, webpackCallback(async (err, stats) => {
            if (!err) {
                const entrypoints = parseWebpackStatsEntrypoints({publicPath: `/${CACHE_FOLDER}`}, stats.entrypoints);
                const configPath = path.resolve(process.cwd(), `./${entrypoints.main}`);
                this.sambalConfig = require(configPath);
                this.asset = new Asset(this.sambalConfig.asset$ ? this.sambalConfig.asset$ : empty(), PUBLIC_PATH);
                await this.asset.init();
                this.configReady$.next({
                    type: "sambal",
                    entries: entrypoints
                });
            }
        }));
    }

    private startWebSocket() {
        this.webSocketServer = new WebSocket.Server({
            port: 3001
        });
        /*
        this.webSocketServer.on('connection', (ws) => {
            console.log("connected");
            this.webSocket = ws;
        });*/
    }

    private addWebpackMiddleware() {
        if (this.clientWebpackConfigs.length === 0) {
            return;
        }
        const configs = [];
        for (let i = 0; i < this.clientWebpackConfigs.length; i++) {
            const webpackConfig = {
                ...this.clientWebpackConfigs[i],
                mode: 'development',
                output: {
                    ...this.clientWebpackConfigs[i].output,
                    publicPath: PUBLIC_PATH
                },
                plugins: [
                    ...this.clientWebpackConfigs[i].plugins
                ]
            };
            const listener = new WebpackListenerPlugin(PUBLIC_PATH, webpackConfig);
            this.compilerListeners.push(listener);
            webpackConfig.plugins.push(listener);
            configs.push(webpackConfig);
        }
        const compiler = webpack(configs);
    
        const webpackMiddleware = webpackDevMiddleware(compiler, {
            publicPath: PUBLIC_PATH,
        });
        this.expressApp.use(webpackMiddleware);
    }

    private async route(req, res) {
        if (Asset.isValidAsset(req.path)) {
            const buffer: Buffer = await this.asset.getAsset(req.path);
            if (buffer) {
                res.send(buffer);
            } else {
                res.status(404).end();
            }
        } else if (Array.isArray(this.sambalConfig.routes)) {
            let isRendered = false;
            for (const route of this.sambalConfig.routes) {
                const matcher = match(route.path);
                const result = matcher(req.path);
                if (result) {
                    isRendered = true;
                    try {
                        await this.renderPage(result.path, result.params, route.render, res);
                    } catch (e) {
                        res.status(500).send(e.toString());
                    }
                    break;
                }
            }
            if (!isRendered) {
                res.status(404).end();
            }
        } else {
            res.status(404).send("No routes found in sambal.config.js");
        }
    }

    private async renderPage(path: string, params: any, render: RenderFunction, res) {
        const obs$ = render({
            path: path,
            params: params
        });
        const html = await obs$
        .pipe(toHtml({
            editAttribs: (name, attribs) => {
                if (name === 'script' && attribs.src && this.jsMapping) {
                    return {
                        src: substituteJsPath(this.jsMapping, attribs.src)
                    };
                }
                return attribs;
            }
        }))
        .pipe(this.addBrowserSyncScript())
        .toPromise();
        res.send(html);
    }
    
    private addBrowserSyncScript() {
        const browserSync = `
        <script>
            const ws = new WebSocket("${WEBSOCKET_ADDR}");

            ws.onopen = function() {
                console.log('Sambal dev server connected');
            };
            
            ws.onmessage = function(e) {
                if (e.data === "${CMD_REFRESH}") {
                    console.log('Reloading...');
                    window.location.reload();
                }
            }

            ws.onclose = function(e) {
                console.log("Sambal dev server disconnected");
            };
        </script>`;

        return pipe(
            map((html: string) => {
                const index = html.indexOf("</body>");
                return html.substring(0, index) + browserSync + html.substring(index);
            })
        );
    }

    private broadcast(msg: string) {
        if (this.webSocketServer) {
            this.webSocketServer.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(msg);
                }
            });
        }
    }

    private onSambalConfigChanged() {
        this.configReady$.subscribe({
            next: (e: WebpackEvent) => {
                if (!this.isServerStarted) {
                    this.startServer();
                } else {
                    this.log.info("Reloading browser");
                    this.broadcast("refresh");
                }
            },
            complete: () => {
                
            },
            error: (err) => {
                this.log.error(err);
            }
        });
    }

    private onJsBundleChanged() {
        const events$ = from(this.compilerListeners.map(l => l.bundleChanged$)).pipe(mergeAll());
        events$.subscribe({
            next: (e: WebpackEvent) => {
                this.jsMapping = mapJsEntryToWebpackOutput(e.webpackConfig.entry, e.entries);
                this.log.info("Reloading browser");
                this.broadcast("refresh");
            },
            complete: () => {
                
            },
            error: (err) => {
                this.log.error(err);
            }
        });
    }

    private startServer() {
        this.isServerStarted = true;
        this.addWebpackMiddleware();
        this.onJsBundleChanged();
        this.expressApp.get('/*', this.route.bind(this));
        this.expressApp.listen(this.port, () => {
            this.log.info(`Dev server started on port ${this.port}`);
        });
    }
}

export default DevServer;

