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
