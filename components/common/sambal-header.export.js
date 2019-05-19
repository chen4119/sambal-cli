

export const componentConfig = {
    includeCss: ['shared'],
    properties: {
        path: {type: String}
    }
};

export function initComponent(component) {
    component.path = '/';
}

export function onStateChanged(component, state) {
    if (component.path !== state.app.route) {
        component.path = state.app.route;
    }
}