import {gulpSeries, gulpWatch} from './gulp';
import browserSync from 'browser-sync';
import CodeGenerator from "./codegen";
import {REDUX_STORE_FILE_PATH} from './constants';
// import {build} from "./build";

export function watch(componentFolder: string, assetFolder: string, actionFolder: string, reducerFolder: string, jsFolder: string) {
    const globs = [
        `${componentFolder}/**/*`,
        `${assetFolder}/css/**/*`,
        `${actionFolder}/**/*`,
        `${reducerFolder}/**/*`,
        REDUX_STORE_FILE_PATH
    ];
    const instance = browserSync.create();
    instance.init({
        /*
        server: {
            baseDir: "./"
        }*/
        proxy: "localhost:8081"
    });

    const generateTask = async () => {
        const generator = new CodeGenerator(
            componentFolder,
            assetFolder,
            actionFolder,
            reducerFolder,
            jsFolder
        );
        await generator.generate();
    };
    // const buildTask = () => build(`${jsFolder}/app.js`, output);
    const reloadTask = (cb) => {
        instance.reload();
        cb();
    }
    const reBuild = gulpSeries(
        generateTask,
        // buildTask,
        reloadTask
    );
    const watcher = gulpWatch(globs, {delay: 1000}, function(cb) {
        reBuild((error) => {
            cb();
        });
    });

    /*
    watcher.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
        reBuild((error) => {
            console.log("done");
        });
    });
    watcher.on('add', function(path, stats) {
        console.log(`File ${path} was added`);
    });
    watcher.on('unlink', function(path, stats) {
        console.log(`File ${path} was removed`);
    });*/
}


