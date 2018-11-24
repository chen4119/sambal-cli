import "@babel/polyfill";

const gulp = require('gulp');
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import through2 from 'through2';
import yaml from 'js-yaml';
import rename from 'gulp-rename';
import less from 'less';
import marked from 'marked';

import {COMPONENT, APP} from './templates';
import {
    getComponentNameFromTagName,
    getPropertyValue
} from './utils';

const componentMetaMap = new Map();
const COMPONENT_SOURCE = 'components';
const THEME_SOURCE = 'themes';
const SITE_META_PATH = 'sambal/site.yml';
const ROUTES_META_PATH = 'sambal/routes.yml';
const SRC_PATH = 'js';
const COMPONENT_OUTPUT = `${SRC_PATH}/components`;
const THEME_OUTPUT = `${SRC_PATH}/theme`;
const site = {};
const ROUTES = [];

const COMPONENT_TEMPLATE = _.template(COMPONENT);
const APP_TEMPLATE = _.template(APP);

gulp.on('error', (err) => {
    console.log('error');
    console.log(err);
});

const build = gulp.series(
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
    return gulp.src(SITE_META_PATH)
    .pipe(through2.obj(function(file, enc, cb) {
        if (file.isBuffer()) {
            const siteMeta = yaml.safeLoad(file.contents.toString());
            Object.assign(site, siteMeta);
        }
        cb(null, file);
    }))
}

function getRoutes() {
    const theme = site.theme;
    const themeTagName = `${theme}-theme`;
    return gulp.src(ROUTES_META_PATH)
    .pipe(through2.obj(function(file, enc, cb) {
        if (file.isBuffer()) {
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
        }
        cb(null, file);
    }))
}

function evalVar(variable){
    return new Function("site", "return `${" + variable + "}`;").call(this, site);
}

function iterateMetas() {
    const theme = site.theme;
    return gulp.src([`${COMPONENT_SOURCE}/**/*.yml`, `${THEME_SOURCE}/${theme}/**/*.yml`])
    .pipe(through2.obj(function(file, enc, cb) {
        if (file.isBuffer()) {
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
                        attribute: prop.attribute ? true : false
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
        }
        cb(null, file);
    }));
}

function iterateStyleSheets() {
    const theme = site.theme;
    return gulp.src([`${COMPONENT_SOURCE}/**/*.less`, `${THEME_SOURCE}/${theme}/**/*.less`])
    .pipe(through2.obj(async function(file, enc, cb) {
        if (file.isBuffer()) {
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
        }
        cb(null, file);
    }));
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
    return gulp.src([`${COMPONENT_SOURCE}/**/*.html`, `${COMPONENT_SOURCE}/**/*.md`])
    .pipe(through2.obj(function(file, enc, cb) {
        if (file.isBuffer()) {
            transformTemplate(file, 'components');
        }
        cb(null, file);
    }))
    .pipe(rename(function (path) {
        path.extname = ".js";
    }))
    .pipe(gulp.dest(COMPONENT_OUTPUT));
}

function iterateThemeTemplates() {
    const theme = site.theme;
    return gulp.src(`${THEME_SOURCE}/${theme}/**/*.html`)
    .pipe(through2.obj(function(file, enc, cb) {
        if (file.isBuffer()) {
            transformTemplate(file, 'theme');
        }
        cb(null, file);
    }))
    .pipe(rename(function (path) {
        path.extname = ".js";
    }))
    .pipe(gulp.dest(THEME_OUTPUT));
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
    fs.writeFile(`${SRC_PATH}/app.js`, app, 'utf8', function(err, data) {
        cb();
    });
}

