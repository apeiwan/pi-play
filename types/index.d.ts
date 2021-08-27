/* eslint-disable max-classes-per-file */
import Vue from 'vue';
import { VanComponent } from './component';
import { CountDown } from './count-down';
import { Dialog } from './dialog';
import { List } from './list';
import { Toast } from './toast';
import { Spinner } from './spinner';
import { Webview } from './webview';

export const version: string;

export function install(vue: typeof Vue): void;

export class ActionSheet extends VanComponent {}
export class Button extends VanComponent {}
export class GoodsAction extends VanComponent {}
export class GoodsActionButton extends VanComponent {}
export class Icon extends VanComponent {}
export class Info extends VanComponent {}
export class Loading extends VanComponent {}
export class Overlay extends VanComponent {}
export class Popover extends VanComponent {}
export class Popup extends VanComponent {}
export class PullRefresh extends VanComponent {}
export class Sticky extends VanComponent {}
export class Tag extends VanComponent {}

export {
  CountDown,
  Dialog,
  List,
  Toast,
  Spinner,
  Webview,
};
