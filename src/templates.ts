import {COMPONENT_CONFIG, FUNCTION_ON_STATE_CHANGED, FUNCTION_INIT_COMPONENT, FUNCTION_SHOULD_UPDATE, FUNCTION_UPDATED, FUNCTION_FIRST_UPDATED} from './constants';

const COMPONENT_IMPORTS = `
import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {ifDefined} from 'lit-html/directives/if-defined';
import {guard} from 'lit-html/directives/guard';
import {until} from 'lit-html/directives/until.js';
`;

const DYNAMIC_IMPORTS = `
<% _.forEach(imports, function(imp) { %>
import <%=imp.name%> from '<%=imp.path%>';
<% }); %>
`;

const INIT_COMPONENT = `
<% if (isInitComponent) { %>
    ${FUNCTION_INIT_COMPONENT}(this);
<% } %>
`;

const HAS_SHOULD_UPDATE = `
<% if (hasShouldUpdate) { %>
    shouldUpdate(changedProperties) {
        ${FUNCTION_SHOULD_UPDATE}(this, changedProperties);
    }
<% } %>
`

const HAS_UPDATED = `
<% if (hasUpdated) { %>
    updated(changedProperties) {
        ${FUNCTION_UPDATED}(this, changedProperties);
    }
<% } %>
`

const HAS_FIRST_UPDATED = `
<% if (hasFirstUpdated) { %>
    firstUpdated(changedProperties) {
        ${FUNCTION_FIRST_UPDATED}(this, changedProperties);
    }
<% } %>
`

const COMPONENT_LOAD_REDUCERS = `
<% _.forEach(reducers, function(reducer) { %>
import <%=reducer.name%> from '<%=reducer.path%>';
store.addReducers({
    <%=reducer.name%>
});
<% }); %>
`;

const COMPONENT_PROPERTIES = `
<% if (properties.length > 0) { %>
    static get properties() {
        return ${COMPONENT_CONFIG}.properties;
    }
<% } %>
`;

const COMPONENT_CSS = `
<% if (css) { %>
    static get styles() {
        return css\`<%=css%>\`;
    }
<% } %>
`;

const COMPONENT_RENDER = `
render() {
    <% if (properties.length > 0) { %>
        <% _.forEach(properties, function(propName) { %>
            const <%-propName%> = this[<%=propName%>];
        <% }); %>
    <% } %>
    return html\`<%=template%>\`;
}
`;

const COMPONENT_CUSTOM_ELEMENTS = `
customElements.define('<%=tagName%>', <%=componentName%>);
`;

export const SIMPLE_COMPONENT: string = `
${COMPONENT_IMPORTS}
${DYNAMIC_IMPORTS}

class <%=componentName%> extends LitElement {
    constructor() {
        super();
        ${INIT_COMPONENT}
    }
    ${COMPONENT_CSS}
    ${COMPONENT_PROPERTIES}
    ${HAS_SHOULD_UPDATE}
    ${HAS_FIRST_UPDATED}
    ${HAS_UPDATED}
    ${COMPONENT_RENDER}
}
${COMPONENT_CUSTOM_ELEMENTS}
`;

export const REDUX_COMPONENT: string = `
${COMPONENT_IMPORTS}
import {connect} from 'pwa-helpers/connect-mixin.js';
${DYNAMIC_IMPORTS}

class <%=componentName%> extends connect(store)(LitElement) {
    constructor() {
        super();
        ${INIT_COMPONENT}
    }

    stateChanged(state) {
        ${FUNCTION_ON_STATE_CHANGED}(this, state);
    }

    ${COMPONENT_CSS}
    ${COMPONENT_PROPERTIES}
    ${HAS_SHOULD_UPDATE}
    ${HAS_FIRST_UPDATED}
    ${HAS_UPDATED}
    ${COMPONENT_RENDER}
}
${COMPONENT_CUSTOM_ELEMENTS}
`;

export const STYLESHEET: string = `
import {css} from 'lit-element';

export const <%=styleSheetName%> = css\`<%=css%>\`;
`;