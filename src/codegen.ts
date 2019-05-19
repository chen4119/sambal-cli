import path from 'path';
import del from "delete";
import _ from "lodash";
import yaml from "js-yaml";
import matter from 'gray-matter';
import marked from "marked";

import {gulpSeries, gulpParallel, gulpSrc, gulpRename, gulpDest} from './gulp';
import {SambalSiteMeta, UserDefinedRoute, ROUTE_TYPE} from './types';
import {
    getComponentNameFromTagName,
    getPropertyValue,
    asyncWriteFile,
    asyncReadFile
} from './utils';
import {STYLESHEET} from './templates';
import {getExportVariables, parseComponentJs} from "./ast";
import ComponentGenerator from "./componentGenerator";

_.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
const STYLESHEET_TEMPLATE = _.template(STYLESHEET);

export default class CodeGenerator {
    configFolder: string;
    componentFolder: string;
    sharedCssFolder: string;
    actionFolder: string;
    reducerFolder: string;
    jsFolder: string;
    // routes: UserDefinedRoute[] = [];
    sharedStyleSheetMap: Map<string, any> = new Map<string, any>();
    componentExportMap: Map<string, any> = new Map<string, any>();
    actionMap: Map<string, any> = new Map<string, any>();
    reducerMap: Map<string, any> = new Map<string, any>();
    siteConfig: SambalSiteMeta = {smallScreenSize: 767};
    constructor(configFolder: string, componentFolder: string, sharedCssFolder: string, actionFolder: string, reducerFolder: string, jsFolder: string) {
        this.configFolder = configFolder;
        this.componentFolder = componentFolder;
        this.sharedCssFolder = sharedCssFolder;
        this.actionFolder = actionFolder;
        this.reducerFolder = reducerFolder;
        this.jsFolder = jsFolder;
    }

    async generate() {
        const sitePath = `${this.configFolder}/site.yml`;
        const siteContent = await asyncReadFile(sitePath);
        let site: SambalSiteMeta = yaml.safeLoad(siteContent.toString());
        if (!site) {
            this.siteConfig = site;
        }

        const iterateActionsTask = () => this.iterateActionsReducers(`${this.actionFolder}/**/*`, 'actions', `${this.jsFolder}/actions`, this.actionMap);
        const iterateReducersTask = () => this.iterateActionsReducers(`${this.reducerFolder}/**/*`, 'reducers', `${this.jsFolder}/reducers`, this.reducerMap);

        const buildDependencies = gulpParallel(
            this.copyFiles.bind(this),
            this.generateSharedCss.bind(this),
            this.iterateComponentExportJs.bind(this),
            iterateActionsTask,
            iterateReducersTask
        );
        
        const build = gulpSeries(
            this.clean.bind(this),
            buildDependencies,
            this.generateComponents.bind(this)
        );
        await this.asyncGenerate(build);
    }

    asyncGenerate(gulpTask) {
        return new Promise((resolve) => {
            console.log("Generating code...");
            gulpTask((error) => {
                resolve();
            });
        });
    }

    clean(cb) {
        del.sync([
            `${this.jsFolder}/**/*`
        ]);
        cb();
    }

    copyFiles() {
        return gulpSrc(['./store.js'], (file) => {}).pipe(gulpDest(this.jsFolder));
    }

    iterateActionsReducers(
        glob: string | string[],
        targetFolder: string, 
        outputFolder: string, 
        jsMap: Map<string, any>) {
        return gulpSrc(glob, (file) => {
            console.log(file.path);
            const jsExports = getExportVariables(file.contents.toString());
            console.log(jsExports);
            const fileName = path.basename(file.basename, '.js');
            const relativePath = path.relative(file.base, file.dirname);
            const jsPath = (relativePath !== '') ? `./${targetFolder}/${relativePath}/${file.basename}` : `./${targetFolder}/${file.basename}`;
            if (jsMap.has(fileName)) {
                throw new Error(`Duplicate action or reducer filename ${fileName}`);
            }
            jsMap.set(fileName, {
                exports: jsExports,
                path: jsPath
            });
        })
        .pipe(gulpDest(outputFolder));
    }

    iterateComponentExportJs() {
        return gulpSrc(`${this.componentFolder}/**/*.export.js`, async (file) => {
            const tagName = path.basename(file.basename, '.export.js');
            const componentJs = parseComponentJs(file.contents.toString());
            if (this.componentExportMap.has(tagName)) {
                throw new Error(`Duplicate component export js filename ${tagName}`);
            }
            this.componentExportMap.set(tagName, componentJs);
        })
        .pipe(gulpDest(`${this.jsFolder}/components`));
    }

    generateComponents() {
        return gulpSrc([`${this.componentFolder}/**/*.html`, `${this.componentFolder}/**/*.md`], async (file) => {
            const tagName = path.basename(file.basename, file.extname);
            const generator = new ComponentGenerator(
                file,
                this.componentExportMap.get(tagName),
                this.sharedStyleSheetMap,
                this.actionMap,
                this.reducerMap
            );
            const source = await generator.generate();
            file.contents = new Buffer(source);
        })
        .pipe(gulpRename(".js"))
        .pipe(gulpDest(`${this.jsFolder}/components`));
    }
    
    transformSharedCss(file:any) {
        const styleName = path.basename(file.basename, '.css');
        const relativePath = path.relative(file.base, file.dirname);
        if (this.sharedStyleSheetMap.has(styleName)) {
            throw new Error(`Duplicate tagName ${styleName}`);
        }
        const css = file.contents.toString();
        const styleSheet = STYLESHEET_TEMPLATE({
            styleSheetName: styleName,
            css: css
        });
        file.contents = new Buffer(styleSheet);
    
        const styleSheetPath = (relativePath !== '') ? `${relativePath}/${styleName}.js` : `${styleName}.js`;
        this.sharedStyleSheetMap.set(styleName, styleSheetPath);
    }
    
    generateSharedCss() {
        return gulpSrc(`${this.sharedCssFolder}/**/*.css`, (file) => {
            this.transformSharedCss(file);
        })
        .pipe(gulpRename(".js"))
        .pipe(gulpDest(`${this.jsFolder}/css`));
    }
}
