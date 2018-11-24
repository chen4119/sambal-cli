const gulp = require('gulp');
const through2 = require('through2');
const rename = require('gulp-rename');

gulp.on('error', (err) => {
    console.log('error');
    console.log(err);
});

export const gulpSeries = gulp.series;

export function asyncGlob(glob: string | string[], process: Function) {
    return new Promise(function(resolve, reject) {
        const stream = gulp.src(glob).pipe(through2.obj(function(file, enc, cb) {
            if (file.isBuffer()) {
                process(file);
            }
            cb(null, file);
        }));

        stream.on('finish', () => {
            resolve();
        });
    });
}

export function gulpSrc(glob: string | string[], process: Function) {
    return gulp.src(glob).pipe(through2.obj(function(file, enc, cb) {
        if (file.isBuffer()) {
            process(file);
        }
        cb(null, file);
    }));
}

export function gulpRename(extname: string) {
    return rename(function (path) {
        path.extname = extname;
    });
}

export function gulpDest(output: string) {
    return gulp.dest(output);
}

