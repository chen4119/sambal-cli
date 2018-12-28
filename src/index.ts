import program from "commander";
import fs from 'fs';
// import child_process from 'child_process';
import del from "delete";
import yaml from "js-yaml";
import {Collection, Type, Schema} from "sambal-fs";
import {version} from "../package.json";
import {generate} from "./generator";
import {collect} from "./collector";
import {SambalConfig} from "./types";
import {parseSchemaYmlFile} from "./validate";
import {build} from "./build";
import {watch} from "./watch";

const DEFAULT_OPTIONS: SambalConfig = {
    configFolder: "sambal",
    componentFolder: "components",
    actionFolder: "actions",
    reducerFolder: "reducers",
    sharedCssFolder: "css",
    dataFolder: "data",
    jsFolder: "js"
};

const BLOG_TYPE: Type = {
    name: "blog",
    source: "data/**/*.md",
    primaryKey: "id",
    indexFields: ["year", "tags", "author"]
}

const ALL_BLOGS_COLLECTION: Collection = {
    name: "allBlogs",
    type: BLOG_TYPE,
    sortBy: [{
        field: "year",
        order: "desc"
    }]
};

const BLOGS_BY_AUTHOR: Collection = {
    name: "blogsByAuthor",
    type: BLOG_TYPE,
    partitionBy: ["tags", "author"]
};

program
    .version(version)
    .option('-g, --generate', 'Generate Sambal javascript files')
    .option('-c, --collect', 'Generate data collection')
    .option('-b, --build', 'Build project')
    .option('-w, --watch', 'Watch for file changes')
    .parse(process.argv);

if (program.generate) {
    generate(
        DEFAULT_OPTIONS.configFolder,
        DEFAULT_OPTIONS.componentFolder,
        DEFAULT_OPTIONS.sharedCssFolder,
        DEFAULT_OPTIONS.actionFolder,
        DEFAULT_OPTIONS.reducerFolder,
        DEFAULT_OPTIONS.jsFolder
    );
} else if (program.collect) {
    del.sync([`${DEFAULT_OPTIONS.dataFolder}`]);
    const content = fs.readFileSync(`${DEFAULT_OPTIONS.configFolder}/schema.yml`, 'utf8');
    const ymlConfig = yaml.safeLoad(content);
    const schema: Schema = parseSchemaYmlFile(ymlConfig);
    collect(schema, DEFAULT_OPTIONS.dataFolder);
} else if (program.build) {
    build(`${DEFAULT_OPTIONS.jsFolder}/app.js`, "bundle.js");
} else if (program.watch) {
    /*
    child_process.exec('node ./node_modules/polymer-cli/bin/polymer.js serve', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
    });*/
    setTimeout(function(){
        startWatch();
    }, 2000);
}

async function startWatch() {
    await generate(
        DEFAULT_OPTIONS.configFolder,
        DEFAULT_OPTIONS.componentFolder,
        DEFAULT_OPTIONS.sharedCssFolder,
        DEFAULT_OPTIONS.actionFolder,
        DEFAULT_OPTIONS.reducerFolder,
        DEFAULT_OPTIONS.jsFolder
    );
    // await build(`${DEFAULT_OPTIONS.jsFolder}/app.js`, "bundle.js");
    watch(
        DEFAULT_OPTIONS.configFolder,
        DEFAULT_OPTIONS.componentFolder,
        DEFAULT_OPTIONS.sharedCssFolder,
        DEFAULT_OPTIONS.actionFolder,
        DEFAULT_OPTIONS.reducerFolder,
        DEFAULT_OPTIONS.jsFolder
    );
}