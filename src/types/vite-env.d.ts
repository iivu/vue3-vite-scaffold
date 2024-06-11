/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const __VITE_COMMAND__: string;

interface ImportMetaEnv {
  readonly APP_TITLE: string;
  readonly APP_TOKEN_NAME: string;
  readonly APP_API_PREFIX: string;
  readonly APP_BASE_URL: string;
  readonly APP_WECHAT_CONFIG_URL: string;
  readonly APP_SHARE_TITLE: string;
  readonly APP_SHARE_DESC: string;
  readonly APP_USE_MOCK?: string;
}