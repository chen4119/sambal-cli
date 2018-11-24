export function getComponentNameFromTagName(tagName) {
    const names = tagName.split('-').map((name) => name.charAt(0).toUpperCase() + name.slice(1));
	return names.join('');
}

export function getPropertyValue(type, value) {
    if (type === 'String') {
        return `"${value}"`;    
    }
    return value;
}
