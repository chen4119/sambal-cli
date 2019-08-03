import fs from "fs";
import ts from "typescript";
import {makeVariableStatement, EXPORT_MODIFIER, objectToObjectLiteral} from "./ast";
const ID = "@id";
const SUBCLASS = "rdfs:subClassOf";
const TYPE = "@type";
const LABEL = "rdfs:label";
const CLASS = "rdfs:Class";
const DOMAIN_INCLUDES = "http://schema.org/domainIncludes";
const RANGE_INCLUDES = "http://schema.org/rangeIncludes";


class SchemaGenerator {
    private graph: any[];
    constructor(private schema: string, private output: string) {
        const content = fs.readFileSync(schema, "utf-8");
        this.graph = JSON.parse(content)["@graph"];
    }

    generateObjectForTypes(types: {name: string, id: string}[]) {
        const statements = [];
        for (const type of types) {
            const obj = this.getObjectForType(type.id);
            const stmt = makeVariableStatement([EXPORT_MODIFIER], type.name, objectToObjectLiteral(obj));
            statements.push(stmt);
        }
        this.writeJavascript(statements);
    }

    private getObjectForType(type) {
        const matches = this.find({
            [ID]: type,
            [TYPE]: CLASS
        });
        const parents = [];
        let properties = [];
        if (matches.length === 1) {
            this.getParentClasses(matches[0], parents);
            properties = this.getPropertiesForType(type);
            for (let i = 0; i < parents.length; i++) {
                properties = properties.concat(this.getPropertiesForType(parents[i]));
            }
        }
        properties.sort((a, b) => a.propName.localeCompare(b.propName));
        const obj = {};
        for (const prop of properties) {
            obj[prop.propName] = prop.types;
        }
        return obj;
    }

    private getPropertiesForType(type) {
        const matches = this.find({
            [DOMAIN_INCLUDES]: type,
            [TYPE]: "rdf:Property"
        });
        return matches.map((prop) => ({
            propName: prop[LABEL],
            types: Array.isArray(prop[RANGE_INCLUDES]) ? prop[RANGE_INCLUDES].map((type) => type[ID]) : [prop[RANGE_INCLUDES][ID]]
        }));
    }

    private getParentClasses(schema, parents) {
        if (schema[SUBCLASS]) {
            const parentId = schema[SUBCLASS][ID];
            parents.push(parentId);
            const matches = this.find({
                [ID]: parentId,
                [TYPE]: CLASS
            });
            if (matches.length === 1) {
                this.getParentClasses(matches[0], parents);
            }
        }
    }

    private find(criterias) {
        const matches = [];
        for (let i = 0; i < this.graph.length; i++) {
            if (this.isMatch(this.graph[i], criterias)) {
                matches.push(this.graph[i]);
            }
        }
        return matches;
    }

    private isMatch(schema, criterias) {
        for (const key of Object.keys(criterias)) {
            if (!schema[key]) {
                return false;
            }
            const isTrue = this.isEqualOrInclude(schema[key], criterias[key]);
            if (!isTrue) {
                return false;
            }
        }
        return true;
    }

    private isEqualOrInclude(schemaValue, searchValue) {
        if (Array.isArray(schemaValue)) {
            for (let i = 0; i < schemaValue.length; i++) {
                const isTrue = this.isEqualOrInclude(schemaValue[i], searchValue);
                if (isTrue) {
                    return true;
                }
            }
            return false;
        } else if (typeof(schemaValue) === "object") {
            return schemaValue[ID] === searchValue;
        }
        return schemaValue === searchValue;
    }

    private writeJavascript(statements) {
        const tsPrinter = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed
        });
        const sourceFile = ts.createSourceFile(
            this.output,
            "",
            ts.ScriptTarget.Latest,
            false,
            ts.ScriptKind.JS
        );
        const tsSource = tsPrinter.printList(
            ts.ListFormat.MultiLine,
            ts.createNodeArray(statements),
            sourceFile
        );

        console.log(tsSource);

    }
}

export default SchemaGenerator;