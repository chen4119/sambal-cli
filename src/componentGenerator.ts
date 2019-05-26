import path from 'path';
import marked from "marked";
import fs from "fs";
import prettier from 'prettier';
import _ from "lodash";
import {getTemplateVariables} from './ast';
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
    componentExports: any;
    constructor(file: any, componentExports, sharedStyleSheetMap, actionMap, reducerMap) {
        this.file = file;
        this.componentExports = componentExports;
        this.sharedStyleSheetMap = sharedStyleSheetMap;
        this.actionMap = actionMap;
        this.reducerMap = reducerMap;
        this.tagName = path.basename(file.basename, file.extname);
    }

    async generate() {
        const componentCss = await this.getComponentCss();
        const relativePath = path.relative(this.file.base, this.file.dirname);
        const componentName = getComponentNameFromTagName(this.tagName);
        const componentPath = (relativePath !== '') ? `./components/${relativePath}` : `./components`;

        let html = this.file.contents.toString();
        if (this.file.extname === '.md') {
            html = marked(html);
        }

        const templateRefs = getTemplateVariables(html);
        let template = SIMPLE_COMPONENT_TEMPLATE;
        let isReduxComponent = false;
        let componentConfig = null;
        if (this.componentExports) {
            componentConfig = this.componentExports[COMPONENT_CONFIG];
            if (this.componentExports[FUNCTION_ON_STATE_CHANGED]) {
                template = REDUX_COMPONENT_TEMPLATE;
                isReduxComponent = true;
            }
        }

        let component = '';
        component = template({
            imports: this.getImports(componentPath, templateRefs, isReduxComponent),
            tagName: this.tagName,
            componentName: componentName,
            properties: this.getPropertyList(
                componentConfig ? componentConfig.properties : [], 
                this.componentExports ? this.componentExports[FUNCTION_INIT_COMPONENT] : []),
            sharedCss: componentConfig ? componentConfig.includeCss : [],
            isInitComponent: this.componentExports ? Boolean(this.componentExports[FUNCTION_INIT_COMPONENT]) : false,
            hasShouldUpdate: this.componentExports ? Boolean(this.componentExports[FUNCTION_SHOULD_UPDATE]) : false,
            hasFirstUpdated: this.componentExports ? Boolean(this.componentExports[FUNCTION_FIRST_UPDATED]) : false,
            hasUpdated: this.componentExports ? Boolean(this.componentExports[FUNCTION_UPDATED]) : false,
            componentCss: componentCss,
            includeCss: componentConfig ? componentConfig.includeCss : [],
            template: html
        });

        return prettier.format(component, {parser: "babel"});
    }

    async getComponentCss() {
        const cssFile = `${this.file.dirname}/${this.tagName}.css`;
        if (fs.existsSync(cssFile)) {
            return await asyncReadFile(cssFile);
        }
        return null;
    }

    getPropertyList(componentProperties, initProperties) {
        const uniqueProperties = new Set();
        if (componentProperties) {
            for (let i = 0; i < componentProperties.length; i++) {
                uniqueProperties.add(componentProperties[i]);
            }
        }
        if (initProperties) {
            for (let i = 0; i < initProperties.length; i++) {
                uniqueProperties.add(initProperties[i]);
            }
        }
        return [...uniqueProperties.values()];
    }

    getImports(componentPath: string, templateRefs: string[], isReduxComponent: boolean) {
        const imports = [];
        if (isReduxComponent) {
            const relativePath = this.getRelativePath(componentPath, './store.js');
            imports.push({
                name: `store`,
                path: relativePath
            });
        }
        if (this.componentExports) {
            const exports = Object.keys(this.componentExports);
            if (exports.length > 0) {
                imports.push({
                    name: `{${exports.join(', ')}}`,
                    path: `./${this.tagName}.export.js`
                });
            }
            if (this.componentExports[COMPONENT_CONFIG]) {
                this.resolveSharedStyleSheetImports(componentPath, this.componentExports[COMPONENT_CONFIG], imports);
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