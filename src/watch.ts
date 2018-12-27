import {gulpSeries, gulpWatch} from './gulp';
import browserSync from 'browser-sync';
import {generate} from "./generator";
import {build} from "./build";

export async function watch(configFolder: string, componentFolder: string, sharedCssFolder: string, actionFolder: string, reducerFolder: string, jsFolder: string) {
    const globs = [
        `${configFolder}/site.yml`,
        `${configFolder}/routes.yml`,
        `${componentFolder}/**/*`,
        `${sharedCssFolder}/**/*`,
        `${actionFolder}/**/*`,
        `${reducerFolder}/**/*`,
        './app.css',
        './app.html',
        './app.md'
    ];
    const instance = browserSync.create();
    instance.init({
        /*
        server: {
            baseDir: "./"
        }*/
        proxy: "localhost:8081"
    });

    const generateTask = () => generate(configFolder, componentFolder, sharedCssFolder, actionFolder, reducerFolder, jsFolder);
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


