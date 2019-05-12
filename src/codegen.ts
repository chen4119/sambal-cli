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
import {STYLESHEET, LAZY_RESOURCES} from './templates';
import {getExportVariables} from "./ast";
import ComponentGenerator from "./componentGenerator";

_.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
const STYLESHEET_TEMPLATE = _.template(STYLESHEET);
const LAZY_RESOURCES_TEMPLATE = _.template(LAZY_RESOURCES);

export default class CodeGenerator {
    configFolder: string;
    componentFolder: string;
    sharedCssFolder: string;
    actionFolder: string;
    reducerFolder: string;
    jsFolder: string;
    // routes: UserDefinedRoute[] = [];
    // styleSheetMap: Map<string, any> = new Map<string, any>();
    sharedStyleSheetMap: Map<string, any> = new Map<string, any>();
    componentMap: Map<string, any> = new Map<string, any>();
    actionMap: Map<string, any> = new Map<string, any>();
    reducerMap: Map<string, any> = new Map<string, any>();
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
            site = {smallScreenSize: 767};
        }

        const iterateActionsTask = () => this.iterateActionsReducers(`${this.actionFolder}/**/*`, 'actions', `${this.jsFolder}/actions`, this.actionMap);
        const iterateReducersTask = () => this.iterateActionsReducers(`${this.reducerFolder}/**/*`, 'reducers', `${this.jsFolder}/reducers`, this.reducerMap);

        const buildDependencies = gulpParallel(
            // copyUserIncludeFilesTask,
            // this.iterateComponentCss.bind(this),
            this.generateSharedCss.bind(this),
            iterateActionsTask,
            iterateReducersTask
        );
        
        const build = gulpSeries(
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

    /*
    async getRoutes(routesPath: string) {
        const routesContent = await asyncReadFile(routesPath);
        const routesMeta = yaml.safeLoad(routesContent.toString());
        if (routesMeta) {
            let isNotFoundDefined:boolean = false;
            for (let i = 0; i < routesMeta.length; i++) {
                if (routesMeta[i].route) {
                    this.addRoute({
                        type: ROUTE_TYPE.ROUTE,
                        ...routesMeta[i].route
                    });
                } else if (!isNotFoundDefined && routesMeta[i].notfound) {
                    this.addRoute({
                        type: ROUTE_TYPE.NOT_FOUND,
                        ...routesMeta[i].notfound
                    });
                    isNotFoundDefined = true;
                } else if (isNotFoundDefined) {
                    throw new Error(`Only one notfound route is allowed`);
                }
            }
        }
    }
    
    addRoute(route: UserDefinedRoute) {
        if (route.import) {
            if (!this.componentMap.has(route.import)) {
                throw new Error(`Unable to find path for route import ${route.import}`);
            }
            const componentPath = this.componentMap.get(route.import);
            this.routes.push({
                ...route,
                importPath: `${componentPath}/${route.import}.js`
            });
        } else {
            this.routes.push(route);
        }
    }*/

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
        });
        // .pipe(gulpDest(outputFolder));
    }

    generateComponents() {
        return gulpSrc([`${this.componentFolder}/**/*.html`, `${this.componentFolder}/**/*.md`], async (file) => {
            // console.log(file);
            const generator = new ComponentGenerator(file, this.sharedStyleSheetMap, this.actionMap, this.reducerMap);
            const source = await generator.generate();
        })
        // .pipe(gulpRename(".js"))
        // .pipe(gulpDest(`${jsFolder}/components`));
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
        });
        // .pipe(gulpRename(".js"))
        // .pipe(gulpDest(`${jsFolder}/css`));
    }
}


/*
import ts = require("typescript");
import {
    makeCallFunction,
    makeClassConstructor,
    makeClassHeritageClause,
    makeIdentifier,
    makeClassDeclaration,
    makeObjectLiteral,
    makeGetAccessor,
    makeModifier,
    makePropertyAccess,
    makeStringLiteral
} from './astFactory';

const resultFile = ts.createSourceFile(
  "someFileName.ts",
  "",
  ts.ScriptTarget.Latest,
  false,
  ts.ScriptKind.TS
);

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed
});*/


/*
const callSuper = makeCallFunction(ts.createSuper(), []);
const constructor = makeClassConstructor([], [callSuper]);
const heritage = makeClassHeritageClause(ts.SyntaxKind.ExtendsKeyword, [makeIdentifier('LitElement')]);

const properties = makeObjectLiteral([
    {name: 'content', initializer: makeObjectLiteral([{name: 'type', initializer: makeIdentifier('Object')}])}
]);
const getAccessor = makeGetAccessor('properties', [makeModifier(ts.SyntaxKind.StaticKeyword)], properties);

const myClass = makeClassDeclaration('AboutMe', [heritage], [constructor, getAccessor]);

// const ast = makeImportsStatement('@polymer/lit-element', ['LitElement', 'html']);
const assign = makeCallFunction(makePropertyAccess(makeIdentifier("customElements"), "define"), [makeStringLiteral('about-me'), makeIdentifier("AboutMe")]);
*/
/*
const tsSource = printer.printNode(
  ts.EmitHint.Unspecified,
  assign,
  resultFile
);*/

/*
const tsSource = printer.printList(
    ts.ListFormat.MultiLine,
    ts.createNodeArray([myClass, assign]),
    resultFile
  );

console.log(tsSource);*/
/*
let jsSource = ts.transpileModule(tsSource, {
    compilerOptions: { module: ts.ModuleKind.ES2015 }
});

console.log(JSON.stringify(jsSource));*/