import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), mdx({jsxImportSource: 'vue', providerImportSource: '@mdx-js/vue'})],
})
