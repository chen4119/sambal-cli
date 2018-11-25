import fs from 'fs';

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

export function asyncReadFile(inputPath: string) {
    return new Promise(function(resolve, reject) {
        fs.readFile(inputPath, 'utf8', function(err, contents) {
            if (err) {
                reject(err);
            } else {
                resolve(contents);
            }
        });
    });
}

export function asyncWriteFile(outputPath: string, content: string | Object) {
    return new Promise(function(resolve, reject) {
        let contentStr = content;
        if (typeof(content) === "object") {
            contentStr = JSON.stringify(content);
        }
        fs.writeFile(outputPath, contentStr, 'utf8', function(err) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
