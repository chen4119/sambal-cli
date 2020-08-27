import program from "commander";
import {version} from "../package.json";
import {getSchemaOrgType, isSchemaOrgType, SCHEMA_CONTEXT, SAMBAL_ID} from "sambal-jsonld";
import TypeGenerator from "./TypeGenerator";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import shelljs from "shelljs";
import {Logger} from "sambal";
import Builder from "./Builder";
import DevServer from "./DevServer";
import {OUTPUT_FOLDER, SAMBAL_CONFIG_FILE} from "./constants";

const log = new Logger({name: "cli"});

let serverWebpackConfig = null;
let clientWebpackConfigs = [];
const webpackConfigPath = `${process.cwd()}/webpack.config.js`;

if (shelljs.test('-f', webpackConfigPath)) {
    const webpackConfig = require(webpackConfigPath);
    if (Array.isArray(webpackConfig)) {
        webpackConfig.forEach(config => addWebpackConfig(config));
    } else {
        addWebpackConfig(webpackConfig);
    }
}

function addWebpackConfig(config) {
    if (normalizeWebpackConfig(config)){
        if (isServerConfig(config)) {
            serverWebpackConfig = config;
        } else {
            clientWebpackConfigs.push(config);
        }
    }
}

function isServerConfig(config) {
    if (typeof(config.entry) === 'string') {
        return config.entry.indexOf(SAMBAL_CONFIG_FILE) >= 0;
    } else if (Array.isArray(config.entry)) {
        for (let i = 0; i < config.entry.length; i++) {
            if (config.entry[i].indexOf(SAMBAL_CONFIG_FILE) >= 0) {
                return true;
            }
        }
    }
    return false;
}

function normalizeWebpackConfig(config) {
    if (!config.entry) {
        log.warn("No webpack entry specified");
        return false;
    }
    if (!config.plugins) {
        config.plugins = [];
    }
    if (!config.output) {
        config.output = {};
    }
    return true;
}

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

function serve() {
    const devServer = new DevServer(serverWebpackConfig, clientWebpackConfigs, 3000);
    try {
        devServer.start();
    } catch (e) {
        log.error(e);
    }
}

async function build() {
    log.info(`Cleaning ${OUTPUT_FOLDER}`);
    clean(OUTPUT_FOLDER);
    const config = require(`${process.cwd()}/${SAMBAL_CONFIG_FILE}`);
    const builder = new Builder(config.baseUrl, serverWebpackConfig, config.asset$);
    try {
        await builder.start(config.sitemap$, config.routes);
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
