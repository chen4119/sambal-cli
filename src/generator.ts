import path from 'path';
import _ from "lodash";
import yaml from "js-yaml";
import less from "less";
import marked from "marked";

import {gulpSeries, gulpSrc, gulpRename, gulpDest} from './gulp';
import {COMPONENT, APP} from './templates';
import {
    getComponentNameFromTagName,
    getPropertyValue,
    asyncWriteFile
} from './utils';

const componentMetaMap = new Map<string, any>();
const COMPONENT_SOURCE: string = 'components';
const THEME_SOURCE: string = 'themes';
const SITE_META_PATH: string = 'sambal/site.yml';
const ROUTES_META_PATH: string = 'sambal/routes.yml';
const SRC_PATH: string = 'js';
const COMPONENT_OUTPUT: string = `${SRC_PATH}/components`;
const THEME_OUTPUT: string = `${SRC_PATH}/theme`;
const site: any = {};
const ROUTES: any[] = [];

const COMPONENT_TEMPLATE = _.template(COMPONENT);
const APP_TEMPLATE = _.template(APP);

const build = gulpSeries(
    getSiteMeta,
    getRoutes,
    iterateMetas,
    iterateStyleSheets,
    iterateComponentTemplates,
    iterateThemeTemplates,
    generateApp
);

export function generate() {
    build(() => {

    });
}

function getSiteMeta() {
    return gulpSrc(SITE_META_PATH, (file) => {
        const siteMeta = yaml.safeLoad(file.contents.toString());
        Object.assign(site, siteMeta);
    });
}

function getRoutes() {
    const theme = site.theme;
    const themeTagName = `${theme}-theme`;
    return gulpSrc(ROUTES_META_PATH, (file) => {
        const routesMeta = yaml.safeLoad(file.contents.toString());
        for (let i = 0; i < routesMeta.length; i++) {
            const route = routesMeta[i].route;
            let template = `<${themeTagName}>`;
            console.log(route);
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
            ROUTES.push({
                path: route.path,
                template: template
            });
        }
    });
}

function evalVar(variable){
    return new Function("site", "return `${" + variable + "}`;").call(this, site);
}

function iterateMetas() {
    const theme = site.theme;
    return gulpSrc([`${COMPONENT_SOURCE}/**/*.yml`, `${THEME_SOURCE}/${theme}/**/*.yml`], (file) => {
        const tagName = path.basename(file.basename, '.yml');
        console.log(tagName);
        const componentMeta = yaml.safeLoad(file.contents.toString());
        console.log(componentMeta);
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
                    property.value = getPropertyValue(prop.type, evalVar(prop.value));
                } else {
                    property.value = getPropertyValue(prop.type, prop.value);
                }
                properties.push(property);
            }
        }
        if (componentMetaMap.has(tagName)) {
            const meta = componentMetaMap.get(tagName);
            meta.properties = properties;
        } else {
            componentMetaMap.set(tagName, {
                properties: properties
            });
        }
    });
}

function iterateStyleSheets() {
    const theme = site.theme;
    return gulpSrc([`${COMPONENT_SOURCE}/**/*.less`, `${THEME_SOURCE}/${theme}/**/*.less`], async (file) => {
        const tagName = path.basename(file.basename, '.less');
        const output = await less.render(file.contents.toString());
        if (componentMetaMap.has(tagName)) {
            const meta = componentMetaMap.get(tagName);
            meta.styleSheet = output.css;
        } else {
            componentMetaMap.set(tagName, {
                styleSheet: output.css
            });
        }
    });
}

function transformTemplate(file, sourceFolder) {
    const tagName = path.basename(file.basename, file.extname);
    const relativePath = path.relative(file.base, file.dirname);
    const componentName = getComponentNameFromTagName(tagName);
    let componentMeta = null;
    if (componentMetaMap.has(tagName)) {
        componentMeta = componentMetaMap.get(tagName);
    } else {
        componentMeta = {};
        componentMetaMap.set(tagName, componentMeta);
    }
    componentMeta.path = (relativePath !== '') ? `./${sourceFolder}/${relativePath}` : `./${sourceFolder}`;
    componentMeta.componentName = componentName;
    let html = file.contents.toString();
    if (file.extname === '.md') {
        html = marked(file.contents.toString());
    }
    const properties = componentMeta.properties ? componentMeta.properties : [];
    const styleSheet = componentMeta.styleSheet ? `<style>${componentMeta.styleSheet}</style>` : '';
    const template = styleSheet + html;
    const component = COMPONENT_TEMPLATE({
        tagName: tagName,
        componentName: componentName,
        properties: properties,
        attributes: properties.filter((p) => p.attribute === true),
        template: template
    });
    file.contents = new Buffer(component);
}

function iterateComponentTemplates() {
    return gulpSrc([`${COMPONENT_SOURCE}/**/*.html`, `${COMPONENT_SOURCE}/**/*.md`], (file) => {
        transformTemplate(file, 'components');
    })
    .pipe(gulpRename(".js"))
    .pipe(gulpDest(COMPONENT_OUTPUT));
}

function iterateThemeTemplates() {
    const theme = site.theme;
    return gulpSrc(`${THEME_SOURCE}/${theme}/**/*.html`, (file) => {
        transformTemplate(file, 'theme');
    })
    .pipe(gulpRename(".js"))
    .pipe(gulpDest(THEME_OUTPUT));
}

function generateApp(cb) {
    const components = [];
    for (const tagName of componentMetaMap.keys()) {
        const meta = componentMetaMap.get(tagName);
        components.push({
            path: `${meta.path}/${tagName}.js`
        })
    }
    const app = APP_TEMPLATE({
        components: components,
        routes: ROUTES
    });
    return asyncWriteFile(`${SRC_PATH}/app.js`, app);
}

