

export const componentConfig = {
    includeCss: ['shared'],
    properties: {
        content: {type: Object},
        active: {type: Boolean}
    }
};

export function shouldUpdate() {
    return this.active;
}

export function onStateChanged(state) {
    if (this.content !== state.app.blogPost) {
        this.content = state.app.blogPost;
    }
}