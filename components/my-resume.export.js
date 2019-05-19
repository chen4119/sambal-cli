export const componentConfig = {
    includeCss: ['shared'],
    properties: {
        active: {type: Boolean}
    }
};

export function shouldUpdate(component) {
    console.log('resume should update ' + component.active);
    return component.active;
}