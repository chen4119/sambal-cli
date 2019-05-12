import path from 'path';

import matter from 'gray-matter';
import marked from "marked";
import fs from "fs";
import * as ts from "typescript";
import _ from "lodash";
import {getTemplateVariables, parseComponentJs} from './ast';
import {getComponentNameFromTagName, asyncReadFile} from './utils';
import {COMPONENT_CONFIG} from './constants';

_.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
import {SIMPLE_COMPONENT, REDUX_COMPONENT} from './templates';
const SIMPLE_COMPONENT_TEMPLATE = _.template(SIMPLE_COMPONENT);
const REDUX_COMPONENT_TEMPLATE = _.template(REDUX_COMPONENT);

export default class ComponentGenerator {
    file: any;
    tagName: string;
    sharedStyleSheetMap: Map<string, any>;
    actionMap: Map<string, any>;
    reducerMap: Map<string, any>;
    constructor(file: any, sharedStyleSheetMap, actionMap, reducerMap) {
        this.file = file;
        this.sharedStyleSheetMap = sharedStyleSheetMap;
        this.actionMap = actionMap;
        this.reducerMap = reducerMap;
        this.tagName = path.basename(file.basename, file.extname);
    }

    async generate() {
        // const tagName = path.basename(this.file.basename, this.file.extname);
        const results = await Promise.all<string, any>([
            this.getComponentCss(),
            this.getComponentJs()
        ]);
        const componentCss = results[0];
        const componentJs = results[1];
        const relativePath = path.relative(this.file.base, this.file.dirname);
        const componentName = getComponentNameFromTagName(this.tagName);
        const componentPath = (relativePath !== '') ? `./components/${relativePath}` : `./components`;

        let html = this.file.contents.toString();
        if (this.file.extname === '.md') {
            html = marked(html);
        }

        const templateRefs = getTemplateVariables(html);
        const componentConfig = componentJs ? componentJs.componentConfig : null;
        // console.log(this.getImports(componentPath, componentJs, templateRefs));
        let component = '';
        component = SIMPLE_COMPONENT_TEMPLATE({
            imports: this.getImports(componentPath, componentJs, templateRefs),
            tagName: this.tagName,
            componentName: componentName,
            properties: componentConfig ? componentConfig.properties : [],
            sharedCss: componentConfig ? componentConfig.includeCss : [],
            css: componentCss,
            template: html
        });

        console.log(component);
        /*
        const styleSheet = this.css ? `<style>${this.css}</style>` : "";
        const template = styleSheet + html;
        let component = '';
        component = SIMPLE_COMPONENT_TEMPLATE({
            tagName: tagName,
            includeStyleSheets: this.parseIncludeStyleSheets(frontMatter.data, componentPath),
            componentName: componentName,
            properties: properties,
            attributes: attributes,
            reducers: [],
            actionsAndSelectors: [],
            template: template
        });
        this.parseAst(componentName, html);*/
    }

    async getComponentCss() {
        const cssFile = `${this.file.dirname}/${this.tagName}.css`;
        if (fs.existsSync(cssFile)) {
            return await asyncReadFile(cssFile);
        }
        return null;
    }

    async getComponentJs() {
        const jsFile = `${this.file.dirname}/${this.tagName}.js`;
        if (fs.existsSync(jsFile)) {
            const content = await asyncReadFile(jsFile);
            return parseComponentJs(content);
        }
        return null;
    }

    getImports(componentPath: string, componentJs: any, templateRefs: string[]) {
        const imports = [];
        if (componentJs) {
            const exports = Object.keys(componentJs);
            if (exports.length > 0) {
                imports.push({
                    name: `{${exports.join(', ')}}`,
                    path: `./${this.tagName}.js`
                });
            }
            if (componentJs.componentConfig) {
                this.resolveSharedStyleSheetImports(componentPath, componentJs.componentConfig, imports);
            }
        }

        return imports;
    }

    resolveSharedStyleSheetImports(componentPath: string, componentConfig, imports) {
        if (componentConfig.includeCss.length > 0) {
            for (const sharedCssName of componentConfig.includeCss) {
                if (this.sharedStyleSheetMap.has(sharedCssName)) {
                    const sharedCssPath = this.sharedStyleSheetMap.get(sharedCssName);
                    const relativePath = this.getRelativePath(componentPath, `./css/${sharedCssPath}`);
                    imports.push({
                        name: `{${sharedCssName}}`,
                        path: relativePath
                    });
                } else {
                    throw new Error(`Shared style sheet "${sharedCssName}" not found`);
                }
            }
        }
    }

    /*
    parseProperties(prop) {
        const properties = [];
        for (let i = 0; i < prop.properties.length; i++) {
            const propName = prop.properties[i].name;
            properties[propName] = this.getPropertyType(propName, prop.properties[i].initializer);
        }
        return properties;
    }

    getPropertyType(propName:string, initializer) {
        if (initializer.type === TYPE_OBJECT_LITERAL) {
            if (initializer.properties.length > 0 && initializer.properties[0].name === 'type') {
                const propType = initializer.properties[0].initializer.name;
                switch (propType) {
                    case 'String':
                        return {type: String};
                    case 'Object':
                        return {type: Object};
                    default:
                        throw new Error(`Unrecognized property type "${propType}"`);
                }
            }
            throw new Error(`Unable to find type for property "${propName}"`);
        }
        throw new Error('Expecting an object for properties');
    }*/

    getRelativePath(relativeFrom: string, relativeTo: string) {
        let relativePath = path.relative(relativeFrom, relativeTo);
        // path needs to begin with ./
        if (relativePath.indexOf('.') !== 0) {
            relativePath = `./${relativePath}`;
        }
        return relativePath;
    }
}