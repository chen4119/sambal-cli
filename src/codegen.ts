import path from 'path';
import del from "delete";
import _ from "lodash";

import {gulpSeries, gulpParallel, gulpSrc, gulpRename, gulpDest} from './gulp';
import {REDUX_STORE_FILE_PATH} from './constants';
import {STYLESHEET} from './templates';
import {getExportVariables, parseComponentJs} from "./ast";
import ComponentGenerator from "./componentGenerator";

_.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
const STYLESHEET_TEMPLATE = _.template(STYLESHEET);

export default class CodeGenerator {
    componentFolder: string;
    assetFolder: string;
    actionFolder: string;
    reducerFolder: string;
    jsFolder: string;
    // routes: UserDefinedRoute[] = [];
    sharedStyleSheetMap: Map<string, any> = new Map<string, any>();
    componentExportMap: Map<string, any> = new Map<string, any>();
    actionMap: Map<string, any> = new Map<string, any>();
    reducerMap: Map<string, any> = new Map<string, any>();
    constructor(componentFolder: string, assetFolder: string, actionFolder: string, reducerFolder: string, jsFolder: string) {
        this.componentFolder = componentFolder;
        this.assetFolder = assetFolder;
        this.actionFolder = actionFolder;
        this.reducerFolder = reducerFolder;
        this.jsFolder = jsFolder;
    }

    async generate() {
        const iterateActionsTask = () => this.iterateActionsReducers(`${this.actionFolder}/**/*`, 'actions', `${this.jsFolder}/actions`, this.actionMap);
        const iterateReducersTask = () => this.iterateActionsReducers(`${this.reducerFolder}/**/*`, 'reducers', `${this.jsFolder}/reducers`, this.reducerMap);

        const buildDependencies = gulpParallel(
            this.copyFiles.bind(this),
            this.copyAssets.bind(this),
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
        return gulpSrc([REDUX_STORE_FILE_PATH], (file) => {}).pipe(gulpDest(this.jsFolder));
    }

    copyAssets() {
        return gulpSrc([`${this.assetFolder}/**/*`, `!${this.assetFolder}/css/**/*`], (file) => {}).pipe(gulpDest(`${this.jsFolder}/${this.assetFolder}`));
    }

    iterateActionsReducers(
        glob: string | string[],
        targetFolder: string, 
        outputFolder: string, 
        jsMap: Map<string, any>) {
        return gulpSrc(glob, (file) => {
            const jsExports = getExportVariables(file.contents.toString());
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
                this.componentFolder,
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
        .pipe(gulpDest(`${this.jsFolder}/${this.componentFolder}`));
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
    
        const styleSheetPath = (relativePath !== '') ? `./${this.assetFolder}/css/${relativePath}/${styleName}.js` : `./${this.assetFolder}/css/${styleName}.js`;
        this.sharedStyleSheetMap.set(styleName, styleSheetPath);
    }
    
    generateSharedCss() {
        return gulpSrc(`${this.assetFolder}/css/**/*.css`, (file) => {
            this.transformSharedCss(file);
        })
        .pipe(gulpRename(".js"))
        .pipe(gulpDest(`${this.jsFolder}/${this.assetFolder}/css`));
    }
}
