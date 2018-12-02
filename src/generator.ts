import path from 'path';
import del from "delete";
import _ from "lodash";
import yaml from "js-yaml";
import less from "less";
import marked from "marked";

import {gulpSeries, gulpParallel, gulpSrc, gulpRename, gulpDest} from './gulp';
import {COMPONENT, APP} from './templates';
import {SambalSiteMeta} from './types';
import {
    getComponentNameFromTagName,
    getPropertyValue,
    asyncWriteFile,
    asyncReadFile
} from './utils';

const COMPONENT_TEMPLATE = _.template(COMPONENT);
const APP_TEMPLATE = _.template(APP);

export async function generate(configFolder: string, componentFolder: string, themeFolder: string, jsFolder: string) {
    const sitePath = `${configFolder}/site.yml`;
    const routesPath = `${configFolder}/routes.yml`;
    const siteContent = await asyncReadFile(sitePath);
    const site: SambalSiteMeta = yaml.safeLoad(siteContent.toString());
    const routes = await getRoutes(routesPath, site);

    const propertiesMap = new Map<string, any>();
    const styleSheetMap = new Map<string, any>();
    const componentMap = new Map<string, any>();
    const cleanTask = (cb) => {
        clean(jsFolder);
        cb();
    };
    const iterateMetaTask = () => iterateMetas(site, componentFolder, themeFolder, propertiesMap);
    const iterateStyleSheetTask = () => iterateStyleSheets(site, componentFolder, themeFolder, styleSheetMap);
    const generateComponentTask = () => generateTemplates(
        [`${componentFolder}/**/*.html`, `${componentFolder}/**/*.md`],
        "components",
        `${jsFolder}/components`,
        propertiesMap,
        styleSheetMap,
        componentMap
    );
    const generateThemeTask = () => generateTemplates(
        `${themeFolder}/${site.theme}/**/*.html`,
        "theme",
        `${jsFolder}/theme`,
        propertiesMap,
        styleSheetMap,
        componentMap
    );
    const generateAppTask = () => generateApp(routes, jsFolder, componentMap);
    const buildDependencies = gulpParallel(iterateMetaTask, iterateStyleSheetTask);
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
    const theme = site.theme;
    const themeTagName = `${theme}-theme`;
    const routesContent = await asyncReadFile(routesPath);
    const routesMeta = yaml.safeLoad(routesContent.toString());
    const routes = [];
    for (let i = 0; i < routesMeta.length; i++) {
        const route = routesMeta[i].route;
        let template = `<${themeTagName}>`;
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
        template += `</${themeTagName}>`;
        routes.push({
            path: route.path,
            template: template
        });
    }
    return routes;
}

function evalVar(variable: string, site: SambalSiteMeta){
    return new Function("site", "return `${" + variable + "}`;").call(this, site);
}

function iterateMetas(site: SambalSiteMeta, componentFolder: string, themeFolder: string, propertiesMap: Map<string, any>) {
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
                    value: ''
                };
                if (typeof(prop.value) === 'string' && prop.value.indexOf('site.') === 0) {
                    property.value = getPropertyValue(prop.type, evalVar(prop.value, site));
                } else {
                    property.value = getPropertyValue(prop.type, prop.value);
                }
                properties.push(property);
            }
        }
        if (propertiesMap.has(tagName)) {
            throw new Error(`Duplicate tagName ${tagName}`);
        }
        propertiesMap.set(tagName, properties);
    });
}

function iterateStyleSheets(site: SambalSiteMeta, componentFolder: string, themeFolder: string, styleSheetMap: Map<string, any>) {
    const theme = site.theme;
    return gulpSrc([`${componentFolder}/**/*.less`, `${themeFolder}/${theme}/**/*.less`], async (file) => {
        const tagName = path.basename(file.basename, '.less');
        const output = await less.render(file.contents.toString());
        if (styleSheetMap.has(tagName)) {
            throw new Error(`Duplicate tagName ${tagName}`);
        }
        styleSheetMap.set(tagName, output.css);
    });
}

function transformTemplate(
    file: any, 
    targetFolder: string, 
    propertiesMap: Map<string, any>, 
    styleSheetMap: Map<string, any>,
    componentMap: Map<string, any>) {
    const tagName = path.basename(file.basename, file.extname);
    const relativePath = path.relative(file.base, file.dirname);
    const componentName = getComponentNameFromTagName(tagName);

    let html = file.contents.toString();
    if (file.extname === '.md') {
        html = marked(file.contents.toString());
    }

    const properties = propertiesMap.has(tagName) ? propertiesMap.get(tagName) : [];
    const styleSheet = styleSheetMap.has(tagName) ? `<style>${styleSheetMap.get(tagName)}</style>` : "";
    const template = styleSheet + html;
    const component = COMPONENT_TEMPLATE({
        tagName: tagName,
        componentName: componentName,
        properties: properties,
        attributes: properties.filter((p) => p.attribute === true),
        template: template
    });
    file.contents = new Buffer(component);

    if (componentMap.has(tagName)) {
        throw new Error(`Duplicate tagName ${tagName}`);
    }
    const componentPath = (relativePath !== '') ? `./${targetFolder}/${relativePath}` : `./${targetFolder}`;
    componentMap.set(tagName, componentPath);
}

function generateTemplates(
    glob: string | string[], 
    targetFolder: string, 
    outputFolder: string, 
    propertiesMap: Map<string, any>, 
    styleSheetMap: Map<string, any>,
    componentMap: Map<string, any>) {
    return gulpSrc(glob, (file) => {
        transformTemplate(file, targetFolder, propertiesMap, styleSheetMap, componentMap);
    })
    .pipe(gulpRename(".js"))
    .pipe(gulpDest(outputFolder));
}

function generateApp(routes: any[], jsFolder: string, componentMap: Map<string, any>) {
    const components = [];
    for (const tagName of componentMap.keys()) {
        const componentPath = componentMap.get(tagName);
        components.push({
            path: `${componentPath}/${tagName}.js`
        })
    }
    const app = APP_TEMPLATE({
        components: components,
        routes: routes
    });
    return asyncWriteFile(`${jsFolder}/app.js`, app);
}

