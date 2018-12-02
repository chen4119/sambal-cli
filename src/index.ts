import program from "commander";
import fs from 'fs';
import del from "delete";
import yaml from "js-yaml";
import {version} from "../package.json";
import {generate} from "./generator";
import {collect} from "./collector";
import {SambalConfig, UserDefinedType, UserDefinedCollection} from "./types";
import {getYmlCollections} from "./validate";
import {build} from "./build";
import {serve} from "./serve";

const DEFAULT_OPTIONS: SambalConfig = {
    configFolder: "sambal",
    componentFolder: "components",
    themeFolder: "themes",
    collectionFolder: "collections",
    jsFolder: "js"
};

const BLOG_TYPE: UserDefinedType = {
    name: "blog",
    glob: "data/**/*.md",
    primaryKey: "id",
    indexFields: ["year", "tags", "author"]
}

const ALL_BLOGS_COLLECTION: UserDefinedCollection = {
    name: "allBlogs",
    type: BLOG_TYPE,
    sortBy: [{
        field: "year",
        order: "desc"
    }]
};

const BLOGS_BY_AUTHOR: UserDefinedCollection = {
    name: "blogsByAuthor",
    type: BLOG_TYPE,
    partitionBy: ["tags", "author"]
};

program
    .version(version)
    .option('-g, --generate', 'Generate Sambal javascript files')
    .option('-c, --collect', 'Generate data collection')
    .option('-b, --build', 'Build project')
    .option('-s, --serve', 'Start dev server')
    .parse(process.argv);

if (program.generate) {
    generate(
        DEFAULT_OPTIONS.configFolder,
        DEFAULT_OPTIONS.componentFolder,
        DEFAULT_OPTIONS.themeFolder,
        DEFAULT_OPTIONS.jsFolder
    );
} else if (program.collect) {
    del.sync([`${DEFAULT_OPTIONS.collectionFolder}`]);
    const content = fs.readFileSync(`${DEFAULT_OPTIONS.configFolder}/collections.yml`, 'utf8');
    const ymlConfig = yaml.safeLoad(content);
    const collections: UserDefinedCollection[] = getYmlCollections(ymlConfig.types, ymlConfig.collections);
    collect(collections, DEFAULT_OPTIONS.collectionFolder);
} else if (program.build) {
    build(`${DEFAULT_OPTIONS.jsFolder}/app.js`, "bundle.js");
} else if (program.serve) {
    serve(
        DEFAULT_OPTIONS.configFolder,
        DEFAULT_OPTIONS.componentFolder,
        DEFAULT_OPTIONS.themeFolder,
        DEFAULT_OPTIONS.jsFolder,
        "bundle.js"
    );
}