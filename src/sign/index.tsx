// Utils
import { CreateElement, RenderContext } from 'vue/types';
import { createNamespace } from '../utils';
import { emit, inherit } from '../utils/functional';

import { EventEmitter } from 'fbemitter';

const emitter = new EventEmitter();

export type ValidateType = 'token' | 'agent' | 'app';


// @ts-ignore
import PPJSBridge from '@apeiwan/ppjsbridge';
import { ScopedSlot, DefaultSlots } from '../utils/types';

export type SignProps = {
  tag: keyof HTMLElementTagNameMap | string;
  disabled?: boolean;
  validateType: ValidateType;
  autoLogin?: boolean;
  webview?: boolean;
  loginAwayClick?: boolean;
};

export type SignEvents = {
  onClick?(event: Event): void;
};

export type SignSlots = DefaultSlots & {
  icon?: ScopedSlot;
  loading?: ScopedSlot;
};

const [createComponent, bem] = createNamespace('sign');

function Sign(
  h: CreateElement,
  props: SignProps,
  slots: SignSlots,
  ctx: RenderContext<SignProps>
) {
  const {
    tag,
    disabled,
    autoLogin,
    validateType,
    webview,
    loginAwayClick
  } = props;

  const style: Record<string, string | number> = {};


  function onClick(event: Event) {
    const isValidateAgent = validateType === 'app' || validateType === 'agent';

    if (!disabled) {
      if (isValidateAgent) {
        if (PPJSBridge.isPiPiApp) {
          emit(ctx, 'click', { event });
        } else {
          const listenersNotApp = ctx.listeners['notApp'];
          if (listenersNotApp) {
            emit(ctx, 'notApp', { event });
          } else {
            window.location.href = 'https://apk.apeiwan.com';
          }
        }
      } else {
        if (!PPJSBridge.isLogin()) {
          const listenersNoLogin = ctx.listeners['noLogin'];
          if (listenersNoLogin) {
            emit(ctx, 'noLogin', { event });
            return;
          }
          if (autoLogin) {
            // 拉起登陆
            PPJSBridge.login((res) => {
              if (res.action === 'success') {
                if (webview) {
                  emitter.emit('PiPlayWebviewThirdLoginSuccess', res.data);
                }
                if (loginAwayClick) {
                  emit(ctx, 'click', { event, app: res.data });
                }
              }
            }, () => {
              // 调用失败，app版本过低
              alert('请先进行登录APP后操作');
            });
          }
        } else {
          emit(ctx, 'click', { event, app: PPJSBridge.getApp() });
        }
      }
    }
  }

  function onTouchstart(event: TouchEvent) {
    emit(ctx, 'touchstart', event);
  }

  const classes = [
    bem([
      {
        disabled
      }
    ])
  ];

  const disableStyle = {
    pointerEvents: disabled ? 'none' : 'default'
  };

  return (
    <tag
      style={{ ...style, ...disableStyle }}
      class={classes}
      disabled={disabled}
      onClick={onClick}
      onTouchstart={onTouchstart}
      {...inherit(ctx)}
    >
      {slots.default ? slots.default() : null}
    </tag>
  );
}

Sign.props = {
  disabled: Boolean,
  webview: Boolean,
  autoLogin: {
    type: Boolean,
    default: true
  },
  loginAwayClick: {
    type: Boolean,
    default: false
  },
  validateType: {
    type: String,
    default: 'app'
  },
  tag: {
    type: String,
    default: 'span'
  }
};

export default createComponent<SignProps, SignEvents, SignSlots>(Sign);
