import path from 'path';
import del from "delete";
import _ from "lodash";
import yaml from "js-yaml";
import matter from 'gray-matter';
import marked from "marked";

import {gulpSeries, gulpParallel, gulpSrc, gulpRename, gulpDest} from './gulp';
import {SIMPLE_COMPONENT, REDUX_COMPONENT, APP, STYLESHEET, LAZY_RESOURCES} from './templates';
import {SambalSiteMeta, UserDefinedRoute, ROUTE_TYPE} from './types';
import {
    getComponentNameFromTagName,
    getPropertyValue,
    asyncWriteFile,
    asyncReadFile
} from './utils';

_.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
const SIMPLE_COMPONENT_TEMPLATE = _.template(SIMPLE_COMPONENT);
const REDUX_COMPONENT_TEMPLATE = _.template(REDUX_COMPONENT);
const APP_TEMPLATE = _.template(APP);
const STYLESHEET_TEMPLATE = _.template(STYLESHEET);
const LAZY_RESOURCES_TEMPLATE = _.template(LAZY_RESOURCES);
const JS_EXPORT_REGEX = /\s+?export\s+const\s+([\S]+)/g;

export async function generate(configFolder: string, componentFolder: string, sharedCssFolder: string, actionFolder: string, reducerFolder: string, jsFolder: string) {
    const sitePath = `${configFolder}/site.yml`;
    const siteContent = await asyncReadFile(sitePath);
    let site: SambalSiteMeta = yaml.safeLoad(siteContent.toString());
    if (!site) {
        site = {smallScreenSize: 767};
    }
    const routes: UserDefinedRoute[] = [];
    const styleSheetMap = new Map<string, any>();
    const sharedStyleSheetMap = new Map<string, any>();
    const componentMap = new Map<string, any>();
    const actionMap = new Map<string, any>();
    const reducerMap = new Map<string, any>();
    const eagerIncludeList: string[] = [];
    const lazyIncludeList: string[] = []; 
    const cleanTask = (cb) => {
        clean(jsFolder);
        cb();
    };
    const getRoutesTask = () => getRoutes(`${configFolder}/routes.yml`, routes, componentMap);
    const copyUserIncludeFilesTask = () => copyUserIncludeFiles(configFolder, jsFolder, eagerIncludeList, lazyIncludeList);
    const iterateActionsTask = () => iterateActionsReducers(`${actionFolder}/**/*`, 'actions', `${jsFolder}/actions`, actionMap);
    const iterateReducersTask = () => iterateActionsReducers(`${reducerFolder}/**/*`, 'reducers', `${jsFolder}/reducers`, reducerMap);
    const iterateComponentCssTask = () => iterateComponentCss(componentFolder, styleSheetMap);
    const generateSharedCssTask = () => generateSharedCss(
        sharedCssFolder,
        jsFolder,
        sharedStyleSheetMap
    );
    const generateComponentTask = () => generateComponents(
        site,
        componentFolder,
        jsFolder,
        styleSheetMap,
        sharedStyleSheetMap,
        componentMap,
        actionMap,
        reducerMap
    );
    const generateLazyResourceFileTask = () => generateLazyResourceFile(jsFolder, routes, componentMap, lazyIncludeList);
    const generateAppTask = () => generateApp(
        site,
        routes,
        jsFolder,
        styleSheetMap, 
        sharedStyleSheetMap,
        actionMap, 
        reducerMap,
        eagerIncludeList);
    const buildDependencies = gulpParallel(
            copyUserIncludeFilesTask,
            iterateComponentCssTask,
            generateSharedCssTask,
            iterateActionsTask,
            iterateReducersTask
        );
    const build = gulpSeries(
        cleanTask,
        buildDependencies,
        generateComponentTask,
        getRoutesTask,
        generateLazyResourceFileTask,
        generateAppTask
    );
    await asyncGenerate(build);
}

function asyncGenerate(gulpTask) {
    return new Promise((resolve) => {
        console.log("Generating code...");
        gulpTask((error) => {
            resolve();
        });
    });
}

function clean(jsFolder: string) {
    del.sync([
        `${jsFolder}/**/*`
    ]);
}

function copyUserIncludeFiles(configFolder: string, jsFolder: string, eagerIncludeList: string[], lazyIncludeList: string[]) {
    return gulpSrc([`${configFolder}/eager.js`, `${configFolder}/lazy.js`], (file) => {
        if (file.basename === 'eager.js') {
            eagerIncludeList.push('./eager.js');
        }
        if (file.basename === 'lazy.js') {
            lazyIncludeList.push('./lazy.js');
        }
    })
    .pipe(gulpDest(jsFolder));
}

async function getRoutes(routesPath: string, routes: UserDefinedRoute[], componentMap: Map<string, any>) {
    const routesContent = await asyncReadFile(routesPath);
    const routesMeta = yaml.safeLoad(routesContent.toString());
    if (routesMeta) {
        let isNotFoundDefined:boolean = false;
        for (let i = 0; i < routesMeta.length; i++) {
            if (routesMeta[i].route) {
                addRoute(routes, {
                    type: ROUTE_TYPE.ROUTE,
                    ...routesMeta[i].route
                }, componentMap);
            } else if (!isNotFoundDefined && routesMeta[i].notfound) {
                addRoute(routes, {
                    type: ROUTE_TYPE.NOT_FOUND,
                    ...routesMeta[i].notfound
                }, componentMap);
                isNotFoundDefined = true;
            } else if (isNotFoundDefined) {
                throw new Error(`Only one notfound route is allowed`);
            }
        }
    }
}

function addRoute(routes: UserDefinedRoute[], route: UserDefinedRoute, componentMap: Map<string, any>) {
    if (route.import) {
        if (!componentMap.has(route.import)) {
            throw new Error(`Unable to find path for route import ${route.import}`);
        }
        const componentPath = componentMap.get(route.import);
        routes.push({
            ...route,
            importPath: `${componentPath}/${route.import}.js`
        });
    } else {
        routes.push(route);
    }
}

function iterateActionsReducers(
    glob: string | string[],
    targetFolder: string, 
    outputFolder: string, 
    jsMap: Map<string, any>) {
    return gulpSrc(glob, (file) => {
        const content = file.contents.toString();
        const jsExports = [];
        let match;
        do {
            match = JS_EXPORT_REGEX.exec(content);
            if (match) {
                jsExports.push(match[1]);
            }
        } while (match);
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

function iterateComponentCss(componentFolder: string, styleSheetMap: Map<string, any>) {
    return gulpSrc([`${componentFolder}/**/*.css`, './app.css'], (file) => {
        const tagName = path.basename(file.basename, '.css');
        // const output = await less.render(file.contents.toString());
        const css = file.contents.toString();
        if (styleSheetMap.has(tagName)) {
            throw new Error(`Duplicate tagName ${tagName}`);
        }
        styleSheetMap.set(tagName, css);
    });
}

function transformSharedCss(file:any, sharedStyleSheetMap: Map<string, any>) {
    const styleName = path.basename(file.basename, '.css');
    const relativePath = path.relative(file.base, file.dirname);
    if (sharedStyleSheetMap.has(styleName)) {
        throw new Error(`Duplicate tagName ${styleName}`);
    }
    const css = file.contents.toString();
    const styleSheet = STYLESHEET_TEMPLATE({
        styleSheetName: styleName,
        css: css
    });
    file.contents = new Buffer(styleSheet);

    const styleSheetPath = (relativePath !== '') ? `${relativePath}/${styleName}.js` : `${styleName}.js`;
    sharedStyleSheetMap.set(styleName, styleSheetPath);
}

function generateSharedCss(sharedCssFolder: string, jsFolder: string, sharedStyleSheetMap: Map<string, any>) {
    return gulpSrc(`${sharedCssFolder}/**/*.css`, (file) => {
        transformSharedCss(file, sharedStyleSheetMap);
    })
    .pipe(gulpRename(".js"))
    .pipe(gulpDest(`${jsFolder}/css`));
}

function importActionsAndSelectors(componentPath: string, jsMap: Map<string, any>, actionsAndSelectors: any[]) {
    for (const name of jsMap.keys()) {
        const meta = jsMap.get(name);
        let relativePath = path.relative(componentPath, meta.path);
        // path needs to begin with ./
        if (relativePath.indexOf('.') !== 0) {
            relativePath = `./${relativePath}`;
        }
        if (meta.exports.length > 0) {
            actionsAndSelectors.push({
                imports: meta.exports.join(', '),
                path: relativePath
            });
        }
    }
}

function transformComponentTemplate(
    site: SambalSiteMeta,
    file: any,
    styleSheetMap: Map<string, any>,
    sharedStyleSheetMap: Map<string, any>,
    componentMap: Map<string, any>,
    actionMap: Map<string, any>,
    reducerMap: Map<string, any>) {
    const tagName = path.basename(file.basename, file.extname);
    const relativePath = path.relative(file.base, file.dirname);
    const componentName = getComponentNameFromTagName(tagName);
    const componentPath = (relativePath !== '') ? `./components/${relativePath}` : `./components`;
    if (componentMap.has(tagName)) {
        throw new Error(`Duplicate tagName ${tagName}`);
    }
    const frontMatter = matter(file.contents.toString());
    let html = frontMatter.content;
    if (file.extname === '.md') {
        html = marked(html);
    }
    console.log(tagName);
    console.log(frontMatter.data);
    const componentProps = getComponentProps(site, frontMatter.data);
    const includeStyleSheets = getIncludeStyleSheets(frontMatter.data, componentPath, sharedStyleSheetMap);
    let actionsAndSelectors = [];
    importActionsAndSelectors(componentPath, actionMap, actionsAndSelectors);
    importActionsAndSelectors(componentPath, reducerMap, actionsAndSelectors);

    const styleSheet = styleSheetMap.has(tagName) ? `<style>${styleSheetMap.get(tagName)}</style>` : "";
    const template = styleSheet + html;
    let component = '';
    if (componentProps.stateProps.length > 0) {
        component = REDUX_COMPONENT_TEMPLATE({
            tagName: tagName,
            includeStyleSheets: includeStyleSheets,
            componentName: componentName,
            properties: componentProps.properties,
            attributes: componentProps.attributes,
            stateProps: componentProps.stateProps,
            actionsAndSelectors: actionsAndSelectors,
            template: template
        });
    } else {
        component = SIMPLE_COMPONENT_TEMPLATE({
            tagName: tagName,
            includeStyleSheets: includeStyleSheets,
            componentName: componentName,
            properties: componentProps.properties,
            attributes: componentProps.attributes,
            actionsAndSelectors: actionsAndSelectors,
            template: template
        });
    }
    file.contents = new Buffer(component);
    componentMap.set(tagName, componentPath);
}

function getComponentProps(site: SambalSiteMeta, frontMatter: any) {
    let stateProps = [];
    let attributes = [];
    const properties = parseProperties(site, frontMatter);
    attributes = properties.filter((p) => typeof(p.state) !== 'undefined' || p.attribute);
    stateProps = properties.filter((p) => typeof(p.state) !== 'undefined');
    return {
        properties: properties,
        stateProps: stateProps,
        attributes: attributes
    };
}

function getIncludeStyleSheets(frontMatter: any, componentPath: string, sharedStyleSheetMap: Map<string, any>) {
    const includeStyleSheets = [];
    if (frontMatter.includeStyleSheets) {
        let includes = [];
        if (typeof(frontMatter.includeStyleSheets) === 'string') {
            includes.push(frontMatter.includeStyleSheets);
        } else if (Array.isArray(frontMatter.includeStyleSheets)) {
            includes = frontMatter.includeStyleSheets;
        }
        for (const styleName of includes) {
            if (sharedStyleSheetMap.has(styleName)) {
                const styleSheetRelativePath = sharedStyleSheetMap.get(styleName);
                let styleSheetPath = path.relative(componentPath, `./css/${styleSheetRelativePath}`);
                if (styleSheetPath.indexOf('.') !== 0) {
                    styleSheetPath = `./${styleSheetPath}`;
                }
                includeStyleSheets.push({
                    name: styleName,
                    path: styleSheetPath
                });
            } else {
                throw new Error(`Style sheet ${styleName} not found`);
            }
        }
    }
    return includeStyleSheets;
}

function evalVar(site: SambalSiteMeta, variable: string){
    return new Function("site", "return " + variable + ";").call(this, site);
}

function parseProperties(site: SambalSiteMeta, frontMatter: any) {
    const properties = [];
    if (frontMatter.properties) {
        const propKeys = Object.keys(frontMatter.properties);
        for (let i = 0; i < propKeys.length; i++) {
            const propName = propKeys[i];
            const prop = frontMatter.properties[propName];
            console.log(prop);
            const property = {
                name: propName,
                type: prop.type,
                attribute: prop.attribute ? true : false,
                value: 'null', // null value
                state: prop.state
            };
            if (prop.init) {
                if (typeof(prop.init) === 'string' && prop.init.indexOf('site.') === 0) {
                    property.value = getPropertyValue(prop.type, evalVar(site, prop.init));
                } else {
                    property.value = getPropertyValue(prop.type, prop.init);
                }
            }
            properties.push(property);
        }
    }
    return properties;
}

function generateComponents(
    site: SambalSiteMeta,
    componentFolder: string, 
    jsFolder: string, 
    styleSheetMap: Map<string, any>,
    sharedStyleSheetMap: Map<string, any>,
    componentMap: Map<string, any>,
    actionMap: Map<string, any>,
    reducerMap: Map<string, any>) {
    return gulpSrc([`${componentFolder}/**/*.html`, `${componentFolder}/**/*.md`], (file) => {
        transformComponentTemplate(site, file, styleSheetMap, sharedStyleSheetMap, componentMap, actionMap, reducerMap);
    })
    .pipe(gulpRename(".js"))
    .pipe(gulpDest(`${jsFolder}/components`));
}

function generateLazyResourceFile(jsFolder: string, routes: UserDefinedRoute[], componentMap: Map<string, any>, lazyIncludes: string[]) {
    const lazyComponents = [];
    for (const tagName of componentMap.keys()) {
        if (routes.findIndex((r) => r.import === tagName) < 0) {
            const componentPath = componentMap.get(tagName);
            lazyComponents.push({
                path: `${componentPath}/${tagName}.js`
            });
        }
    }
    const lazyResources = LAZY_RESOURCES_TEMPLATE({
        includes: lazyIncludes,
        components: lazyComponents
    });
    return asyncWriteFile(`${jsFolder}/lazyResources.js`, lazyResources);
}

function generateApp(
    site: SambalSiteMeta,
    routes: UserDefinedRoute[],
    jsFolder: string,
    styleSheetMap: Map<string, any>,
    sharedStyleSheetMap: Map<string, any>,
    actionMap: Map<string, any>,
    reducerMap: Map<string, any>,
    eagerIncludes: string[]) {
    return gulpSrc(['./app.html', './app.md'], (file) => {
        const componentPath = './';

        const frontMatter = matter(file.contents.toString());
        let html = frontMatter.content;
        if (file.extname === '.md') {
            html = marked(html);
        }
        const componentProps = getComponentProps(site, frontMatter.data);
        const includeStyleSheets = getIncludeStyleSheets(frontMatter.data, componentPath, sharedStyleSheetMap);
        let actionsAndSelectors = [];
        importActionsAndSelectors(componentPath, actionMap, actionsAndSelectors);
        importActionsAndSelectors(componentPath, reducerMap, actionsAndSelectors);

        const styleSheetName = 'app';
        const internalPathProperty = {name: '_path_', type: 'String', value: '"/"', state: 'sambal.path'};
        const properties = [
            ...componentProps.properties,
            internalPathProperty
        ];

        const styleSheet = styleSheetMap.has(styleSheetName) ? `<style>${styleSheetMap.get(styleSheetName)}</style>` : "";
        const template = styleSheet + html;
        const app = APP_TEMPLATE({
            site: site,
            routes: routes,
            includes: eagerIncludes,
            includeStyleSheets: includeStyleSheets,
            properties: [...componentProps.properties, internalPathProperty],
            attributes: [...componentProps.attributes, internalPathProperty],
            stateProps: [...componentProps.stateProps, internalPathProperty],
            actionsAndSelectors: actionsAndSelectors,
            template: template
        });
        file.contents = new Buffer(app);
    })
    .pipe(gulpRename(".js"))
    .pipe(gulpDest(`${jsFolder}`));
}

