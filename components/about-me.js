

export const componentConfig = {
    includeCss: ['shared'],
    properties: {
        content: {type: Object}
    }
};

export function shouldUpdate(component) {
    return component.active;
}

export function onStateChanged(component, state) {
    if (component.content !== state.app.blogPost) {
        component.content = state.app.blogPost;
    }
}