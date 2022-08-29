import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import pkg from './package.json'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.js'),
      name: 'vcolor-picker',
      fileName: (format) => `vcolor-picker.${format}.js`
    },

    rollupOptions: {
      external: Object.keys(Object.assign(pkg.dependencies, pkg.devDependencies)),
    }
  },

  plugins: [vue()]
})
