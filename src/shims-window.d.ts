export {};

declare global {
  interface Window {
    wx: {
      config: (config: any) => void;
      ready: (config: any) => void;
      error: (config: any) => void;
      chooseWXPay: (config: any) => void;
      onMenuShareTimeline: (config: any) => void;
      onMenuShareAppMessage: (config: any) => void;
    };
  }
}
