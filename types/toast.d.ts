import Vue from 'vue';
import { PiPlayPopupMixin } from './mixins/popup';

type ToastMessage = string | number;
type ToastType = 'text' | 'loading' | 'success' | 'fail' | 'html';
type ToastPosition = 'top' | 'middle' | 'bottom';
type ToastLoadingType = 'circular' | 'spinner';

export type ToastOptions = {
  icon?: string;
  type?: ToastType;
  mask?: boolean;
  message?: ToastMessage;
  onClose?: () => void;
  onOpened?: () => void;
  overlay?: boolean;
  duration?: number;
  position?: ToastPosition;
  className?: any;
  transition?: string;
  iconPrefix?: string;
  loadingType?: ToastLoadingType;
  forbidClick?: boolean;
  closeOnClick?: boolean;
  closeOnClickOverlay?: boolean;
  getContainer?: string | (() => Element);
};

export interface PiPlayToast extends Vue, PiPlayPopupMixin {
  type: ToastType;
  position: ToastPosition;
  loadingType: ToastLoadingType;
  forbidClick: boolean;
  message: ToastMessage;
  clear(): void;
}

export interface Toast {
  (message: ToastOptions | ToastMessage, options?: ToastOptions): PiPlayToast;
  loading(options?: ToastOptions | ToastMessage): PiPlayToast;
  success(options?: ToastOptions | ToastMessage): PiPlayToast;
  fail(options?: ToastOptions | ToastMessage): PiPlayToast;
  clear(all?: boolean): void;
  install(): void;
  setDefaultOptions(
    type: ToastType | ToastOptions,
    options?: ToastOptions
  ): void;
  resetDefaultOptions(options?: string): void;
  allowMultiple(allow: boolean): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast;
  }
}

export const Toast: Toast;
