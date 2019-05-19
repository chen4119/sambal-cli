

export const componentConfig = {
    includeCss: ['shared'],
    properties: {
        content: {type: Object},
        active: {type: Boolean}
    }
};

export function shouldUpdate(component) {
    console.log('about me should update ' + component.active);
    return component.active;
}

export function onStateChanged(component, state) {
    if (component.content !== state.app.blogPost) {
        component.content = state.app.blogPost;
    }
}