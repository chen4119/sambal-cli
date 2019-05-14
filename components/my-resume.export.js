export const componentConfig = {
    includeCss: ['shared'],
    properties: {
        active: {type: Boolean}
    }
};

export function shouldUpdate(component) {
    return component.active;
}