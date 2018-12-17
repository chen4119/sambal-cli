import path from 'path';
import del from "delete";
import _ from "lodash";
import yaml from "js-yaml";
// import less from "less";
import marked from "marked";

import {gulpSeries, gulpParallel, gulpSrc, gulpRename, gulpDest} from './gulp';
import {SIMPLE_COMPONENT, REDUX_COMPONENT, APP, STYLESHEET} from './templates';
import {SambalSiteMeta} from './types';
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
const JS_EXPORT_REGEX = /\s+?export\s+const\s+([\S]+)/g;

export async function generate(configFolder: string, componentFolder: string, themeFolder: string, actionFolder: string, reducerFolder: string, jsFolder: string) {
    const sitePath = `${configFolder}/site.yml`;
    const routesPath = `${configFolder}/routes.yml`;
    const siteContent = await asyncReadFile(sitePath);
    const site: SambalSiteMeta = yaml.safeLoad(siteContent.toString());
    const routes = await getRoutes(routesPath, site);

    const metaMap = new Map<string, any>();
    const styleSheetMap = new Map<string, any>();
    const themeSharedStyleSheetMap = new Map<string, any>();
    const componentSharedStyleSheetMap = new Map<string, any>();
    const componentMap = new Map<string, any>();
    const actionMap = new Map<string, any>();
    const reducerMap = new Map<string, any>();
    const cleanTask = (cb) => {
        clean(jsFolder);
        cb();
    };
    const iterateMetaTask = () => iterateMetas(site, componentFolder, themeFolder, metaMap);
    const iterateActionsTask = () => iterateActionsReducers(`${actionFolder}/**/*`, 'actions', `${jsFolder}/actions`, actionMap);
    const iterateReducersTask = () => iterateActionsReducers(`${reducerFolder}/**/*`, 'reducers', `${jsFolder}/reducers`, reducerMap);
    const iterateComponentCssTask = () => iterateComponentCss(site, componentFolder, themeFolder, styleSheetMap);
    const generateThemeSharedCssTask = () => generateSharedCss(
        `${themeFolder}/${site.theme}/css/**/*.css`,
        `${jsFolder}/theme/css`,
        themeSharedStyleSheetMap
    );
    const generateComponentSharedCssTask = () => generateSharedCss(
        `${componentFolder}/css/**/*.css`,
        `${jsFolder}/components/css`,
        componentSharedStyleSheetMap
    );
    const generateComponentTask = () => generateTemplates(
        [`${componentFolder}/**/*.html`, `${componentFolder}/**/*.md`],
        "components",
        `${jsFolder}/components`,
        metaMap,
        styleSheetMap,
        componentSharedStyleSheetMap,
        componentMap,
        actionMap,
        reducerMap
    );
    const generateThemeTask = () => generateTemplates(
        `${themeFolder}/${site.theme}/**/*.html`,
        "theme",
        `${jsFolder}/theme`,
        metaMap,
        styleSheetMap,
        themeSharedStyleSheetMap,
        componentMap,
        actionMap,
        reducerMap
    );
    const generateAppTask = () => generateApp(site, routes, jsFolder, componentMap, reducerMap);
    const buildDependencies = gulpParallel(
            iterateMetaTask, 
            iterateComponentCssTask, 
            generateThemeSharedCssTask, 
            generateComponentSharedCssTask,
            iterateActionsTask,
            iterateReducersTask
        );
    const build = gulpSeries(
        cleanTask,
        buildDependencies,
        generateComponentTask,
        generateThemeTask,
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
        `${jsFolder}/components/**/*`,
        `${jsFolder}/theme/**/*`,
        `${jsFolder}/app.js`
    ]);
}

async function getRoutes(routesPath: string, site: SambalSiteMeta) {
    const routesContent = await asyncReadFile(routesPath);
    const routesMeta = yaml.safeLoad(routesContent.toString());
    const routes = [];
    for (let i = 0; i < routesMeta.length; i++) {
        const route = routesMeta[i].route;
        let template = ''; 
        for (let j = 0; j < route.slots.length; j++) {
            const slot = route.slots[j];
            const slotName = Object.keys(slot)[0];
            const componentTagName = slot[slotName];
            if (slotName === 'main') {
                template += `<${componentTagName}></${componentTagName}>`;
            } else {
                template += `<${componentTagName} slot="${slotName}"></${componentTagName}>`;
            }
        }
        routes.push({
            path: route.path,
            template: template
        });
    }
    return routes;
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

function evalVar(variable: string, site: SambalSiteMeta){
    return new Function("site", "return " + variable + ";").call(this, site);
}

function iterateMetas(site: SambalSiteMeta, componentFolder: string, themeFolder: string, metaMap: Map<string, any>) {
    const theme = site.theme;
    return gulpSrc([`${componentFolder}/**/*.yml`, `${themeFolder}/${theme}/**/*.yml`], (file) => {
        const tagName = path.basename(file.basename, '.yml');
        const componentMeta = yaml.safeLoad(file.contents.toString());
        const properties = [];
        if (componentMeta.properties) {
            const propKeys = Object.keys(componentMeta.properties);
            for (let i = 0; i < propKeys.length; i++) {
                const propName = propKeys[i];
                const prop = componentMeta.properties[propName];
                const property = {
                    name: propName,
                    type: prop.type,
                    attribute: prop.attribute ? true : false,
                    value: '',
                    state: prop.state
                };
                if (typeof(prop.init) === 'string' && prop.init.indexOf('site.') === 0) {
                    property.value = getPropertyValue(prop.type, evalVar(prop.init, site));
                } else {
                    property.value = getPropertyValue(prop.type, prop.init);
                }
                properties.push(property);
            }
        }
        const includeStyleSheets = componentMeta.includeStyleSheets ? componentMeta.includeStyleSheets : [];
        if (metaMap.has(tagName)) {
            throw new Error(`Duplicate tagName ${tagName}`);
        }
        metaMap.set(tagName, {
            properties: properties,
            includeStyleSheets: includeStyleSheets
        });
    });
}

function iterateComponentCss(site: SambalSiteMeta, componentFolder: string, themeFolder: string, styleSheetMap: Map<string, any>) {
    const theme = site.theme;
    return gulpSrc([
            `${componentFolder}/**/*.css`,
            `!${componentFolder}/css/**/*.css`,
            `${themeFolder}/${theme}/**/*.css`, 
            `!${themeFolder}/${theme}/css/**/*.css`
        ], (file) => {
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
    // console.log('shared stylesheet filename: ' + file.basename);
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

function generateSharedCss(
    glob: string | string[], 
    outputFolder: string, 
    sharedStyleSheetMap: Map<string, any>) {
    return gulpSrc(glob, (file) => {
        transformSharedCss(file, sharedStyleSheetMap);
    })
    .pipe(gulpRename(".js"))
    .pipe(gulpDest(outputFolder));
}

function importActionsAndSelectors(componentPath: string, jsMap: Map<string, any>, actionsAndSelectors: any[]) {
    for (const name of jsMap.keys()) {
        const meta = jsMap.get(name);
        const relativePath = path.relative(componentPath, meta.path);
        if (meta.exports.length > 0) {
            actionsAndSelectors.push({
                imports: meta.exports.join(', '),
                path: relativePath
            });
        }
    }
}

function transformTemplate(
    file: any, 
    targetFolder: string, 
    metaMap: Map<string, any>, 
    styleSheetMap: Map<string, any>,
    sharedStyleSheetMap: Map<string, any>,
    componentMap: Map<string, any>,
    actionMap: Map<string, any>,
    reducerMap: Map<string, any>) {
    const tagName = path.basename(file.basename, file.extname);
    const relativePath = path.relative(file.base, file.dirname);
    const componentName = getComponentNameFromTagName(tagName);
    const componentPath = (relativePath !== '') ? `./${targetFolder}/${relativePath}` : `./${targetFolder}`;

    if (componentMap.has(tagName)) {
        throw new Error(`Duplicate tagName ${tagName}`);
    }
    let html = file.contents.toString();
    if (file.extname === '.md') {
        html = marked(file.contents.toString());
    }
    let properties = [];
    let stateProps = [];
    let attributes = [];
    let includeStyleSheets = [];
    let actionsAndSelectors = [];
    if (metaMap.has(tagName)) {
        const componentMeta = metaMap.get(tagName);
        properties = componentMeta.properties;
        attributes = properties.filter((p) => typeof(p.state) !== 'undefined' || p.attribute)
        stateProps = properties.filter((p) => typeof(p.state) !== 'undefined')

        for (const styleName of componentMeta.includeStyleSheets) {
            if (sharedStyleSheetMap.has(styleName)) {
                const styleSheetRelativePath = sharedStyleSheetMap.get(styleName);
                let styleSheetPath = path.relative(componentPath, `./${targetFolder}/css/${styleSheetRelativePath}`);
                if (styleSheetPath.indexOf('.') !== 0) {
                    styleSheetPath = `./${styleSheetPath}`;
                }
                includeStyleSheets.push({
                    name: styleName,
                    path: styleSheetPath
                });
            }
        
        }
    }
    importActionsAndSelectors(componentPath, actionMap, actionsAndSelectors);
    importActionsAndSelectors(componentPath, reducerMap, actionsAndSelectors);

    const styleSheet = styleSheetMap.has(tagName) ? `<style>${styleSheetMap.get(tagName)}</style>` : "";
    const template = styleSheet + html;
    let component = '';
    if (stateProps.length > 0) {
        component = REDUX_COMPONENT_TEMPLATE({
            tagName: tagName,
            includeStyleSheets: includeStyleSheets,
            componentName: componentName,
            properties: properties,
            attributes: attributes,
            stateProps: stateProps,
            actionsAndSelectors: actionsAndSelectors,
            template: template
        });
    } else {
        component = SIMPLE_COMPONENT_TEMPLATE({
            tagName: tagName,
            includeStyleSheets: includeStyleSheets,
            componentName: componentName,
            properties: properties,
            attributes: attributes,
            actionsAndSelectors: actionsAndSelectors,
            template: template
        });
    }
    file.contents = new Buffer(component);

    componentMap.set(tagName, componentPath);
}

function generateTemplates(
    glob: string | string[], 
    targetFolder: string, 
    outputFolder: string, 
    metaMap: Map<string, any>, 
    styleSheetMap: Map<string, any>,
    sharedStyleSheetMap: Map<string, any>,
    componentMap: Map<string, any>,
    actionMap: Map<string, any>,
    reducerMap: Map<string, any>) {
    return gulpSrc(glob, (file) => {
        transformTemplate(file, targetFolder, metaMap, styleSheetMap, sharedStyleSheetMap, componentMap, actionMap, reducerMap);
    })
    .pipe(gulpRename(".js"))
    .pipe(gulpDest(outputFolder));
}

function generateApp(site: SambalSiteMeta, routes: any[], jsFolder: string, componentMap: Map<string, any>, reducerMap: Map<string, any>) {
    const theme = site.theme;
    const themeTagName = `${theme}-theme`;
    const components = [];
    for (const tagName of componentMap.keys()) {
        const componentPath = componentMap.get(tagName);
        components.push({
            path: `${componentPath}/${tagName}.js`
        })
    }
    const reducers = [];
    for (const name of reducerMap.keys()) {
        const reducerMeta = reducerMap.get(name);
        reducers.push({
            name: name,
            path: reducerMeta.path
        });
    }
    const app = APP_TEMPLATE({
        components: components,
        routes: routes,
        reducers: reducers,
        themeTagName: themeTagName
    });
    return asyncWriteFile(`${jsFolder}/app.js`, app);
}

