import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import mdx from 'vite-plugin-mdx'
console.log(mdx.default())

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), mdx.default({ jsxImportSource: 'vue'})],
})
