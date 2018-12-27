import matter from 'gray-matter';
import {gulpSeries, asyncGlob} from './gulp';
import {Schema, Collection, UpsertCollectionSession, SambalWriter} from "sambal-fs";

export async function collect(schema: Schema, output: string) {
    const sambalWriter: SambalWriter = new SambalWriter(schema, {
        type: "local",
        output: output
    });

    for (let i = 0; i < schema.collections.length; i++) {
        const collection = schema.collections[i];
        const session: UpsertCollectionSession = sambalWriter.beginUpsertCollection(collection.name);
        await goCollect(session, collection);
    }
}

function goCollect(session: UpsertCollectionSession, collection: Collection) {
    const indexFilesTask = () => indexFiles(session, collection);
    const saveTask = () => session.end();
    
    return new Promise(function(resolve, reject) {
        gulpSeries(indexFilesTask, saveTask)(() => {
            resolve();
        });
    });
}

function indexFiles(session: UpsertCollectionSession, collection: Collection) {
    return asyncGlob(collection.type.source, (file) => {
        const obj = parseContent(file.contents.toString(), file.extname);
        session.upsertObject(obj);
    });
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


