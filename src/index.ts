import program from "commander";
import fs from 'fs';
import del from "delete";
import yaml from "js-yaml";
import {version} from "../package.json";
import {generate} from "./generator";
import {collect} from "./collector";
import {SambalConfig, UserDefinedType, UserDefinedCollection} from "./types";
import {getCollectionConfig} from "./validate";

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
    .parse(process.argv);

if (program.generate) {
    del.sync([`${DEFAULT_OPTIONS.jsFolder}`]);
    generate(
        DEFAULT_OPTIONS.configFolder,
        DEFAULT_OPTIONS.componentFolder,
        DEFAULT_OPTIONS.themeFolder,
        DEFAULT_OPTIONS.jsFolder
    );
} else if (program.collect) {
    del.sync([`${DEFAULT_OPTIONS.collectionFolder}`]);
    const content = fs.readFileSync(`${DEFAULT_OPTIONS.configFolder}/collections.yml`, 'utf8');
    const collectionConfig = yaml.safeLoad(content);
    console.log(collectionConfig);
    getCollectionConfig(collectionConfig.types, collectionConfig.collections);
    // collect([ALL_BLOGS_COLLECTION, BLOGS_BY_AUTHOR], DEFAULT_OPTIONS.collectionFolder);
}