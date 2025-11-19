// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/conectados-em-cristo/' // <-- obrigatório se o repo for thiagocanali/conectados-em-cristo
})
