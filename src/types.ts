export interface SambalSiteMeta {
    smallScreenSize: number;
}

export interface SambalConfig {
    configFolder?: string;
    componentFolder?: string;
    sharedCssFolder?: string;
    actionFolder?: string;
    reducerFolder?: string;
    collectionFolder?: string;
    jsFolder?: string;
}

export interface UserDefinedRoute {
    path: string;
    import?: string;
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
