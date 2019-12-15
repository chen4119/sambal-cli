import program from "commander";
import {version} from "../package.json";
import {getSchemaOrgType, isSchemaOrgType, SCHEMA_CONTEXT, SAMBAL_ID} from "sambal-jsonld";
import TypeGenerator from "./TypeGenerator";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import {clean} from "./Writer";
import chokidar from "chokidar";
import {OUTPUT_PATH} from "./Constants";
import {Sambal} from "sambal";
import Router from "./Router";
import { forkJoin } from "rxjs";

const config = require(`${process.cwd()}/sambal.config.js`);
const sambal = new Sambal(config.contentFolder, {
    base: config.base,
    collections: config.collections
});
const router = new Router();
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

/*
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
}*/

async function build() {
    console.log(`Cleaning ${OUTPUT_PATH}`);
    clean(OUTPUT_PATH);
    console.log("Indexing content");
    await indexContent();
    if (config.route) {
        config.route({
            renderPage: router.renderPage.bind(router),
            renderCollection: router.renderCollection.bind(router)
        });
    } else {
        console.error("No route function defined in sambal.config.js");
    }
    const collectionObsList = [];
    for (const collectionName of router.collectionsToRun) {
        const obs = sambal.collection(collectionName);
        collectionObsList.push(obs);
        obs.subscribe(router.collection(collectionName));
    }
    if (collectionObsList.length > 0) {
        forkJoin(collectionObsList).subscribe(() => {
            sambal.collection("main").subscribe(router.pages());
        });
    } else {
        sambal.collection("main").subscribe(router.pages());
    }
}

async function indexContent() {
    await sambal.indexContent();
}

program
.command(`schema.org <type> <output>`)
.description('Create schema.org json or yaml file.  -f, --full for full schema')
.option("-f, --full", "Full schema")
.action(makeSchema);

program
.command(`build`)
.description('Generate website')
.action(build);

program
.command(`index`)
.description('Index content')
.action(indexContent);

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
