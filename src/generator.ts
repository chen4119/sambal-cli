import SchemaGenerator from "./SchemaGenerator";

const generator = new SchemaGenerator("./all-layers.jsonld", "./src/Schema.ts");
generator.generate();
