/**
 * 环境识别
 */
const ua = window.navigator.userAgent;

export const android = !!ua.match(/(Android);?[\s/]+([\d.]+)?/);
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
export const iPhone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
export const isPiPiApp = /pipipeiwan/i.test(window.navigator.userAgent);

export const platform = {
  get os() {
    let os = 'pc';
    if (android) {
      os = 'android';
    } else if (ipad || ipod || iPhone) {
      os = 'ios';
    }
    return os;
  },
};
const { screen } = window;
export const iPhoneX = iPhone && (
  (screen.width === 375 && screen.height === 812) // X/XS
    || (screen.width === 414 && screen.height === 896) // XR / XS Max
    || (screen.width === 390 && screen.height === 844) // iPhone12 && iPhone12 pro
    || (screen.width === 428 && screen.height === 926) // iPhone12 pro max
);
