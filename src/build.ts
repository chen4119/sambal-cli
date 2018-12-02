
import {rollup} from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export async function build(input: string, output: string) {
    console.log("rollup...");
    const bundle = await rollup({
        input: input,
        plugins: [
            resolve(),
            babel({
                // babelrc: false,
                // "presets": ["minify"]
                // exclude: 'node_modules/**' // only transpile our source code
            })
        ]
    });
    return bundle.write({
        file: output,
        format: 'esm'
    });
}