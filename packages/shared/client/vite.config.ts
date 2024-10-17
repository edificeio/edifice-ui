import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/ts/index.ts"),
      name: "edifice-ts-client",
      fileName: "index",
      formats: ["cjs", "es"],
    },
  },
  plugins: [dts(), visualizer()],
});
