import program from "commander";
import {version} from "../package.json";
import {schemaMap} from "./Schema";
import TypeGenerator from "./TypeGenerator";


function makeSchema(type, output, cmd) {
    console.log(type);
    console.log(output);
    console.log(cmd.full);
    const id = "http://schema.org/Person";
    const gen = new TypeGenerator(id, false);
    console.log(gen.generate());
}

program
.command(`schema <type> <output>`)
.description('Create schema.org json or markdown file.  -f, --full for full schema')
.option("-f, --full", "Full schema")
.action(makeSchema);

program
.version(version)
.parse(process.argv);
