import express from "express";
import {Subject, from, pipe} from "rxjs";
import {mergeAll, map} from "rxjs/operators";
import {Logger, toHtml} from "sambal";
import webpack from "webpack";
import path from "path";
import shelljs from "shelljs";
import webpackDevMiddleware from "webpack-dev-middleware";
import {RenderFunction, SAMBAL_CONFIG_FILE, CACHE_FOLDER, WebpackEvent, WEBSOCKET_ADDR, JsMapping} from "./constants";
import {parseWebpackStatsEntrypoints, webpackCallback, mapJsEntryToWebpackOutput, substituteJsPath} from "./utils";
import {match, Match} from "path-to-regexp";
import nodeExternals from "webpack-node-externals";
import WebpackListenerPlugin from "./WebpackListenerPlugin";
import WebSocket from "ws";

const PUBLIC_PATH = "/_sambal";
const CMD_REFRESH = "refresh";

class DevServer {
    private expressApp;
    private sambalConfig;
    private webSocketServer: WebSocket.Server;
    private jsMapping: JsMapping[];
    private configReady$: Subject<WebpackEvent> = new Subject<WebpackEvent>();
    private compilerListener: WebpackListenerPlugin = new WebpackListenerPlugin(PUBLIC_PATH);
    private isServerStarted: boolean = false;
    private log: Logger = new Logger({name: "Dev Server"});
    constructor(private webpackConfig, private port: Number) {
        
    }

    start() {
        shelljs.rm("-rf", CACHE_FOLDER);
        this.expressApp = express();
        this.startWebSocket();
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
            aggregateTimeout: 300,
            poll: 1000
        }, webpackCallback((err, stats) => {
            if (!err) {
                const entrypoints = parseWebpackStatsEntrypoints({publicPath: `/${CACHE_FOLDER}`}, stats.entrypoints);
                const configPath = path.resolve(process.cwd(), `./${entrypoints.main}`);
                this.sambalConfig = require(configPath);
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
        if (!this.webpackConfig) {
            return;
        }
        const compiler = webpack({
            ...this.webpackConfig,
            output: {
                ...this.webpackConfig.output,
                publicPath: PUBLIC_PATH
            },
            plugins: [
                ...this.webpackConfig.plugins,
                this.compilerListener
            ]
        });
    
        const webpackMiddleware = webpackDevMiddleware(compiler, {
            publicPath: PUBLIC_PATH,
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
        const html = await obs$
        .pipe(toHtml({
            editAttribs: (name, attribs) => {
                if (name === 'script' && attribs.src) {
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
    private onChangeHandler() {
        const events$ = from([this.configReady$, this.compilerListener.bundleChanged$]).pipe(mergeAll());
        events$.subscribe({
            next: (e: WebpackEvent) => {
                if (!this.jsMapping && e.type === 'bundle') {
                    this.jsMapping = mapJsEntryToWebpackOutput(this.webpackConfig.entry, e.entries);
                }

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

