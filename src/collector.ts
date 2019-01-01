import matter from 'gray-matter';
import {gulpSeries, gulpSrc, asyncGlob} from './gulp';
import {Schema, Collection, CollectionBuilder, Type, SambalWriter} from "sambal-fs";
import {DataSource} from "./types";

export async function collect(sources: DataSource[], schema: Schema, output: string) {
    const sambalWriter: SambalWriter = new SambalWriter(schema, {
        type: "local",
        host: output
    });

    for (const source of sources) {
        await saveObjects(sambalWriter, source);
    }
    for (const source of sources) {
        for (const collection of schema.collections) {
            const session: CollectionBuilder = sambalWriter.buildCollection(collection.name);
            await buildCollection(source, session, collection);
        }
    }
}

function saveObjects(sambalWriter: SambalWriter, source: DataSource) {
    return asyncGlob(source.glob, async (file) => {
        const fileContent = parseFile(file.contents.toString(), file.extname);
        if (!fileContent) {
            throw new Error(`Unrecognized file type ${file.basename}`);
        }
        await sambalWriter.upsertObject(source.type.name, fileContent.meta, fileContent.content);
    });
}

function buildCollection(source: DataSource, session: CollectionBuilder, collection: Collection) {
    const indexFilesTask = () => indexFiles(source, session, collection);
    const saveTask = () => session.end();
    
    return new Promise(function(resolve, reject) {
        gulpSeries(indexFilesTask, saveTask)(() => {
            resolve();
        });
    });
}

function indexFiles(source: DataSource, session: CollectionBuilder, collection: Collection) {
    return gulpSrc(source.glob, async (file) => {
        const fileContent = parseFile(file.contents.toString(), file.extname);
        if (!fileContent) {
            throw new Error(`Unrecognized file type ${file.basename}`);
        }
        await session.addObject(fileContent.meta);
    });
}

function parseFile(fileContent: string, extname: string) {
    let meta = null;
    let content = null;
    switch (extname) {
        case ".json":
            meta = JSON.parse(fileContent);
            content = meta;
            break;
        case ".md":
            const frontMatter = matter(fileContent);
            meta = frontMatter.data;
            content = frontMatter.content;
            break;
        default:
            return null;
    }
    return {
        meta: meta,
        content: content
    };
}


