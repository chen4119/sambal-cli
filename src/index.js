const program = require('commander');
import {version} from '../package.json';
import {generate} from './generator';

program
    .version(version)
    .option('-g, --generate', 'Generate javascript files')
    .parse(process.argv);

if (program.generate) {
    generate();
}

