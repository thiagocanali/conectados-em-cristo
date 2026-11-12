import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ command, isPreview }) => ({
  plugins: [vue()],
  base: command === 'serve' && !isPreview
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
