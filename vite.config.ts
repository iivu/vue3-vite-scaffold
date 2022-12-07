import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import WindiCSS from 'vite-plugin-windicss';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import VueComponent from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';

import type { UserConfigFn } from 'vite';

// https://vitejs.dev/config/
const config = ({ mode, command }) => {
  const inOnline = command === 'build';
  const envPrefix = 'APP_';
  const { APP_TITLE = '', APP_BASE_URL = '' } = loadEnv(mode, process.cwd(), envPrefix);
  return {
    base: inOnline ? APP_BASE_URL : '/',
    envPrefix,
    plugins: [
      vue(),
      WindiCSS(),
      createHtmlPlugin({
        minify: inOnline,
        inject: {
          data: {
            title: APP_TITLE,
          },
        },
      }),
      VueComponent({
        resolvers: [
          VantResolver(),
          IconsResolver({ prefix:'icon',enabledCollections: ['ant-design'] })
        ],
      }),
      Icons({ compiler: 'vue3' }),
    ],
    build: {
      target: 'es2015',
      assetsInlineLimit: 1024,
      sourcemap: !inOnline,
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.mjs', '.vue', '.json', '.scss', '.css'],
    },
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
  };
};

export default defineConfig(config as UserConfigFn);
