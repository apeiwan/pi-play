import Vue from 'vue';

type pipiAppWebview = {
  isLogin: boolean,
  isAppReady: boolean,
  isPiPiApp: boolean,
  userId: string
};

export type SpinnerOptions = {
  autoReady?: boolean;
  forciblyLogin?: boolean;
  debugConfig?: object;
  onReady?: (pipiAppWebview) => void;
  onNotApp?: (pipiAppWebview) => void;
  onApp?: (pipiAppWebview) => void;
  onLoginSuccess?: (pipiAppWebview) => void;
  onLoginCancel?: (pipiAppWebview) => void;
  onSignAvailable?: (pipiAppWebview) => void;
  onSignUnavailable?: (pipiAppWebview) => void;
};

export interface PiPlayWebview extends Vue {
  autoReady: boolean;
  forciblyLogin: boolean;
  debugConfig: object;

  ready(): void;

  notApp(): void;

  app(): void;

  loginSuccess(): void;

  loginCancel(): void;

  signAvailable(): void;

  signUnavailable(): void;
}

export interface Webview {
  (options?: SpinnerOptions): PiPlayWebview;

  login(): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $webview: Webview;
  }
}

export const PiPlayWebview: Webview;
