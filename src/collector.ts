import matter from 'gray-matter';
import path from "path";
import shell from 'shelljs';
import {gulpSeries, asyncGlob} from './gulp';
import {asyncWriteFile} from './utils';
import {UserDefinedCollection, Partition, Chunk, Collection, Sort, UserDefinedType} from './types';

const MAIN_PARTITION_KEY = "_main_";
const CHUNK_FILE_PREFIX = "chunk_";
const MAX_CHUNK_ENTRIES = 2000;

export async function collect(collections: UserDefinedCollection[], output: string) {
    const promises = [];
    for (let i = 0; i < collections.length; i++) {
        promises.push(goCollect(collections[i], output));
    }
    await Promise.all(promises);
    await createMasterManifest(output);
}

function goCollect(collectionDef: UserDefinedCollection, output: string) {
    const partitionMap = new Map<string, Partition>();
    const indexFilesTask = () => indexFiles(collectionDef, partitionMap);
    const sortTask = (cb) => {
        sortPartitions(collectionDef.sortBy, partitionMap);
        cb();
    };
    const saveTask = () => savePartitions(collectionDef, partitionMap, output);
    
    return new Promise(function(resolve, reject) {
        gulpSeries(indexFilesTask, sortTask, saveTask)(() => {
            resolve();
        });
    });
}

function indexFiles(collectionDef: UserDefinedCollection, partitionMap: Map<string, Partition>) {
    const indexFields = getIndexFields(collectionDef.type);
    return asyncGlob(collectionDef.type.glob, (file) => {
        const filePath = `${path.relative(file.base, file.dirname)}/${file.basename}`;
        console.log(filePath);
        const obj = parseContent(file.contents.toString(), file.extname);
        const objWithIndexValuesOnly = getIndexValues(obj, indexFields);
        partition(objWithIndexValuesOnly, filePath, partitionMap, collectionDef.partitionBy);
    });
}

function partition(obj: any, filePath: string, partitionMap: Map<string, Partition>, partitionBy: string[]) {
    let partition: Partition = null;
    let partitionKeys: string[][] = [];
    if (partitionBy) {
        for (const fieldName of partitionBy) {
            const fieldValue = obj[fieldName];
            if (Array.isArray(fieldValue)) {
                if (partitionKeys.length === 0) {
                    for (const value of fieldValue) {
                        partitionKeys.push([value]);
                    }
                } else {
                    let updatedPartitionKeys: string[][] = [];
                    for (const keyValues of partitionKeys) {
                        for (const value of fieldValue) {
                            updatedPartitionKeys.push([...keyValues, value]);
                        }
                    }
                    partitionKeys = updatedPartitionKeys;
                }
            } else if (isValueValid(fieldValue)) {
                if (partitionKeys.length === 0) {
                    partitionKeys.push([fieldValue]);
                } else {
                    for (const keyValues of partitionKeys) {
                        keyValues.push(fieldValue);
                    }
                }
            }
        }
    } else {
        partitionKeys.push([MAIN_PARTITION_KEY]);
    }
    for (const keyValues of partitionKeys) {
        const partitionKey = keyValues.join('-');
        const hexKey = new Buffer(partitionKey).toString('hex');
        if(partitionMap.has(hexKey)) {
            partition = partitionMap.get(hexKey);
        } else {
            partition = {
                key: hexKey,
                chunks: []
            };
            partitionMap.set(hexKey, partition);
        }
        addObjToPartition(obj, filePath, partition);
    }
}

function getIndexFields(type: UserDefinedType) {
    let indexFields = [];
    if (Array.isArray(type.primaryKey)) {
        indexFields = indexFields.concat(type.primaryKey);
    } else {
        indexFields.push(type.primaryKey);
    }
    if (type.indexFields) {
        indexFields = indexFields.concat(type.indexFields);
    }
    return indexFields;
}

function getIndexValues(obj: any, indexFields: string[]) {
    const indexValuesOnly = {};
    for (let i = 0; i < indexFields.length; i++) {
        const fieldName = indexFields[i];
        indexValuesOnly[fieldName] = obj[fieldName];
    }
    return indexValuesOnly;
}

function parseContent(content: string, extname: string) {
    switch (extname) {
        case ".json":
            return JSON.parse(content);
        case ".md":
            return matter(content).data;
        default:
        return null;
    }
}

function addObjToPartition(obj: any, filePath: string, partition: Partition) {
    let chunk: Chunk = null;
    for (let i = 0; i < partition.chunks.length; i++) {
        if (partition.chunks[i].data.length < MAX_CHUNK_ENTRIES) {
            chunk = partition.chunks[i];
            break;
        }
    }
    if (chunk === null) {
        chunk = {
            name: `${CHUNK_FILE_PREFIX}${partition.chunks.length + 1}`,
            data: []
        }
        partition.chunks.push(chunk);
    }
    chunk.data.push({
        meta: obj,
        path: filePath
    });
}

function isValueValid(val) {
    if (typeof(val) === "string" || typeof(val) === "number" || typeof(val) === "boolean") {
        return true;
    }
    return false;
}

function sortValue(a, b, order) {
    let isAValid = false;
    let compare = 0;
    if (!isValueValid(a) && !isValueValid(b)) {
        compare = 0;
    } else if (isValueValid(a) && !isValueValid(b)) {
        compare = -1;
    } else if (!isValueValid(a) && isValueValid(b)) {
        compare = 1;
    } else {
        if (typeof(a) === "string") {
            compare = a.localeCompare(b);
        } else {
            compare = a - b;
        }
    }
    if (order === 'desc') {
        return compare * -1;
    }
    return compare;
}

function sortPartitions(sortBy: Sort[], partitionMap: Map<string, Partition>) {
    if (!sortBy) {
        return;
    }
    for (const partitionKey of partitionMap.keys()) {
        const partition: Partition = partitionMap.get(partitionKey);
        for (const chunk of partition.chunks) {
            chunk.data.sort((a, b) => {
                let compare = 0;
                for(let i = 0; i < sortBy.length; i++) {
                    const fieldName = sortBy[i].field;
                    compare = sortValue(a.meta[fieldName], b.meta[fieldName], sortBy[i].order);
                    if (compare !== 0) {
                        return compare;
                    }
                }
                return compare;
            });
        }
    }
}

async function savePartitions(collectionDef: UserDefinedCollection, partitionMap: Map<string, Partition>, output: string) {
    const partitions: Partition[] = [];
    for (const partitionKey of partitionMap.keys()) {
        const partition: Partition = partitionMap.get(partitionKey);
        partitions.push({
            ...partition,
            chunks: partition.chunks.map((c) => {
                return {
                    name: c.name
                }
            })
        });
        for (const chunk of partition.chunks) {
            const outputDir = `${output}/${collectionDef.name}/${partitionKey}`;
            shell.mkdir('-p', outputDir);
            await asyncWriteFile(`${outputDir}/${chunk.name}.json`, chunk.data);
        }
    }
    const collectionManifest: Collection = {
        ...collectionDef,
        partitions: partitions
    };
    return asyncWriteFile(`${output}/${collectionDef.name}/manifest.json`, collectionManifest);
}

async function createMasterManifest(output: string) {
    const collectionManifests = [];
    await asyncGlob(`${output}/**/manifest.json`, (file) => {
        const manifest = parseContent(file.contents.toString(), file.extname);
        collectionManifests.push(manifest);
    });
    await asyncWriteFile(`${output}/manifest.json`, collectionManifests);
}


