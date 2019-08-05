import program from "commander";
import {version} from "../package.json";
import {SCHEMA_PREFIX} from "./constants";
import {
    Thing,
    Person,
    Organization
} from "./schema";

const CONDENSED_THING = {
    description: "Description",
    identifier: "Unique identifier or URL",
    image: "URL to image or ImageObject",
    name: "Name",
    sameAs: ["URL to same thing1", "URL to same thing2"]
};

const CONDENSED_CREATIVE_WORK = {
    author: "Person or Organization",
    datePublished: "Datetime",
    headline: "Headline",
    keywords: ["keyword1", "keyword2"]
};

const CONDENSED_PERSON = {
    colleagues: ["URL to Person1", "URL to Person2"],
    email: "Email",
    familyName: "Family name",
    follows: ["URL to Person1", "URL to Person2"],
    gender: "Male or Female",
    givenName: "First name",
    knows: ["URL to Person1", "URL to Person2"],
    nationality: "Country",
    worksFor: "URL to organization"
};

const CONDENSED_ORGANIZATION = {
    address: "Address",
    email: "Email",
    founders: ["URL to Person1", "URL to Person2"],
    telephone: "Telephone #"
};


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

