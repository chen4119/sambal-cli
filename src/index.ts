import program from "commander";
import {version} from "../package.json";
import {getSchemaOrgType, isSchemaOrgType, SCHEMA_CONTEXT, SAMBAL_ID} from "sambal-jsonld";
import TypeGenerator from "./TypeGenerator";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import chokidar from "chokidar";
import shelljs from "shelljs";
import {LinkedDataStore, OUTPUT_FOLDER, Logger} from "sambal";
import Builder from "./Builder";

const log = new Logger({name: "cli"});
const config = require(`${process.cwd()}/sambal.config.js`);
const store = new LinkedDataStore(config.host, {contentPath: config.contentPath, collections: config.collections});
const START_SERVER_DELAY = 1000;

function makeSchema(type, output, cmd) {
    const ext = path.extname(output).toLowerCase();
    if (ext !== ".yaml" && ext !== ".yml" && ext !== ".json") {
        log.error(`Unrecognized file extension ${ext}.  Only yaml or json output format supported`);
        return;
    }
    const id = `${SCHEMA_CONTEXT}/${type}`;
    if (isSchemaOrgType(id)) {
        const schema = getSchemaOrgType(id);
        const gen = new TypeGenerator(schema[SAMBAL_ID], Boolean(cmd.full));
        if (ext === ".yaml" || ext === ".yml") {
            fs.writeFileSync(output, String(yaml.safeDump(gen.generate())), "utf-8");
            log.info(`Created schema.org ${type} at ${output}`);
        } else if (ext === ".json") {
            fs.writeFileSync(output, JSON.stringify(gen.generate()), "utf-8");
            log.info(`Created schema.org ${type} at ${output}`);
        }
    } else {
        log.error(`${type} not found`);
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
    log.info(`Cleaning ${OUTPUT_FOLDER}`);
    clean(OUTPUT_FOLDER);
    const builder = new Builder(store, config.route$);
    try {
        await builder.start();
    } catch (e) {
        log.error(e);
    }
}

async function indexContent() {
    try {
        await store.indexContent();
    } catch (e) {
        log.error(e);
    }
}

function clean(folder: string) {
    shelljs.rm("-rf", folder);
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
    log.error('Unrecognized command.  sambal --help for more info');
});

program
.version(version)
.parse(process.argv);

if (!program.args.length) {
    program.help();
}
