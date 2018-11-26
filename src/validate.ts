
export function getCollectionConfig(types, collections) {
    const collectionConfig = [];
    const typeMap = new Map<string, any>();
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        validateType(type);
        typeMap.set(type.name, type);
    }
    for (let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        validateCollection(typeMap, collection);
    }
}

function validateCollectionConfig(types, collections) {
    const typeMap = new Map<string, any>();
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        validateType(type);
        typeMap.set(type.name, type);
    }

    for (let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        validateCollection(typeMap, collection);
    }
}

function validateType(type: any) {
    console.log(type);
    if (typeof(type.glob) !== 'string' && !Array.isArray(type.glob)) {
        throw new Error(`Invalid glob for type: ${type.name}`);
    }
}

function validateCollection(typeMap: Map<string, any>, collection: any) {
    console.log(collection);
}