import program from "commander";
import {version} from "../package.json";
import {getSchemaOrgType, isSchemaOrgType, SCHEMA_CONTEXT, SAMBAL_ID} from "sambal-jsonld";
import {loadContent, hydrateJsonLd} from "sambal-ssg";
import TypeGenerator from "./TypeGenerator";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import {Observer, Observable, Subject, ConnectableObservable, Subscriber} from "rxjs";
import {multicast} from "rxjs/operators";
import {clean, write} from "./Writer";
import {bundle, serveBundle} from "./Bundler";
import chokidar from "chokidar";

const config = require(`${process.cwd()}/sambal.config.js`);
const START_SERVER_DELAY = 1000;

function makeSchema(type, output, cmd) {
    const ext = path.extname(output).toLowerCase();
    if (ext !== ".yaml" && ext !== ".yml" && ext !== ".json") {
        console.error(`Unrecognized file extension ${ext}.  Only yaml or json output format supported`);
        return;
    }
    const id = `${SCHEMA_CONTEXT}/${type}`;
    if (isSchemaOrgType(id)) {
        const schema = getSchemaOrgType(id);
        const gen = new TypeGenerator(schema[SAMBAL_ID], Boolean(cmd.full));
        if (ext === ".yaml" || ext === ".yml") {
            fs.writeFileSync(output, String(yaml.safeDump(gen.generate())), "utf-8");
            console.log(`Created schema.org ${type} at ${output}`);
        } else if (ext === ".json") {
            fs.writeFileSync(output, JSON.stringify(gen.generate()), "utf-8");
            console.log(`Created schema.org ${type} at ${output}`);
        }
    } else {
        console.error(`${type} not found`);
    }
}

function route(router: ((props: any) => string), isBundle: boolean): Observer<any> {
    return {
        next: async (d) => {
            const data = d.data;
            const html = d.html.html();
            const dest = router(data);
            const output = await write(dest, html);
            if (isBundle) {
                await bundle(output, dest);
            }
        },
        error: (err) => {
            handleError(err);
        },
        complete: () => {
            
        }
    };
}

function handleError(error) {
    console.error(error);
}

function startDevServer(files: string[], subscriber: Subscriber<unknown>) {
    const watcher = chokidar.watch(files);
    watcher.on('change', async (path) => {
        console.log(`${path} changed!`);
        const content = await loadContent(path);
        subscriber.next(content);
    });
    setTimeout(() => {
        console.log("starting server");
        serveBundle();
    }, START_SERVER_DELAY);
}

async function iterateFiles(files: string[], subscriber: Subscriber<unknown>, isServe: boolean) {
    for (let i = 0; i < files.length; i++) {
        const content = await loadContent(files[i]);
        subscriber.next(content);
    }
    if (isServe) {
        startDevServer(files, subscriber);
    } else {
        subscriber.complete();
    }
}

function filesObs(files: string[], isServe: boolean): ConnectableObservable<any> {
    return new Observable(subscriber => {
        iterateFiles(files, subscriber, isServe);
    })
    .pipe(hydrateJsonLd())
    .pipe(multicast(() => new Subject())) as ConnectableObservable<any>;
}

function run(task, files, cmd) {
    if (config[task]) {
        clean();
        const sourceObs: ConnectableObservable<any> = filesObs(files, false);
        const resultObs: Observable<any> = config[task].call(null, sourceObs);
        resultObs.subscribe(route(config["route"], true));
        sourceObs.connect();
    } else {
        console.log(`${task} not found`);
    }
}

function serve(task, files, cmd) {
    if (config[task]) {
        clean();
        const sourceObs: ConnectableObservable<any> = filesObs(files, true);
        const resultObs: Observable<any> = config[task].call(null, sourceObs);
        resultObs.subscribe(route(config["route"], false));
        sourceObs.connect();
    } else {
        console.log(`${task} not found`);
    }
}

program
.command(`schema.org <type> <output>`)
.description('Create schema.org json or yaml file.  -f, --full for full schema')
.option("-f, --full", "Full schema")
.action(makeSchema);

program
.command(`run <task> [files...]`)
.description('Run specified task')
.action(run);

program
.command(`serve <task> [files...]`)
.description('Watch for file change to trigger specified task')
.action(serve);

program
.command('*')
.action(function(env){
    console.error('Unrecognized command.  sambal --help for more info');
});

program
.version(version)
.parse(process.argv);

if (!program.args.length) {
    program.help();
}
