import {Observable} from "rxjs";

export const CACHE_FOLDER = "./.sambal/.temp";
export const OUTPUT_FOLDER = "./public";
export const SAMBAL_CONFIG_FILE = "sambal.config.js";

interface RenderProps {
    path: string,
    params?: any
};

export type RenderFunction = (props: RenderProps) => Observable<any>;

export type Route = {
    path: string,
    render: RenderFunction
};

export type SambalEvent = {
    type: "bundle" | "sambal",
    assets: string | string[] 
}