const program = require('commander');
import {version} from "../package.json";
import {generate} from "./generator";
import {collect} from "./collector";

program
    .version(version)
    .option('-g, --generate', 'Generate Sambal javascript files')
    .option('-c, --collect', 'Generate data collection')
    .parse(process.argv);

if (program.generate) {
    generate();
} else if (program.collect) {
    collect([{
        name: 'blogs',
        glob: "data/**/*.md",
        sortBy: [{field: "year", order: "desc"}],
        partitionBy: ["author"]
    }], 'test');
}