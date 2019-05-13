import path from 'path';
import marked from "marked";
import fs from "fs";
import prettier from 'prettier';
import _ from "lodash";
import {getTemplateVariables, parseComponentJs} from './ast';
import {getComponentNameFromTagName, asyncReadFile} from './utils';
import {COMPONENT_CONFIG, FUNCTION_ON_STATE_CHANGED, FUNCTION_INIT_COMPONENT, FUNCTION_SHOULD_UPDATE, FUNCTION_FIRST_UPDATED, FUNCTION_UPDATED} from './constants';

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
        let template = SIMPLE_COMPONENT_TEMPLATE;
        let componentConfig = null;
        if (componentJs) {
            componentConfig = componentJs[COMPONENT_CONFIG];
            if (componentJs[FUNCTION_ON_STATE_CHANGED]) {
                template = REDUX_COMPONENT_TEMPLATE;
            }
        }

        // console.log(this.getImports(componentPath, componentJs, templateRefs));
        let component = '';
        component = template({
            imports: this.getImports(componentPath, componentJs, templateRefs),
            tagName: this.tagName,
            componentName: componentName,
            properties: componentConfig ? componentConfig.properties : [],
            sharedCss: componentConfig ? componentConfig.includeCss : [],
            isInitComponent: componentJs ? Boolean(componentJs[FUNCTION_INIT_COMPONENT]) : false,
            hasShouldUpdate: componentJs ? Boolean(componentJs[FUNCTION_SHOULD_UPDATE]) : false,
            hasFirstUpdated: componentJs ? Boolean(componentJs[FUNCTION_FIRST_UPDATED]) : false,
            hasUpdated: componentJs ? Boolean(componentJs[FUNCTION_UPDATED]) : false,
            css: componentCss,
            template: html
        });

        console.log(prettier.format(component, {parser: "babel"}));
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
            if (componentJs[COMPONENT_CONFIG]) {
                this.resolveSharedStyleSheetImports(componentPath, componentJs[COMPONENT_CONFIG], imports);
            }
        }
        this.resolveActionImports(componentPath, templateRefs, imports);
        return imports;
    }

    resolveActionImports(componentPath: string, templateRefs: string[], imports) {
        for (const actionFileName of this.actionMap.keys()) {
            const actionFile = this.actionMap.get(actionFileName);
            const actionExports = actionFile.exports.map((e) => e.name);
            const intersections = _.intersection(templateRefs, actionExports);
            const relativePath = this.getRelativePath(componentPath, actionFile.path);
            if (intersections.length > 0) {
                imports.push({
                    name: `{${intersections.join(', ')}}`,
                    path: relativePath
                });
            }
        }
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