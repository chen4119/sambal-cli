import program from "commander";
import {version} from "../package.json";
import {SCHEMA_PREFIX} from "./constants";


const CMD_TYPES = [
    {id: `${SCHEMA_PREFIX}/Person`, name: "person"},

];

for (let i = 0; i < CMD_TYPES.length; i++) {
    program
        .command(`${CMD_TYPES[i].name} <output>`)
        .option("-f, --full", "Full schema")
        .action(makeSchema);
}

program
.version(version)
.parse(process.argv);

if (program.person) {
    console.log(program.person)
}

function makeSchema(output, cmd) {
    console.log(output);
    console.log(cmd.full);
}


/*
program.version(version);
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

