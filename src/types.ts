export interface SambalSiteMeta {
    theme: string;
}

export interface SambalConfig {
    configFolder?: string;
    componentFolder?: string;
    themeFolder?: string;
    collectionFolder?: string;
    jsFolder?: string;
}

export interface UserDefinedCollection {
    name: string;
    type: UserDefinedType;
    sortBy?: Sort[];
    partitionBy?: string[];
}

export interface UserDefinedType {
    name: string;
    glob: string | string[];
    primaryKey: string | string[];
    indexFields?: string[];
}

export interface UserDefinedRoute {
    path: string;
    slots: any[];
    fetch?: Fetch;
}

export interface Fetch {
    collection?: string;
    type?: string;

}

export interface Manifest {
    collections: Collection[];
}

export interface Collection {
    name: string;
    sortBy?: Sort[];
    partitionBy?: string[];
    partitions: Partition[];
}

export interface Partition {
    key: string;
    chunks: Chunk[];
}

export interface Chunk {
    name: string;
    data?: Entry[];
}

export interface Sort {
    field: string;
    order: "desc" | "asc";
}

export interface Entry {
    meta: any,
    path: string
}
