

export const componentConfig = {
    includeCss: ['shared'],
    properties: {
        path: {type: String}
    }
};

export function initComponent() {
    this.path = '/';
    this.testing = 'hello world';
}

export function onStateChanged(state) {
    if (this.path !== state.app.route) {
        this.path = state.app.route;
    }
}