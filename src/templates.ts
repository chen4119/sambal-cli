const COMPONENT_IMPORTS = `
import {LitElement, html} from '@polymer/lit-element';
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
    this.<%-prop.name%> = state.<%=prop.state%>;
    <% }); %>
}
`;

export const SIMPLE_COMPONENT: string = `
${COMPONENT_IMPORTS}
${COMPONENT_IMPORT_ACTIONS_SELECTORS}
${COMPONENT_IMPORT_STYLE_SHEETS}

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
import {store} from 'sambal';
${COMPONENT_IMPORT_ACTIONS_SELECTORS}
${COMPONENT_IMPORT_STYLE_SHEETS}

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
import {updateLocation, updateScreenSize, receivedLazyResources, store} from 'sambal';
${COMPONENT_IMPORTS}
${COMPONENT_IMPORT_ACTIONS_SELECTORS}
${COMPONENT_IMPORT_STYLE_SHEETS}

const ROUTES = [
<% _.forEach(routes, function(route) { %>
{
    path: '<%=route.path%>',
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

    firstUpdated() {
        installRouter(async (location) => {
            const path = decodeURIComponent(location.pathname);
            if (this.routeMap.has(path)) {
                const route = this.routeMap.get(path);
                if (route.import && !route.importLoaded) {
                    await route.import();
                    route.importLoaded = true;
                }
            }
            store.dispatch(updateLocation(path));
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

/*
export const APP: string = `
import {html} from '@polymer/lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {SambalApp} from 'sambal';
import {store} from 'sambal';
import {main} from './components/css/main.js';

<% _.forEach(reducers, function(reducer) { %>
import <%=reducer.name%> from '<%=reducer.path%>';
<% }); %>

<% _.forEach(components, function(com) { %>
import '<%=com.path%>';
<% }); %>

const ROUTES = [
    <% _.forEach(routes, function(route) { %>
    {
        path: '<%=route.path%>'
    },
    <% }); %>
];

<% if (reducers.length > 0) { %>
store.addReducers({
    <% _.forEach(reducers, function(reducer) { %>
    <%=reducer.name%>,
    <% }); %>
});
<% } %>


class App extends connect(store)(SambalApp) {

    constructor() {
        super(ROUTES);
    }

    static get properties() { 
        return {
            path: {type: String}
        }
    }

    stateChanged(state) {
        if (this.path !== state.sambal.path) {
            this.path = state.sambal.path;
        }
    }

    render() {
        const route = this.getRoute(this.path);
        return html\`
        \${main}
        <<%=themeTagName%>>
            \${route.template}
        </<%=themeTagName%>>
        \`;
    }
    
}

customElements.define('sambal-app', App);
`;*/

export const LAZY_RESOURCES: string = `
<% _.forEach(components, function(com) { %>
import '<%=com.path%>';
<% }); %>
`;

export const STYLESHEET: string = `
import {html} from '@polymer/lit-element';

export const <%=styleSheetName%> = html\`
<style>
    <%=css%>
<style>\`;
`;