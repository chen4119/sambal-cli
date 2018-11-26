
export const COMPONENT: string = `
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

export const APP: string = `
import {html} from '@polymer/lit-element';
import {SambalApp} from 'sambal';
import './vendor.js';

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

class App extends SambalApp {

    constructor() {
        super();
    }

    render() {
        const route = ROUTES.find((r) => r.path === this.page);
        return route.template;
    }
    
}

customElements.define('sambal-app', App);
`;