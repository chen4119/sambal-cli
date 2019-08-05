import SchemaGenerator from "./SchemaGenerator";

const generator = new SchemaGenerator("./schema.jsonld", "./src/schema.ts");
generator.generate();
