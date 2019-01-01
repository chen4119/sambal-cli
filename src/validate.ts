import {Collection, Type} from "sambal-fs";
import {DataSource} from "./types";

export function parseDataYmlFile(ymlObj: any) {
    if (!ymlObj) {
        throw new Error('Invalid schema file');
    }
    if (!ymlObj.types) {
        throw new Error('No types defined in schema file');
    }
    const sources: DataSource[] = [];
    const collections: Collection[] = [];
    const typeMap = new Map<string, any>();
    for (let i = 0; i < ymlObj.types.length; i++) {
        const typeName = Object.keys(ymlObj.types[i])[0];
        const typeDef = ymlObj.types[i][typeName];
        const type: Type = {
            ...typeDef,
            name: typeName
        };
        validateType(type);
        typeMap.set(typeName, type);
    }
    if (ymlObj.sources) {
        for (let i = 0; i < ymlObj.sources.length; i++) {
            const sourceName = Object.keys(ymlObj.sources[i])[0];
            const sourceDef = ymlObj.sources[i][sourceName];
            const dataSource: DataSource = {
                ...sourceDef,
                name: sourceName,
                type: typeMap.get(sourceDef.type)
            }
            sources.push(dataSource);
        }
    }
    if (ymlObj.collections) {
        for (let i = 0; i < ymlObj.collections.length; i++) {
            const collectionName = Object.keys(ymlObj.collections[i])[0];
            const collectionDef = ymlObj.collections[i][collectionName];
            if (collectionDef.sortBy) {
                collectionDef.sortBy = collectionDef.sortBy.map((sort) => {
                    const sortField = Object.keys(sort)[0];
                    const sortOrder = sort[sortField];
                    return {
                        field: sortField,
                        order: sortOrder
                    }
                });
            }
            const collection: Collection = {
                ...collectionDef,
                name: collectionName,
                type: typeMap.get(collectionDef.type)
            }
            validateCollection(collection);
            collections.push(collection);
        }
    }
    return {
        sources: sources,
        types: [...typeMap.values()],
        collections: collections
    };
}

function validateType(type: Type) {
    if (typeof(type.name) !== 'string' || type.name === '') {
        throw new Error(`Invalid name for type: ${type}`);
    }
    if (typeof(type.primaryKey) !== 'string' && !Array.isArray(type.primaryKey)) {
        throw new Error(`Invalid primary key for type: ${type.name}`);
    }
    if (typeof(type.indexFields) !== 'undefined' && !Array.isArray(type.indexFields)) {
        throw new Error(`Invalid index fields for type: ${type.name}`);
    }
}

function validateCollection(collection: Collection) {
    // console.log(collection);
}