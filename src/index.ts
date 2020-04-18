import program from "commander";
import {version} from "../package.json";
import {getSchemaOrgType, isSchemaOrgType, SCHEMA_CONTEXT, SAMBAL_ID} from "sambal-jsonld";
import TypeGenerator from "./TypeGenerator";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
// import chokidar from "chokidar";
import shelljs from "shelljs";
import {Logger} from "sambal";
import Builder from "./Builder";
import DevServer from "./DevServer";
import {OUTPUT_FOLDER} from "./constants";

const log = new Logger({name: "cli"});

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

function serve() {
    const devServer = new DevServer(3000);
    devServer.start();
}

async function build() {
    log.info(`Cleaning ${OUTPUT_FOLDER}`);
    clean(OUTPUT_FOLDER);
    const config = require(`${process.cwd()}/sambal.config.js`);
    const builder = new Builder(config.sitemap$, config.routes, config.webpack);
    try {
        await builder.start();
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
.description('Generate static website')
.action(build);

program
.command(`serve`)
.description('Start dev server')
.action(serve);

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
