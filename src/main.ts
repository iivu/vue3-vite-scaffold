import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';

import { router } from './router';
import App from './App.vue';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';


const app = createApp(App);
const pinia = createPinia();

app
  .use(VueQueryPlugin)
  .use(pinia)
  .use(router)
  .mount('#app');
