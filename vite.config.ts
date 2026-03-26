import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),

    AutoImport({
      imports: ['vue', 'pinia'],
      dirs: ['./src/stores', './src/types'],
      dirsScanOptions: {
        types: true,
      },
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),

    Components({
      dirs: ['src/components', 'src/screens'],
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  ],

  resolve: {
    alias: {
      '@': '/src',
    },
  },
})