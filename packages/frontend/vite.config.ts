import { defineConfig } from 'vite'
import { join } from 'node:path'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletImportResolver } from '@varlet/import-resolver'
import icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    components({
      resolvers: [
        VarletImportResolver(),
        IconsResolver()
      ]
    }),
    autoImport({
      resolvers: [VarletImportResolver({ autoImport: true })]
    }),
    unocss(),
    icons(),
  ],
  resolve: {
    alias: {
      '@src': join(__dirname, './src'),
    },
  },
})
