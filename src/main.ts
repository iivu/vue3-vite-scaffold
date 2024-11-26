import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';

import { router } from './router';
import App from './App.vue';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      }
    }
  }
}

const app = createApp(App);
const pinia = createPinia();

app
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .use(pinia)
  .use(router)
  .mount('#app');
