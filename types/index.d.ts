/* eslint-disable max-classes-per-file */
import Vue from 'vue';
import { PiPlayComponent } from './component';
import { CountDown } from './count-down';
import { Dialog } from './dialog';
import { List } from './list';
import { Toast } from './toast';
import { Spinner } from './spinner';
import { Webview } from './webview';

export const version: string;

export function install(vue: typeof Vue): void;

export class ActionSheet extends PiPlayComponent {}
export class Button extends PiPlayComponent {}
export class GoodsAction extends PiPlayComponent {}
export class GoodsActionButton extends PiPlayComponent {}
export class Icon extends PiPlayComponent {}
export class Info extends PiPlayComponent {}
export class Loading extends PiPlayComponent {}
export class Overlay extends PiPlayComponent {}
export class Popover extends PiPlayComponent {}
export class Popup extends PiPlayComponent {}
export class PullRefresh extends PiPlayComponent {}
export class Sticky extends PiPlayComponent {}
export class Tag extends PiPlayComponent {}

export {
  CountDown,
  Dialog,
  List,
  Toast,
  Spinner,
  Webview,
};
