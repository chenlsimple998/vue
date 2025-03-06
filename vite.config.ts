import { fileURLToPath, URL } from 'node:url'
import cesium from 'vite-plugin-cesium'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(),cesium()],
  base: process.env.NODE_ENV === 'production' ? '/vue/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components':  fileURLToPath(new URL('./src/components', import.meta.url)),
      '@views':  fileURLToPath(new URL('./src/views', import.meta.url)),
      '@utils':  fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@assets':  fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.png', '**/*.jpg'],
})
