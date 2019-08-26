import fs from "fs";
import ts from "typescript";
import {makeVariableStatement, EXPORT_MODIFIER, objectToObjectLiteral, makeArrayLiteral, makeStringLiteral, makeIdentifier, makeNew} from "./AstFactory";
import {SCHEMA_PREFIX, SAMBAL_ID, SAMBAL_NAME, SAMBAL_PARENT, SAMBAL_VALUES} from "./Constants";
const ID = "@id";
const SUBCLASS = "rdfs:subClassOf";
const TYPE = "@type";
const LABEL = "rdfs:label";
const CLASS = "rdfs:Class";
const PROPERTY = "rdf:Property";
const SUPERSEDEDBY = `${SCHEMA_PREFIX}/supersededBy`;
const DOMAIN_INCLUDES = `${SCHEMA_PREFIX}/domainIncludes`;
const RANGE_INCLUDES = `${SCHEMA_PREFIX}/rangeIncludes`;
const ENUMERATION = `${SCHEMA_PREFIX}/Enumeration`;

type SchemaProperty = {
    name: string,
    types: string[]
};

type SchemaClass = {
    id: string,
    name: string,
    parent?: string[],
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
        this.makeSchemaMap(statements);
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
                clazz.parent = Array.isArray(schema[SUBCLASS]) ? schema[SUBCLASS].map(type => type[ID]) : [schema[SUBCLASS][ID]];
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
                types: Array.isArray(propSchema[RANGE_INCLUDES]) ? propSchema[RANGE_INCLUDES].map(type => type[ID]) : [propSchema[RANGE_INCLUDES][ID]]
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

    private makeSchemaMap(statements) {
        const mappings = [];
        for (const classId of this.classPropertiesMap.keys()) {
            const clazz: SchemaClass = this.classPropertiesMap.get(classId); 
            const obj = {};
            obj[SAMBAL_ID] = classId;
            obj[SAMBAL_NAME] = clazz.name;
            if (clazz.parent) {
                obj[SAMBAL_PARENT] = clazz.parent;
            }
            clazz.properties.sort((a, b) => a.name.localeCompare(b.name));
            for (const prop of clazz.properties) {
                obj[prop.name] = prop.types;
            }
            mappings.push(makeArrayLiteral([makeStringLiteral(classId.toLowerCase()), objectToObjectLiteral(obj)]));
        }
        for (const classId of this.enumValuesMap.keys()) {
            const enumeration: SchemaEnumeration = this.enumValuesMap.get(classId);
            const obj = {
                [SAMBAL_VALUES]: enumeration.values
            };
            mappings.push(makeArrayLiteral([makeStringLiteral(classId.toLowerCase()), objectToObjectLiteral(obj)]));
        }
        const stmt = makeVariableStatement([EXPORT_MODIFIER], "schemaMap", makeNew(makeIdentifier("Map"), [makeArrayLiteral(mappings)]));
        statements.push(stmt);
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