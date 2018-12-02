import {UserDefinedType, UserDefinedCollection} from "./types";

export function getYmlCollections(ymlTypes, ymlCollections) {
    const collections: UserDefinedCollection[] = [];
    const typeMap = new Map<string, any>();

    for (let i = 0; i < ymlTypes.length; i++) {
        const typeName = Object.keys(ymlTypes[i])[0];
        const typeDef = ymlTypes[i][typeName];
        const type: UserDefinedType = {
            ...typeDef,
            name: typeName
        };
        validateType(type);
        typeMap.set(typeName, type);
    }
    for (let i = 0; i < ymlCollections.length; i++) {
        const collectionName = Object.keys(ymlCollections[i])[0];
        const collectionDef = ymlCollections[i][collectionName];
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
        const collection: UserDefinedCollection = {
            ...collectionDef,
            name: collectionName,
            type: typeMap.get(collectionDef.type)
        }
        validateCollection(collection);
        collections.push(collection);
    }
    return collections;
}

function validateType(type: UserDefinedType) {
    if (typeof(type.name) !== 'string' || type.name === '') {
        throw new Error(`Invalid name for type: ${type}`);
    }
    if (typeof(type.glob) !== 'string' && !Array.isArray(type.glob)) {
        throw new Error(`Invalid glob for type: ${type.name}`);
    }
    if (typeof(type.primaryKey) !== 'string' && !Array.isArray(type.primaryKey)) {
        throw new Error(`Invalid primary key for type: ${type.name}`);
    }
    if (typeof(type.indexFields) !== 'undefined' && !Array.isArray(type.indexFields)) {
        throw new Error(`Invalid index fields for type: ${type.name}`);
    }
}

function validateCollection(collection: UserDefinedCollection) {
    // console.log(collection);
}