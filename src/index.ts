import program from "commander";
import {version} from "../package.json";
import {getSchemaOrgType, isSchemaOrgType} from "sambal-jsonld";
import TypeGenerator from "./TypeGenerator";
import {SCHEMA_PREFIX, SAMBAL_ID} from "./Constants";


function makeSchema(type, output, cmd) {
    console.log(type);
    console.log(output);
    const id = `${SCHEMA_PREFIX}/${type}`;
    if (isSchemaOrgType(id)) {
        const schema = getSchemaOrgType(id);
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
