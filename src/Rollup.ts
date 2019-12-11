import {rollup, RollupOutput} from "rollup";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import path from "path";

export async function build(input: string, dest: string) {
    console.log(`Roll up ${input}`);
    const bundle = await rollup({
        input: input,
        plugins: [
            resolve({
                // the fields to scan in a package.json to determine the entry point
                // if this list contains "browser", overrides specified in "pkg.browser"
                // will be used
                mainFields: ['module', 'main'], // Default: ['module', 'main']

                // some package.json files have a "browser" field which specifies
                // alternative files to load for people bundling for the browser. If
                // that's you, either use this option or add "browser" to the
                // "mainfields" option, otherwise pkg.browser will be ignored
                browser: true,  // Default: false

                // not all files you want to resolve are .js files
                extensions: [ '.mjs', '.js', '.jsx', '.json' ],  // Default: [ '.mjs', '.js', '.json', '.node' ]

                // whether to prefer built-in modules (e.g. `fs`, `path`) or
                // local ones with the same names
                preferBuiltins: true,  // Default: true

                // If true, inspect resolved files to check that they are
                // ES2015 modules
                modulesOnly: false, // Default: false

                // Force resolving for these modules to root's node_modules that helps
                // to prevent bundling the same package multiple times if package is
                // imported from dependencies.
                dedupe: [], // Default: []
            }),
            commonjs({
                // non-CommonJS modules will be ignored, but you can also
                // specifically include/exclude files
                include: 'node_modules/**',  // Default: undefined
                // these values can also be regular expressions
                // include: /node_modules/
          
                // search for files other than .js files (must already
                // be transpiled by a previous plugin!)
                extensions: [ '.js' ],  // Default: [ '.js' ]
          
                // if true then uses of `global` won't be dealt with by this plugin
                ignoreGlobal: false,  // Default: false
          
                // if false then skip sourceMap generation for CommonJS modules
                sourceMap: false,  // Default: true
          
            }),
            babel({
                // babelrc: false,
                // "presets": ["minify"]
                // exclude: 'node_modules/**' // only transpile our source code
            }),
            postcss({
                plugins: [],
                minimize: true,
                extract: true
            })
        ]
    });

    // const result: RollupOutput = await bundle.generate({format: 'esm'});
    const output = path.normalize(`${dest}/${path.dirname(input)}`);
    console.log(output);
    const result: RollupOutput = await bundle.write({
        dir: output,
        format: 'umd'
        // name: 'dfois.css'
        // entryFileNames: '[name]-[hash].js'
    });
    return {
        src: input,
        dest: `${output}/${result.output[0].fileName}`
    };
}