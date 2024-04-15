/// <reference types='vitest' />
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// Import du fichier package.json
import packageJson from './package.json';

function removeDsn({
  includeExtensions,
  excludeExtensions,
}: {
  includeExtensions: string[];
  excludeExtensions: string[];
}): Plugin {
  const regex = (arg: any[]) =>
    new RegExp(`(${arg.join('|').replace(/\./g, '\\.')})$`);

  const includeRegex = regex(includeExtensions);
  const excludeRegex = regex(excludeExtensions);

  return {
    name: 'remove-display-name',
    transform(code, id) {
      if (includeRegex.test(id) && !excludeRegex.test(id)) {
        const updatedCode = code.replace(
          /[\w$]+\.displayName\s*=\s*["'].*["'];?/g,
          ''
        );
        return {
          code: updatedCode,
          map: null,
        };
      }
    },
  };
}

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/react',

  plugins: [
    react(),
    removeDsn({
      includeExtensions: ['.ts', '.tsx'],
      excludeExtensions: ['.stories.tsx'],
    }),
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: '*.md',
          dest: '.',
        },
      ],
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/packages/react',
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
      formats: ['es'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
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
        'react/jsx-runtime',
        '@edifice-ui/icons/nav',
      ],
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/react',
      provider: 'v8',
    },
  },
});
