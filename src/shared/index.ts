import { Toast, Dialog } from 'vant';

let hideLoadingTimer: number | null = null;
Toast.setDefaultOptions('loading', { forbidClick: true, duration: 0 });

export function randomValue(min: number, max: number): number {
  const t = max - min;
  return Math.floor(Math.random() * t + min);
}

export function randomPick<T>(array: T[]): T {
  const length = array.length;
  const randomIndex = Math.floor(Math.random() * length);
  return array[randomIndex];
}

export function px2rem(px: number): number {
  return px / 100;
}

export function showLoading(message = '加载中...') {
  clearTimeout(hideLoadingTimer as number);
  Toast.loading({ message });
}

export function hideLoading() {
  hideLoadingTimer = window.setTimeout(() => Toast.clear(), 100);
}

export function showToast(message: string) {
  Toast({ message, forbidClick: false });
}

export function showModal(message: string, cb?: () => void) {
  Dialog.alert({ message }).then(() => {
    cb && cb();
  });
}

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject();
    image.src = url;
  });
}

export function getParameterByName(name: string, url?: string) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function fixiOSInputBlurBug() {
  window.scrollBy(0, 1);
}

export function getRandomStr(num: number): string {
  const dict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * dict.length);
    result += dict[random];
  }
  return result;
}

export function getPageURL() {
  return `${window.location.origin}${window.location.pathname}`;
}
