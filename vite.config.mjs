import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  base: command === 'serve'
    ? '/'
    : process.env.VERCEL
      ? '/'
      : '/conectados-em-cristo/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}));
