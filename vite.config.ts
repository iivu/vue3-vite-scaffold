import path from 'path';
import url from 'url';

import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import VueComponent from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';

import type { UserConfigFn, ProxyOptions } from 'vite';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
const config = ({ mode, command }) => {
  const isOnline = command === 'build';
  const envPrefix = 'APP_';
  const { APP_TITLE = '', APP_BASE_URL = '', APP_API_PREFIX = '' } = loadEnv(mode, process.cwd(), envPrefix);
  const base = isOnline ? APP_BASE_URL : '/';
  const proxyConfigs: Record<string, string | ProxyOptions> = {
    '^/api/.*': {
      target: APP_API_PREFIX,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  };
  return {
    base,
    envPrefix,
    define: {
      __VITE_COMMAND__: JSON.stringify(command),
    },
    plugins: [
      vue(),
      legacy(),
      createHtmlPlugin({
        minify: isOnline,
        inject: {
          data: {
            title: APP_TITLE,
          },
        },
      }),
      VueComponent({
        resolvers: [VantResolver(), IconsResolver({ prefix: 'icon', enabledCollections: ['ant-design'] })],
        dts: 'src/types/components.d.ts',
      }),
      Icons({ compiler: 'vue3' }),
    ],
    build: {
      target: 'es2015',
      assetsInlineLimit: 1024,
      sourcemap: !isOnline,
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
        plugins: [autoprefixer, tailwindcss],
      },
    },
    server: {
      port: 6021,
      proxy: isOnline ? null : proxyConfigs,
    },
  };
};

export default defineConfig(config as UserConfigFn);
