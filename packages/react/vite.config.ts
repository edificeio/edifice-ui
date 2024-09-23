import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { PluginPure } from 'rollup-plugin-pure';
import { removeDsn } from '../../scripts/remove-display-name';
import { dependencies, peerDependencies } from './package.json';

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        editor: resolve(__dirname, 'src/modules/editor/index.ts'),
        audience: resolve(__dirname, 'src/modules/audience/index.ts'),
        modals: resolve(__dirname, 'src/modules/modals/index.ts'),
        multimedia: resolve(__dirname, 'src/modules/multimedia/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: ({ name: fileName }) => {
          return `${fileName}.js`;
        },
      },
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
        'dayjs/plugin/customParseFormat.js',
        'dayjs/plugin/relativeTime.js',
        'dayjs/plugin/localizedFormat.js',
        'dayjs/locale/de.js',
        'dayjs/locale/es.js',
        'dayjs/locale/pt.js',
        'dayjs/locale/fr.js',
        'dayjs/locale/it.js',
        'swiper/react',
        'swiper/modules',
        'react/jsx-runtime',
        '@edifice.io/icons/icons.svg',
      ],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-transform-react-pure-annotations'],
      },
    }),
    removeDsn({
      includeExtensions: ['.ts', '.tsx'],
      excludeExtensions: ['.stories.tsx'],
    }),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@tanstack/react-query': ['node_modules/@tanstack/react-query'],
        },
      },
    }),
    PluginPure({
      functions: ['Object.assign'],
    }),
    visualizer(),
  ],
});
