import { getPageURL } from '@/shared';
import { useWechatConfig } from './useWechatConfig';

type ShareConfig = { title?: string; link?: string; desc?: string; imgUrl?: string };

function updateWechatShare(shareConfig: ShareConfig) {
  const defaultShareConfig = {
    title: '',
    desc: '',
    link: `${getPageURL()}`,
    imgUrl: '',
  };
  window.wx.onMenuShareTimeline({ ...defaultShareConfig, ...shareConfig });
  window.wx.onMenuShareAppMessage({ ...defaultShareConfig, ...shareConfig });
}

export async function useWechatShare(shareConfig: ShareConfig = {}) {
  useWechatConfig(() => updateWechatShare(shareConfig));
}
