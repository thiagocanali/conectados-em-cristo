import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { removeLegacyPasswords } from './utils/safeStorage';
import './assets/global.css';

let browserStorage = null;
try {
  browserStorage = window.localStorage;
} catch {
  browserStorage = null;
}
if (browserStorage) removeLegacyPasswords(browserStorage);

createApp(App).use(router).mount('#app');
