export function getComponentNameFromTagName(tagName: string) {
    const names = tagName.split('-').map((name) => name.charAt(0).toUpperCase() + name.slice(1));
	return names.join('');
}

export function getPropertyValue(type: string, value: string) {
    if (type === 'String') {
        return `"${value}"`;    
    }
    return value;
}
