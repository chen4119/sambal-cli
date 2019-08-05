import fs from "fs";
import ts from "typescript";
import {makeVariableStatement, EXPORT_MODIFIER, objectToObjectLiteral, makeEnum} from "./ast";
const ID = "@id";
const SUBCLASS = "rdfs:subClassOf";
const TYPE = "@type";
const LABEL = "rdfs:label";
const CLASS = "rdfs:Class";
const PROPERTY = "rdf:Property";
const SUPERSEDEDBY = "http://schema.org/supersededBy";
const DOMAIN_INCLUDES = "http://schema.org/domainIncludes";
const RANGE_INCLUDES = "http://schema.org/rangeIncludes";
const ENUMERATION = "http://schema.org/Enumeration";

type SchemaProperty = {
    name: string,
    types: string[]
};

type SchemaClass = {
    id: string,
    name: string,
    parent?: string,
    properties: SchemaProperty[]
};

type SchemaEnumeration = {
    id: string,
    name: string,
    values: string[]
}

class SchemaGenerator {
    private graph: any[];
    private classPropertiesMap: Map<string, SchemaClass> = new Map<string, SchemaClass>();
    private enumValuesMap: Map<string, SchemaEnumeration> = new Map<string, SchemaEnumeration>();
    constructor(private schema: string, private output: string) {
        const content = fs.readFileSync(schema, "utf-8");
        this.graph = JSON.parse(content)["@graph"];
    }

    generate() {
        // sort all class types to top
        this.graph.sort((a, b) => {
            if (a[TYPE] === CLASS && b[TYPE] === CLASS) {
                return 0;
            } else if (a[TYPE] === CLASS) {
                return -1;
            } else if (b[TYPE] === CLASS) {
                return 1;
            }
        });
        const statements = [];
        for (let i = 0; i < this.graph.length; i++) {
            // ignore all schemas that has been superseded by something else
            if (!this.graph[i][SUPERSEDEDBY]) {
                if (this.graph[i][TYPE] === CLASS) {
                    this.addClassOrEnumeration(this.graph[i]);
                } else if (this.graph[i][TYPE] === PROPERTY) {
                    this.mapPropertyToClass(this.graph[i]);
                } else if (typeof(this.graph[i][TYPE]) === "string") {
                    this.addValueToEnumeration(this.graph[i]);
                }
            }
        }
        for (const classId of this.classPropertiesMap.keys()) {
            this.makeObjectLiteralForClass(classId, statements);
        }
        for (const classId of this.enumValuesMap.keys()) {
            const enumeration: SchemaEnumeration = this.enumValuesMap.get(classId);
            statements.push(makeEnum([EXPORT_MODIFIER], enumeration.name, enumeration.values));
        }
        this.writeJavascript(statements);
    }

    private addClassOrEnumeration(schema) {
        const typeId = schema[ID];
        const name = schema[LABEL];
        if (schema[SUBCLASS] && schema[SUBCLASS][ID] === ENUMERATION) {
            this.enumValuesMap.set(typeId, {
                id: typeId,
                name: name,
                values: []
            });
        } else {
            const clazz: SchemaClass = {
                id: typeId,
                name: name,
                properties: []
            };
            if (schema[SUBCLASS]) {
                clazz.parent = schema[SUBCLASS][ID];
            }
            this.classPropertiesMap.set(typeId, clazz);
        }
    }

    private mapPropertyToClass(schema) {
        if (Array.isArray(schema[DOMAIN_INCLUDES])) {
            const classes = schema[DOMAIN_INCLUDES];
            for (let i = 0; i < classes.length; i++) {
                this.addPropertyToClass(classes[i][ID], schema);
            }
        } else {
            this.addPropertyToClass(schema[DOMAIN_INCLUDES][ID], schema);
        }
    }

    private addPropertyToClass(classId: string, propSchema) {
        if (this.classPropertiesMap.has(classId)) {
            const clazz: SchemaClass = this.classPropertiesMap.get(classId);
            clazz.properties.push({
                name: propSchema[LABEL],
                types: Array.isArray(propSchema[RANGE_INCLUDES]) ? propSchema[RANGE_INCLUDES].map((type) => type[ID]) : [propSchema[RANGE_INCLUDES][ID]]
            });
        }
    }

    private addValueToEnumeration(valueSchema) {
        const enumerationId = valueSchema[TYPE];
        if (this.enumValuesMap.has(enumerationId)) {
            const enumeration = this.enumValuesMap.get(enumerationId);
            enumeration.values.push(valueSchema[LABEL]);
        }
    }

    private makeObjectLiteralForClass(classId: string, statements) {
        const clazz: SchemaClass = this.classPropertiesMap.get(classId);
        const obj = {
            ["_id"]: classId,
            ["_parent"]: clazz.parent
        };
        clazz.properties.sort((a, b) => a.name.localeCompare(b.name));
        for (const prop of clazz.properties) {
            obj[prop.name] = prop.types;
        }
        const stmt = makeVariableStatement([EXPORT_MODIFIER], clazz.name, objectToObjectLiteral(obj));
        statements.push(stmt);
    }

    /*
    generateObjectForTypes(types: string[]) {
        const statements = [];
        const generatedTypeSet = new Set<string>();
        for (const typeId of types) {
            this.traverseTypeHierarchy(typeId, generatedTypeSet, statements);
        }
        this.writeJavascript(statements);
    }

    private traverseTypeHierarchy(typeId: string, generatedTypeSet: Set<string>, statements) {
        if (generatedTypeSet.has(typeId)) {
            return;
        }
        const matches = this.find({
            [ID]: typeId,
            [TYPE]: CLASS
        });
        if (matches.length === 1) {
            generatedTypeSet.add(typeId);
            const schema = matches[0];
            const obj = this.getObjectForType(schema);
            obj["_id"] = typeId;
            if (schema[SUBCLASS]) {
                const parentId = schema[SUBCLASS][ID];
                obj["_parent"] = parentId;
                this.traverseTypeHierarchy(parentId, generatedTypeSet, statements);
            }
            const stmt = makeVariableStatement([EXPORT_MODIFIER], schema[LABEL], objectToObjectLiteral(obj));
            statements.push(stmt);
        } else {
            throw new Error(`${typeId} not found`);
        }
    }

    private getObjectForType(schema) {
        const obj = {};
        const properties = this.getPropertiesForType(schema[ID]);
        properties.sort((a, b) => a.propName.localeCompare(b.propName));
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
    }*/

    private writeJavascript(statements) {
        const tsPrinter = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed
        });
        const sourceFile = ts.createSourceFile(
            this.output,
            "",
            ts.ScriptTarget.Latest,
            false,
            ts.ScriptKind.TS
        );
        const tsSource = tsPrinter.printList(
            ts.ListFormat.MultiLine,
            ts.createNodeArray(statements),
            sourceFile
        );

        fs.writeFileSync(this.output, tsSource, "utf-8");
    }
}

export default SchemaGenerator;