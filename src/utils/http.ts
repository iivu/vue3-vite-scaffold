import axios, { AxiosError } from 'axios';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

import { showModal, showLoading, hideLoading } from './index';

type HttpConfig = { loading: boolean; catchError: boolean };
type HttpData = { [key: string]: any };
type BaseApiResponse = { code: number; msg: string; data: any };
type AxiosRequestConfigWithCustomConfig<T> = AxiosRequestConfig<T> & HttpConfig;


const httpClient = axios.create({
  baseURL: import.meta.env.APP_API_PREFIX,
  timeout: 20000,
  // withCredentials: true,
});
const defaultHttpConfig: HttpConfig = { loading: true, catchError: true };

function httpStatusInterceptor(res: AxiosResponse<BaseApiResponse>) {
  const data = res.data;
  const config = res.config as AxiosRequestConfigWithCustomConfig<any>;
  if (config.loading) hideLoading();
  if (data.code !== 0) {
    return Promise.reject({ msg: data.msg, catchError: config.catchError });
  }
  return data.data || {};
}

function httpClientErrorHandler(err: { msg?: string; catchError?: boolean; message?: string }) {
  // 错误有可能是app内自定义的错误或者是axios自己抛出的错误
  // @ts-ignore
  const isAxiosError = err instanceof AxiosError;
  hideLoading();
  if (err.catchError || isAxiosError) showModal(err.msg || err.message || '网络繁忙');
  return Promise.reject(err);
}

httpClient.interceptors.response.use(httpStatusInterceptor);

export function get<T>(path: string, params?: HttpData, config?: Partial<HttpConfig>) {
  if (!params) params = {};
  if (!config) config = { loading: true, catchError: true };
  if (config.loading) showLoading();
  return httpClient
    .get<T>(path, {
      params,
      ...defaultHttpConfig,
      ...config,
    })
    .catch(httpClientErrorHandler);
}

export function post<T>(path: string, data?: HttpData, config?: Partial<HttpConfig>) {
  if (!data) data = {};
  if (!config) config = { loading: true, catchError: true };
  if (config.loading) showLoading();
  return httpClient
    .post<T>(path, data, {
      headers:{},
      ...defaultHttpConfig,
      ...config,
    })
    .catch(httpClientErrorHandler);
}
