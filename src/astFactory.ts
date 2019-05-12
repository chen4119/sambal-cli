import ts = require("typescript");

export function makeImportsStatement(moduleName: string, imports) {
    const elements = [];
    for (let i = 0; i < imports.length; i++) {
        elements.push(ts.createImportSpecifier(undefined, makeIdentifier(imports[i])));
    }
    const importClause = ts.createImportClause(
        undefined,
        ts.createNamedImports(elements)
    );
    return ts.createImportDeclaration(
        undefined,
        undefined,
        importClause,
        makeStringLiteral(moduleName)
    );
}

export function makeDefaultImportStatement(moduleName: string, defaultImport: string) {
    return ts.createImportDeclaration(
        undefined,
        undefined,
        ts.createImportClause(makeIdentifier(defaultImport), undefined),
        makeStringLiteral(moduleName)
    );
}

export function makeModifier(keyword) {
    return ts.createModifier(keyword);
}
export function makeStringLiteral(text: string) {
    return ts.createStringLiteral(text);
}

export function makeIdentifier(text: string) {
    return ts.createIdentifier(text);
}

export function makeFunction(name, modifiers, params, statements) {
    return ts.createFunctionDeclaration(
        /*decorators*/ undefined,
        modifiers,
        /*asteriskToken*/ undefined,
        makeIdentifier(name),
        /*typeParameters*/ undefined,
        params,
        /*returnType*/ undefined,
        ts.createBlock(statements, /*multiline*/ true)
      );
}

export function makeGetAccessor(name, modifiers, returnExpression) {
    return ts.createGetAccessor(
        undefined,
        modifiers,
        makeIdentifier(name),
        undefined,
        undefined,
        ts.createBlock([ts.createReturn(returnExpression)], /*multiline*/ true)
    );
}

export function makeClassConstructor(params, statements) {
    return ts.createConstructor(
        undefined,
        undefined,
        params,
        ts.createBlock(statements, /*multiline*/ true)
    )
}

export function makeClassHeritageClause(token, expressions) {
    return ts.createHeritageClause(
        token, 
        expressions.map((exp) => ts.createExpressionWithTypeArguments(undefined, exp))
    );
}

export function makeClassDeclaration(name, heritages, members) {
    return ts.createClassDeclaration(
        undefined,
        undefined,
        name,
        undefined,
        heritages,
        members
    );
}

export function makeParameters(params) {
    const parameters = [];
    for (let i = 0; i < params.length; i++) {
        parameters.push(ts.createParameter(
            undefined,
            undefined,
            undefined,
            makeIdentifier(params[i])
        ));
    }
    return parameters;
}

export function makeObjectLiteral(properties) {
    const propAssignments = properties.map((prop) => ts.createPropertyAssignment(
        makeIdentifier(prop.name),
        prop.initializer
    ));
    return ts.createObjectLiteral(propAssignments, true);
}

export function makeCallFunction(expression, args) {
    return ts.createCall(
        expression,
        undefined,
        args
    );
}

export function makePropertyAccess(expression, propName) {
    return ts.createPropertyAccess(
        expression,
        makeIdentifier(propName)
    );
}
