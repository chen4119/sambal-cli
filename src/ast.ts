import { readFileSync } from "fs";
import * as ts from "typescript";
import _ from "lodash";
import {COMPONENT_CONFIG, FUNCTION_ON_STATE_CHANGED, FUNCTION_INIT_COMPONENT} from './constants';
const TYPE_IDENTIFIER = "identifier";
const TYPE_FUNCTION = "function";
const TYPE_VARIABLE = "variable";
const TYPE_DEFAULT_EXPORT = "defaultExport";
const TYPE_OBJECT_LITERAL = "objectLiteral";
const TYPE_ARRAY_LITERAL = "arrayLiteral";
const TYPE_STRING_LITERAL = "stringLiteral";

const ACTION_CALL_FUNCTION = "callFunction";
const ACTION_PROPERTY_ACCESS = "accessProperty";
const ACTION_PROPERTY_ASSIGNMENT = "assignProperty";

/*
export {
    TYPE_IDENTIFIER,
    TYPE_FUNCTION,
    TYPE_VARIABLE,
    TYPE_DEFAULT_EXPORT,
    TYPE_OBJECT_LITERAL,
    TYPE_ARRAY_LITERAL,
    TYPE_STRING_LITERAL,
    ACTION_CALL_FUNCTION,
    ACTION_PROPERTY_ACCESS,
    ACTION_PROPERTY_ASSIGNMENT
};*/

export function getExportVariables(fileContent: string) {
    const ast = ts.createSourceFile(
        'fileId',
        fileContent,
        ts.ScriptTarget.Latest,
        /*setParentNodes */ false
    );
    const exports = [];
    for (let i = 0; i < ast.statements.length; i++) {
        const result = parseNode(ast.statements[i]);
        // console.log(result);
        findAllExportedVariables(result, exports);
    }
    /*
    const defaultExport = exports.find((e) => e.isDefault); // should only have one
    const nonDefaultExports = exports.filter((e) => !e.isDefault);
    return `${defaultExport ? defaultExport : ''}${nonDefaultExports.length > 0 ? `, ${nonDefaultExports.join(', ')}` : ''}`;
    */
   return exports;
}

function findAllExportedVariables(result, exports) {
    if (!result) {
        return;
    } else if (result.isExported) {
        if (result.variables) {
            for (const variable of result.variables) {
                exports.push(variable);
            }
        } else {
            exports.push(result);
        }
    }
}

export function parseComponentJs(fileContent: string) {
    const ast = ts.createSourceFile(
        'fileId',
        fileContent,
        ts.ScriptTarget.Latest,
        /*setParentNodes */ false
    );
    const exports = {};
    for (let i = 0; i < ast.statements.length; i++) {
        const node: ts.Node = ast.statements[i];
        if (isExported(node) && node.kind === ts.SyntaxKind.FunctionDeclaration) {
            const funcName = parseNode((node as ts.FunctionDeclaration).name).name;
            parseComponentJsExport(funcName, node, exports);
        } else if (isExported(node) && node.kind === ts.SyntaxKind.VariableStatement) {
            for (const variable of (node as ts.VariableStatement).declarationList.declarations) {
                const varName = parseNode(variable.name).name;
                parseComponentJsExport(varName, variable.initializer, exports);
            }
        }
    }
    console.log(exports);
    return exports;
}

function parseComponentJsExport(exportName: string, node: ts.Node, exports: any) {
    switch (exportName) {
        case FUNCTION_ON_STATE_CHANGED:
            exports[FUNCTION_ON_STATE_CHANGED] = getAllStateAccessor(node);
            break;
        case FUNCTION_INIT_COMPONENT:
            exports[FUNCTION_INIT_COMPONENT] = getAllComponentProperties(node);
            break;
        case COMPONENT_CONFIG:
            exports[COMPONENT_CONFIG] = parseComponentConfig(node);
        default:
            break;
    }
}

function getAllComponentProperties(node: ts.Node) {
    const propSet = new Set();
    recursivelyVisitChild(node, (child: ts.Node) => {
        if (child.kind === ts.SyntaxKind.BinaryExpression) {
            const binaryStmt = parseNode(child);
            if (binaryStmt.left.type === ACTION_PROPERTY_ACCESS && binaryStmt.left.expression.name === 'component') {
                propSet.add(binaryStmt.left.name);
            }
        }
        return false;
    });
    return [...propSet.values()];
}

function getAllStateAccessor(node: ts.Node) {
    const stateAccessSet = new Set();
    recursivelyVisitChild(node, (child: ts.Node) => {
        if (child.kind === ts.SyntaxKind.PropertyAccessExpression) {
            const access = parseNode(child);
            if (access.expression.name === 'state') {
                stateAccessSet.add(`state.${access.name}`);
            }
        }
        return false;
    });
    return [...stateAccessSet.values()];
}

function parseComponentConfig(node: ts.Node) {
    const config = {
        includeCss: [],
        properties: []
    };
    if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        const objectLiteral = parseNode(node);
        for (let i = 0; i < objectLiteral.properties.length; i++) {
            const prop = objectLiteral.properties[i];
            if (prop.name === 'includeCss' && prop.initializer.type === TYPE_ARRAY_LITERAL) {
                config.includeCss = prop.initializer.elements.map((e) => e.name);
            } else if (prop.name === 'properties' && prop.initializer.type === TYPE_OBJECT_LITERAL) {
                config.properties = prop.initializer.properties.map((p) => p.name);
            }
        }

    }
    return config;
}

export function getTemplateVariables(html: string) {
    const ast = ts.createSourceFile(
        'fileId',
        "`" + html + "`",
        ts.ScriptTarget.Latest,
        /*setParentNodes */ false
    );
    const refSet = new Set();
    const localVarSet = new Set();
    const propNameSet = new Set();
    for (let i = 0; i < ast.statements.length; i++) {
        recursivelyVisitChild(ast.statements[i], (node: ts.Node) => {
            switch (node.kind) {
                case ts.SyntaxKind.Identifier:
                    refSet.add(parseNode(node).name);
                    break;
                case ts.SyntaxKind.PropertyAccessExpression:
                    propNameSet.add(parseNode(node).name);
                    break;
                case ts.SyntaxKind.ArrowFunction:
                case ts.SyntaxKind.FunctionExpression:
                    const fnNode = parseNode(node);
                    for (const param of fnNode.parameters) {
                        localVarSet.add(param);
                    }
                    break;
            }
            return false;
        });
    }
    const templateReferences = [];
    for (const variable of refSet.values()) {
        if (!localVarSet.has(variable) && !propNameSet.has(variable)) {
            templateReferences.push(variable);
        }
    }
    return templateReferences;
}

/*
function findAllPropertyAccess(result, propSet) {
    if (!result) {
        return;
    } else if (Array.isArray(result)) {
        result.forEach((r) => findAllPropertyAccess(r, propSet));
    } else if (result.type === TYPE_IDENTIFIER) {
        propSet.add(result.name);
    } else if (result.type === ACTION_CALL_FUNCTION) {
        findAllPropertyAccess(result.expression, propSet);
        result.args.forEach((arg) => findAllPropertyAccess(arg, propSet));
    } else if (result.type === ACTION_PROPERTY_ACCESS) {
        findAllPropertyAccess(result.expression, propSet);
    }
}*/

function recursivelyVisitChild(node: ts.Node, visit: Function) {
    ts.forEachChild(node, (child: ts.Node) => {
        const isDone = visit(child);
        if (!isDone) {
            return recursivelyVisitChild(child, visit);
        }
        return isDone;
    });
}

/*
function parseSourceFile(root: ts.SourceFile) {
    for (let i = 0; i < root.statements.length; i++) {
        const result = parseNode(root.statements[i]);
        console.log(result);
    }
}*/

function parseNode(node: ts.Node) {
    switch (node.kind) {
        case ts.SyntaxKind.ExportAssignment:
            return {type: TYPE_DEFAULT_EXPORT, isExported: true, expression: parseNode((node as ts.ExportAssignment).expression)};
        case ts.SyntaxKind.VariableStatement:
            return parseVariableStatement(node as ts.VariableStatement);
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
            return parseFunction(node as any);
        case ts.SyntaxKind.Identifier:
            return parseIdentifier(node as ts.Identifier);
        case ts.SyntaxKind.StringLiteral:
            return {type: TYPE_STRING_LITERAL, name: (node as ts.StringLiteral).text};
        case ts.SyntaxKind.ExpressionStatement:
            return parseNode((node as ts.ExpressionStatement).expression);
        case ts.SyntaxKind.TemplateExpression:
            return parseTemplate(node as ts.TemplateExpression);
        case ts.SyntaxKind.PropertyAccessExpression:
            return parsePropertyAccessExpression(node as ts.PropertyAccessExpression);
        case ts.SyntaxKind.CallExpression:
            return parseCallExpression(node as ts.CallExpression);
        case ts.SyntaxKind.TaggedTemplateExpression:
            return parseNode((node as ts.TaggedTemplateExpression).template);
        case ts.SyntaxKind.ObjectLiteralExpression:
            return parseObjectLiteral(node as ts.ObjectLiteralExpression);
        case ts.SyntaxKind.ArrayLiteralExpression:
            return parseArrayLiteral(node as ts.ArrayLiteralExpression);
        case ts.SyntaxKind.PropertyAssignment:
            return parsePropertyAssignment(node as ts.PropertyAssignment);
        case ts.SyntaxKind.BinaryExpression:
            return parseBinaryExpression(node as ts.BinaryExpression);
        default:
            console.log('unknown kind ' + node.kind);
            return null;
    }
}

function parsePropertyAssignment(node: ts.PropertyAssignment) {
    return {
        type: ACTION_PROPERTY_ASSIGNMENT,
        name : parseNode(node.name).name,
        initializer: parseNode(node.initializer)
    };
}

function parseObjectLiteral(node: ts.ObjectLiteralExpression) {
    return {
        type: TYPE_OBJECT_LITERAL,
        properties: node.properties.map((prop) => parseNode(prop))
    };
}

function parseArrayLiteral(node: ts.ArrayLiteralExpression) {
    return {
        type: TYPE_ARRAY_LITERAL,
        elements: node.elements.map((elem) => parseNode(elem))
    };
}

function parsePropertyAccessExpression(node: ts.PropertyAccessExpression) {
    return {
        type: ACTION_PROPERTY_ACCESS,
        expression: parseNode(node.expression),
        name: parseNode(node.name).name
    };
}

function parseCallExpression(node: ts.CallExpression) {
    return {
        type: ACTION_CALL_FUNCTION,
        expression: parseNode(node.expression),
        args: node.arguments.map((arg) => parseNode(arg))
    };
}

function parseFunction(node: ts.FunctionExpression | ts.ArrowFunction | ts.FunctionDeclaration) {
    /*
    ts.forEachChild(node.body, (node: ts.Node) => {
        console.log('visiting');
        console.log(node.kind);
    });*/
    return {
        type: TYPE_FUNCTION,
        isExported: isExported(node),
        parameters: node.parameters.map((param) => parseNode(param.name).name),
        name: node.name ? parseNode(node.name).name : null
    };
}

function parseTemplate(node: ts.TemplateExpression) {
    let templateVariables = [];
    for (let i = 0; i < node.templateSpans.length; i++) {
        const expr = parseNode(node.templateSpans[i].expression);
        if (expr) {
            if (Array.isArray(expr)) {
                templateVariables = templateVariables.concat(expr);
            } else {
                templateVariables.push(expr);
            }
        }
    }
    return templateVariables;
}

function parseVariableStatement(node: ts.VariableStatement) {
    /*
    const variables = [];
    const isExport = isExported(node);
    for (let i = 0; i < node.declarationList.declarations.length; i ++) {
        const declaration = parseNode(node.declarationList.declarations[i]);
        declaration.isExported = isExport;
        variables.push(declaration);
    }*/
    return {
        isExported: isExported(node),
        variables: node.declarationList.declarations.map((v: ts.VariableDeclaration) => ({
            type: TYPE_VARIABLE,
            name: parseNode(v.name).name,
            initializer: parseNode(v.initializer)
        }))
    };
}

function parseBinaryExpression(node: ts.BinaryExpression) {
    return {
        left: parseNode(node.left),
        operator: node.operatorToken,
        right: parseNode(node.right)
    }
}

function parseIdentifier(node: ts.Identifier) {
    return {
        type: TYPE_IDENTIFIER,
        name: node.escapedText
    };
}

function isExported(node: ts.Node) {
    if (node.modifiers) {
        for (let i = 0; i < node.modifiers.length; i++) {
            if (node.modifiers[i].kind === ts.SyntaxKind.ExportKeyword) {
                return true;
            }
        }
    }
    return false;
}

/*
const sourceFile = ts.createSourceFile(
    './actions/app.js',
    readFileSync('./actions/app.js').toString(),
    ts.ScriptTarget.Latest,
    true
);

// console.log(ts.SyntaxKind.SourceFile);
parseSourceFile(sourceFile);
// console.log(sourceFile);
*/