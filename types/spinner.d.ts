import Vue from 'vue';
import { PiPlayPopupMixin } from './mixins/popup';

type SignMessage = string | number;
type SignType = 'indicator' | 'loading';
type SignPosition = 'rect-screen' | 'parent-screen' | 'full-screen' | HTMLElement | string;

export type SignOptions = {
  type?: SignType;
  mask?: boolean;
  message?: SignMessage;
  onClose?: () => void;
  onOpened?: () => void;
  overlay?: boolean;
  duration?: number;
  position?: SignPosition;
  className?: any;
  transition?: string;
  forbidClick?: boolean;
  closeOnClick?: boolean;
  closeOnClickOverlay?: boolean;
  getContainer?: string | (() => Element);
};

export interface PiPlaySign extends Vue, PiPlayPopupMixin {
  type: SignType;
  position: SignPosition;
  forbidClick: boolean;
  message: SignMessage;
  clear(): void;
}

export interface Sign {
  (message: SignOptions | SignMessage, options?: SignOptions): PiPlaySign;
  loading(options?: SignOptions | SignMessage): PiPlaySign;
  indicator(options?: SignOptions | SignMessage): PiPlaySign;
  clear(all?: boolean): void;
  install(): void;
  setDefaultOptions(
    type: SignType | SignOptions,
    options?: SignOptions
  ): void;
  resetDefaultOptions(options?: string): void;
  allowMultiple(allow: boolean): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $spinner: Sign;
  }
}

export const Sign: Sign;
