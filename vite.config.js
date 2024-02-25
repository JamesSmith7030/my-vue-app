import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import mdx from "@mdx-js/rollup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    mdx({
      development: true,
      jsxImportSource: "vue",
      providerImportSource: "@mdx-js/vue",
      jsxRuntime: "classic",
      jsx: true,
      // [plugin:vite:import-analysis] Failed to parse source for import analysis because the content contains invalid JS syntax. If you are using JSX, make sure to name the file with the .jsx or .tsx extension.
      // /home/jamessmith/CoderStore/my-vue-app/src/post.mdx:21:116
      // 19 |      ...props.components
    }),
  ],
});
