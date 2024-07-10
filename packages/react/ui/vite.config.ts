/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Import du fichier package.json
import { PluginPure } from "rollup-plugin-pure";
import { removeDsn } from "../../../scripts/remove-display-name";
import packageJson from './package.json';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/packages/react/ui',

  plugins: [
    react({
      babel: {
        plugins: ["@babel/plugin-transform-react-pure-annotations"],
      },
    }),
    nxViteTsPaths(),
    removeDsn({
      includeExtensions: [".ts", ".tsx"],
      excludeExtensions: [".stories.tsx"],
    }),
    PluginPure({
      functions: ["Object.assign"],
    }),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../../dist/packages/react',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'react',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        ...Object.keys(packageJson.dependencies || {}),
        'dayjs/plugin/customParseFormat',
        'dayjs/plugin/relativeTime',
        'dayjs/locale/de',
        'dayjs/locale/es',
        'dayjs/locale/pt',
        'dayjs/locale/fr',
        'dayjs/locale/it',
        'swiper/react',
        'swiper/modules',
      ],
    },
  },

  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/packages/react/ui',
      provider: 'v8',
    },
  },
});
