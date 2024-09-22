import { resolve } from 'path';
import { defineConfig } from 'vite';
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'types/index.ts'),
      name: 'icons',
      fileName: 'index',
      formats: ['es'],
    },
  },
  plugins: [
    iconsSpritesheet({
      // Defaults to false, should it generate TS types for you
      withTypes: true,
      // The path to the icon directory
      inputDir: 'assets',
      // Output path for the generated spritesheet and types
      outputDir: 'dist',
      // Output path for the generated type file, defaults to types.ts in outputDir
      typesOutputFile: 'types/index.ts',
      // The name of the generated spritesheet, defaults to sprite.svg
      fileName: 'icons.svg',
      // The cwd, defaults to process.cwd()
      cwd: process.cwd(),
      // What formatter to use to format the generated files, prettier or biome, defaults to no formatter
      formatter: 'prettier',
      // Callback function that is called when the script is generating the icon name
      // This is useful if you want to modify the icon name before it is written to the file
      iconNameTransformer: (iconName) => iconName,
    }),
  ],
});
