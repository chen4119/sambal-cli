import {from, interval, Observable} from "rxjs";

class Bundler {
    private fileMap: Map<string, string> = new Map<string, string>(); // map a src file to dest file
    constructor() {

    }

    async bundle($: CheerioStatic, destFolder: string) {
        const scriptSelector = 'script[src]';
        const 
        $(scriptSelector).each(function() {
            const jsFile = $(this).attr("src");
            console.log(jsFile);
        });
    }


}

export default Bundler;