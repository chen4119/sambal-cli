import program from "commander";
import {version} from "../package.json";
import SchemaGenerator from "./SchemaGenerator";

const types = [
    {name: "BlogPosting", id: "http://schema.org/BlogPosting"}
];
const generator = new SchemaGenerator("./schema.jsonld", "./test.js");
generator.generateObjectForTypes(types);

/*
program
    .version(version)
    .option('-g, --generate', 'Generate Sambal javascript files')
    .option('-c, --collect', 'Generate data collection')
    .option('-b, --build', 'Build project')
    .option('-w, --watch', 'Watch for file changes')
    .parse(process.argv);

if (program.generate) {
    
} else if (program.collect) {
    
} else if (program.build) {
    // build(`${DEFAULT_OPTIONS.jsFolder}/app.js`, "bundle.js");
} else if (program.watch) {
    
}*/

