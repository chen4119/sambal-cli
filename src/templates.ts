const COMPONENT_IMPORTS = `
import {LitElement, html} from '@polymer/lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {ifDefined} from 'lit-html/directives/if-defined';
import {guard} from 'lit-html/directives/guard';
import {until} from 'lit-html/directives/until.js';
import {store} from 'sambal';
`;

const COMPONENT_IMPORT_STYLE_SHEETS = `
<% _.forEach(includeStyleSheets, function(styleSheet) { %>
import {<%=styleSheet.name%>} from '<%=styleSheet.path%>';
<% }); %>
`;

const COMPONENT_IMPORT_ACTIONS_SELECTORS = `
<% _.forEach(actionsAndSelectors, function(js) { %>
import {<%=js.imports%>} from '<%=js.path%>';
<% }); %>
`;

const COMPONENT_INIT_PROPERTIES = `
<% _.forEach(properties, function(prop) { %>
this.<%-prop.name%> = <%=prop.value%>;
<% }); %>
`;

const COMPONENT_IMPORT_INCLUDES = `
<% _.forEach(includes, function(path) { %>
import '<%=path%>';
<% }); %>
`;

const COMPONENT_LOAD_REDUCERS = `
<% _.forEach(reducers, function(reducer) { %>
import <%=reducer.name%> from '<%=reducer.path%>';
store.addReducers({
    <%=reducer.name%>
});
<% }); %>
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

const STATE_CHANGE_HANDLER = `
stateChanged(state) {
    <% _.forEach(stateProps, function(prop) { %>
    if (this.<%-prop.name%> !== state.<%=prop.state%>) {
        this.<%-prop.name%> = state.<%=prop.state%>;
    }
    <% }); %>
}
`;

export const SIMPLE_COMPONENT: string = `
${COMPONENT_IMPORTS}
${COMPONENT_IMPORT_ACTIONS_SELECTORS}
${COMPONENT_IMPORT_STYLE_SHEETS}
${COMPONENT_LOAD_REDUCERS}

class <%=componentName%> extends LitElement {
    constructor() {
        super();
        ${COMPONENT_INIT_PROPERTIES}
    }
    ${COMPONENT_PROPERTIES}
    ${COMPONENT_RENDER}
}
${COMPONENT_CUSTOM_ELEMENTS}
`;

export const REDUX_COMPONENT: string = `
${COMPONENT_IMPORTS}
import {connect} from 'pwa-helpers/connect-mixin.js';
${COMPONENT_IMPORT_ACTIONS_SELECTORS}
${COMPONENT_IMPORT_STYLE_SHEETS}
${COMPONENT_LOAD_REDUCERS}

class <%=componentName%> extends connect(store)(LitElement) {
    constructor() {
        super();
        ${COMPONENT_INIT_PROPERTIES}
    }
    ${COMPONENT_PROPERTIES}
    ${STATE_CHANGE_HANDLER}
    ${COMPONENT_RENDER}
}
${COMPONENT_CUSTOM_ELEMENTS}
`;

export const APP: string = `
import {installRouter} from 'pwa-helpers/router.js';
import {installMediaQueryWatcher} from 'pwa-helpers/media-query.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {updateMetadata} from 'pwa-helpers/metadata.js';
import {updateLocation, updateScreenSize, receivedLazyResources} from 'sambal';
${COMPONENT_IMPORTS}
${COMPONENT_IMPORT_ACTIONS_SELECTORS}
${COMPONENT_IMPORT_STYLE_SHEETS}
${COMPONENT_IMPORT_INCLUDES}
${COMPONENT_LOAD_REDUCERS}

const ROUTES = [
<% _.forEach(routes, function(route) { %>
{
    path: '<%=route.path%>',
    type: '<%=route.type%>',
    <% if (route.title) { %>
    title: '<%=route.title%>',
    <% } %>
    <% if (route.description) { %>
    description: '<%=route.description%>',
    <% } %>
    <% if (route.import) { %>
    import: () => import('<%=route.importPath%>'),
    importLoaded: false
    <% } %>
},
<% }); %>
];

class App extends connect(store)(LitElement) {
    constructor() {
        super();
        this.routeMap = new Map();
        for (let i = 0; i < ROUTES.length; i++) {
            this.routeMap.set(ROUTES[i].path, ROUTES[i]);
        }
        ${COMPONENT_INIT_PROPERTIES}
    }

    loadLazyResources() {
        const lazyLoadComplete = store.getState().sambal.lazyResourcesLoaded;
        // load lazy resources after render
        if (!lazyLoadComplete) {
            requestAnimationFrame(async () => {
                await import('./lazyResources.js');
                store.dispatch(receivedLazyResources());
            });
        }
    }

    updated(changedProps) {
        if (changedProps.has('_path_')) {
            let route = null;
            if (this.routeMap.has(this._path_)) {
                route = this.routeMap.get(this._path_);
            }
            const meta = {
                title: (route && route.title) ? route.title : null,
                description: (route && route.description) ? route.description : null
            }
            updateMetadata(meta);
        }
    }

    firstUpdated() {
        installRouter(async (location) => {
            const locationPath = decodeURIComponent(location.pathname);
            let goToPath = locationPath;
            if (this.routeMap.has(goToPath)) {
                const route = this.routeMap.get(goToPath);
                if (route.import && !route.importLoaded) {
                    await route.import();
                    route.importLoaded = true;
                }
            } else {
                const notFoundRoute = ROUTES.find((r) => r.type === 'notfound');
                if (notFoundRoute) {
                    window.location.href = notFoundRoute.path;
                    return;
                }
            }
            store.dispatch(updateLocation(goToPath));
            this.loadLazyResources();
        });
        installMediaQueryWatcher('(max-width: <%=site.smallScreenSize%>px)', (matches) => store.dispatch(updateScreenSize(matches)));

        // Custom elements polyfill safe way to indicate an element has been upgraded.
        this.removeAttribute('unresolved');
    }

    ${COMPONENT_PROPERTIES}
    ${STATE_CHANGE_HANDLER}
    ${COMPONENT_RENDER}
}
customElements.define('sambal-app', App);
`;

export const LAZY_RESOURCES: string = `
<% _.forEach(components, function(com) { %>
import '<%=com.path%>';
<% }); %>
${COMPONENT_IMPORT_INCLUDES}
`;

export const STYLESHEET: string = `
import {html} from '@polymer/lit-element';

export const <%=styleSheetName%> = html\`
<style>
    <%=css%>
<style>\`;
`;