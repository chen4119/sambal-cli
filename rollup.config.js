import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import pkg from './package.json';
// import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

export default {
    input: './src/index.ts',
    output: [
        {
          file: 'index.js',
          format: 'cjs',
        }
    ],
    external: [
        "path",
        "fs",
        "crypto",
        "child_process",
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        resolve(),
        json({
            // for tree-shaking, properties will be declared as
            // variables, using either `var` or `const`
            preferConst: true, // Default: false
        
            // specify indentation for the generated default export —
            // defaults to '\t'
            indent: '  ',
        
            // ignores indent and generates the smallest code
            compact: true, // Default: false
        }),
        typescript({module: "es2015"})
    ]
}
