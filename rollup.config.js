import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from "@rollup/plugin-babel";
import json from '@rollup/plugin-json';


const devMode = (process.env.NODE_ENV === 'development');
console.log(`${ devMode ? 'development' : 'production' } mode bundle`);

export default [
  {
    input: './src/main.js',
    output: {
      file: './build/bundle.js',
      format: 'iife',
      sourcemap: devMode ? 'inline' : false
    },
    plugins: [
      nodeResolve({
        browser: true
      }),
      commonjs(),
      livereload(),
      serve({
        historyApiFallback: true,
      }),
      json(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
        plugins: ["babel-plugin-transform-html-import-to-string"],
        extensions: [".js", ".html"],
      }),
    ],
  }
];
