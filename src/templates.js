
export const COMPONENT = `
import {LitElement, html} from '@polymer/lit-element';

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
        return html\`<%=template%>\`;
    }
}

customElements.define('<%=tagName%>', <%=componentName%>);
`;

export const APP = `
import {LitElement, html} from '@polymer/lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {installRouter} from 'pwa-helpers/router.js';
import {store} from './store.js';
import './vendor.js';
import {updateLocation} from './actions/app.js';

<% _.forEach(components, function(com) { %>
import '<%=com.path%>';
<% }); %>

const ROUTES = [
    <% _.forEach(routes, function(route) { %>
    {
        path: '<%=route.path%>',
        template: html \`<%=route.template%>\`
    },
    <% }); %>
];

class SambalApp extends connect(store)(LitElement) {

    constructor() {
        super();
    }

    firstUpdated() {
        installRouter((location) => store.dispatch(updateLocation(location)));
        
        // Custom elements polyfill safe way to indicate an element has been upgraded.
        this.removeAttribute('unresolved');
    }

    static get properties() { 
        return {
            page: {type: String}
        }
    }

    stateChanged(state) {
        if (this.page !== state.app.page) {
            this.page = state.app.page;
        }
    }

    render() {
        const route = ROUTES.find((r) => r.path === this.page);
        return route.template;
    }
    
}

customElements.define('sambal-app', SambalApp);
`;