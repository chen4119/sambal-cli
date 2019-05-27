import {Type} from "sambal-fs";

/*
export interface SambalSiteMeta {
    smallScreenSize: number;
}*/

export interface DataSource {
    name: string;
    type: Type;
    glob?: string | string[];
}

export interface SambalConfig {
    configFolder?: string;
    componentFolder?: string;
    assetFolder?: string;
    actionFolder?: string;
    reducerFolder?: string;
    dataFolder?: string;
    jsFolder?: string;
}

export interface UserDefinedRoute {
    type: ROUTE_TYPE;
    path: string;
    import?: string;
    title?: string;
    description?: string;
    [propName: string]: any;
}

export enum ROUTE_TYPE {
    ROUTE = 'route',
    NOT_FOUND = 'notfound'
};
