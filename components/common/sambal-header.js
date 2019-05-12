

export const componentConfig = {
    includeCss: ['shared'],
    properties: {
        path: {type: String}
    }
};

export function initComponent(component) {
    component.path = '';
}

export function shouldUpdate(component) {
    return component.active;
}

export function onStateChanged(component, state) {
    if (component.path !== state.sambal.path) {
        component.path = state.sambal.path;
    }
}