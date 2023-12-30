import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let isServiceLoaded = false;

const bundle = async (rawCode: string) => {
    if (!isServiceLoaded) {
        await esbuild.initialize({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.19.9/esbuild.wasm'
        });
        isServiceLoaded = true;
    }

    const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window'
        },
        jsxFactory: '_React.createElement',
        jsxFragment: '_React.Fragment'
    });

    return { code: result.outputFiles[0].text };
};

export default bundle;
