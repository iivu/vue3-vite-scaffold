import { Toast, Dialog } from 'vant';

let hideLoadingTimer: number | null = null;
Toast.setDefaultOptions('loading', { forbidClick: true, duration: 0 });

export function validateTelephone(tel: string): boolean {
  return /^1[3456789]\d{9}$/.test(tel);
}

export function randomValue(min: number, max: number): number {
  const t = max - min;
  return Math.floor((Math.random() * t) + min);
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
