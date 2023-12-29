import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createHtmlPlugin } from 'vite-plugin-html';
import checker from 'vite-plugin-checker';
import path from 'path';
import macrosPlugin from 'vite-plugin-babel-macros';
import { visualizer } from 'rollup-plugin-visualizer';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import inject from '@rollup/plugin-inject';

import { dependencies } from './package.json';
function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach(key => {
    if (['react', 'react-router-dom', 'react-dom', 'lodash', 'bootstrap', 'axios'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_');

  return {
    server: { hmr: true, port: 6009 },
    plugins: [
      visualizer({
        template: 'treemap', // or sunburst
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: 'analice.html',
      }),
      macrosPlugin(),
      react({
        include: ['**/*.tsx', '**/*.ts'],
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                displayName: true,
                fileName: false,
              },
            ],
          ],
        },
      }),
      tsconfigPaths(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            ...env,
            MODE: mode,
          },
        },
      }),
      checker({ typescript: true }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        stream: 'stream-browserify',
        buffer: 'buffer',
      },
    },
    css: {
      postcss: ctx => ({
        parser: ctx.parser ? 'sugarss' : false,
        map: ctx.env === 'development' ? ctx.map : false,
        plugins: {
          'postcss-import': {},
          'postcss-nested': {},
          cssnano: ctx.env === 'production' ? {} : false,
          autoprefixer: { overrideBrowserslist: ['defaults'] },
        },
      }),
    },
    define: {
      'process.env.NODE_DEBUG': JSON.stringify(''),
      DOT_ENV: env,
      __CLIENT__: true,
    },
    build: {
      target: ['esnext'],
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-router-dom', 'react-dom'],
            ...renderChunks(dependencies),
          },
        },
        plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    test: {
      globals: true,
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
        define: {
          global: 'globalThis',
        },
        supported: {
          bigint: true,
        },
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  };
});
