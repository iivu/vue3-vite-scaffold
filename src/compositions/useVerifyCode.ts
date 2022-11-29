import { ref } from 'vue';

import { validateTelephone,showToast } from '@iivu/utils';
import * as api from '@/services/api';

export function useVerifyCode() {
  let timer: number | null = null;
  const lock = ref(false);
  const remainTime = ref(0);

  async function send(tel: string) {
    if (!validateTelephone(tel)) {
      showToast('请输入正确的手机号码');
      return;
    }
    try {
      const res = await api.sendVerifyCode({ mobile: tel });
      remainTime.value = res.remainderSecond;
      lock.value = true;
      countDown();
    } catch (e) {
      console.log(e);
    }
  }

  function countDown() {
    lock.value = true;
    timer = window.setInterval(() => {
      remainTime.value--;
      if (remainTime.value === 0) {
        clearInterval(timer as number);
        lock.value = false;
      }
    }, 1000);
  }

  return { lock, remainTime, send };
}
