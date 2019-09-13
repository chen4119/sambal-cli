import program from "commander";
import {version} from "../package.json";
import {schemaMap} from "./Schema";
import TypeGenerator from "./TypeGenerator";
import {SCHEMA_PREFIX, SAMBAL_ID} from "./Constants";


function makeSchema(type, output, cmd) {
    console.log(type);
    console.log(output);
    const id = `${SCHEMA_PREFIX}/${type}`.toLowerCase();
    if (schemaMap.has(id)) {
        const schema = schemaMap.get(id);
        const gen = new TypeGenerator(schema[SAMBAL_ID], Boolean(cmd.full));
        console.log(gen.generate());
    } else {
        console.error(`${type} not found`);
    }
}

program
.command(`schema <type> <output>`)
.description('Create schema.org json or markdown file.  -f, --full for full schema')
.option("-f, --full", "Full schema")
.action(makeSchema);

program
.version(version)
.parse(process.argv);
