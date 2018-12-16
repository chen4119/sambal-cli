const COMPONENT_IMPORTS = `
import {LitElement, html} from '@polymer/lit-element';
`;

const COMPONENT_IMPORT_STYLE_SHEETS = `
<% _.forEach(includeStyleSheets, function(styleSheet) { %>
    import {<%=styleSheet.name%>} from '<%=styleSheet.path%>';
    <% }); %>
`;

const COMPONENT_CONSTRUCTOR = `
constructor() {
    super();
    <% _.forEach(properties, function(prop) { %>
    this.<%-prop.name%> = <%=prop.value%>;
    <% }); %>
}
`;

const COMPONENT_PROPERTIES = `
static get properties() {
    return {
        <% _.forEach(attributes, function(attr) { %>
        <%-attr.name%>: {type: <%=attr.type%>},
        <% }); %>
    }
}
`;

const COMPONENT_RENDER = `
render() {
    <% _.forEach(properties, function(prop) { %>
    const <%-prop.name%> = this.<%=prop.name%>;
    <% }); %>
    return html\`
    <% _.forEach(includeStyleSheets, function(styleSheet) { %>
    \${<%=styleSheet.name%>}
    <% }); %>
    <%=template%>
    \`;
}
`;

const COMPONENT_CUSTOM_ELEMENTS = `
customElements.define('<%=tagName%>', <%=componentName%>);
`;

export const SIMPLE_COMPONENT: string = `
${COMPONENT_IMPORTS}
${COMPONENT_IMPORT_STYLE_SHEETS}

export default class <%=componentName%> extends LitElement {
    ${COMPONENT_CONSTRUCTOR}
    ${COMPONENT_PROPERTIES}
    ${COMPONENT_RENDER}
}
${COMPONENT_CUSTOM_ELEMENTS}
`;

export const REDUX_COMPONENT: string = `
${COMPONENT_IMPORTS}
import {connect} from 'pwa-helpers/connect-mixin.js';
import {store} from 'sambal';
${COMPONENT_IMPORT_STYLE_SHEETS}

export default class <%=componentName%> extends connect(store)(LitElement) {
    ${COMPONENT_CONSTRUCTOR}
    ${COMPONENT_PROPERTIES}
    stateChanged(state) {
        <% _.forEach(stateProps, function(prop) { %>
        this.<%-prop.name%> = state.<%=prop.state%>;
        <% }); %>
    }
    ${COMPONENT_RENDER}
}
${COMPONENT_CUSTOM_ELEMENTS}
`;


/*
export const COMPONENT: string = `
import {LitElement, html} from '@polymer/lit-element';

<% _.forEach(includeStyleSheets, function(styleSheet) { %>
import {<%=styleSheet.name%>} from '<%=styleSheet.path%>';
<% }); %>

export default class <%=componentName%> extends LitElement {

    constructor() {
        super();
        <% _.forEach(properties, function(prop) { %>
        this.<%-prop.name%> = <%=prop.value%>;
        <% }); %>
    }

    static get properties() {
        return {
            <% _.forEach(attributes, function(attr) { %>
            <%-attr.name%>: {type: <%=attr.type%>},
            <% }); %>
        }
    }

    render() {
        <% _.forEach(properties, function(prop) { %>
        const <%-prop.name%> = this.<%=prop.name%>;
        <% }); %>
        return html\`
        <% _.forEach(includeStyleSheets, function(styleSheet) { %>
        \${<%=styleSheet.name%>}
        <% }); %>
        <%=template%>
        \`;
    }
}

customElements.define('<%=tagName%>', <%=componentName%>);
`;*/

export const APP: string = `
import {html} from '@polymer/lit-element';
import {SambalApp} from 'sambal';
import {app} from './components/css/app.js';
import './vendor.js';

<% _.forEach(components, function(com) { %>
import '<%=com.path%>';
<% }); %>

const ROUTES = [
    <% _.forEach(routes, function(route) { %>
    {
        path: '<%=route.path%>',
        components: html\`<%=route.components%>\`
    },
    <% }); %>
];

class App extends SambalApp {

    constructor() {
        super();
    }

    render() {
        const route = ROUTES.find((r) => r.path === this.page);
        return html\`
        \${app}
        <<%=themeTagName%>>
            \${route.components}
        </<%=themeTagName%>>
        \`;
    }
    
}

customElements.define('sambal-app', App);
`;

export const STYLESHEET: string = `
import {html} from '@polymer/lit-element';

export const <%=styleSheetName%> = html\`
<style>
    <%=css%>
<style>\`;
`;