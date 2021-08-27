import PPJSBridge from '@apeiwan/ppjsbridge';
import { createNamespace } from '../utils';
import pageVisibility from '../mixins/page.visibility';
import { EVENT_NAME, EVENT_FORMAT_NAME, emitter } from './utils';

const [createComponent, bem] = createNamespace('webview');

function nullFun () {

}

let isPiPiApp = PPJSBridge.isPiPiApp;

export default createComponent({
  mixins: [pageVisibility],

  props: {
    autoReady: {
      type: Boolean,
      default: true
    },
    debugConfig: {
      type: Object,
      default: null
    },
    forciblyLogin: {
      type: Boolean,
      default: false
    },
    onReady: {
      type: Function,
      default: nullFun
    },
    onNotApp: {
      type: Function,
      default: nullFun
    },
    onApp: {
      type: Function,
      default: nullFun
    },
    onLoginSuccess: {
      type: Function,
      default: nullFun
    },
    onLoginCancel: {
      type: Function,
      default: nullFun
    },
    onSignAvailable: {
      type: Function,
      default: nullFun
    },
    onSignUnavailable: {
      type: Function,
      default: nullFun
    }
  },

  data () {
    return {
      pipiAppWebview: {
        isLogin: false,
        isAppReady: false,
        isPiPiApp,
        userId: ''
      },
      PIPLAYWEBVIEWINIT: false
    };
  },

  computed: {
    isReady () {
      return this.PIPLAYWEBVIEWINIT && this.autoReady;
    }
  },

  watch: {
    isReady: {
      handler: function(val) {
        val && this.init();
      },
      immediate: true
    }
  },

  created () {
    emitter.addListener('PiPlayWebviewOpenLogin', data => {
      this.openAppLogin();
    });
    emitter.addListener('PiPlayWebviewThirdLoginSuccess', data => {
      this.readyNext();
    });
    this.PIPLAYWEBVIEWINIT = true;
  },

  methods: {
    init () {
      // 支持 debug 环境，如果是在真实的app环境，比如location页面放在app,此处也不生效
      if (process.env.NODE_ENV === 'development') {
        const AppDebugFile = this.debugConfig || (this.$PIPAY || {}).webviewDebugConfig;
        if (AppDebugFile) {
          const { BROWSER_DEBUG_APP_WEBVIEW, TOKEN } = AppDebugFile;
          isPiPiApp = BROWSER_DEBUG_APP_WEBVIEW;
          if (BROWSER_DEBUG_APP_WEBVIEW) {
            sessionStorage.setToken('token', TOKEN);
          } else {
            sessionStorage.removeItem('token');
          }
        }
      }
      if (isPiPiApp) {
        this.emitFunc(EVENT_NAME.onApp);
        this.autoReady && this.initAppReady();
      } else {
        this.emitFunc(EVENT_NAME.onNotApp);
      }
    },
    pageShow () {
      this.isAskPullLoginEmit();
    },
    isAskPullLoginEmit () {
      if (this.isOpenAppLoginWindow) {
        setTimeout(() => {
          if (!this.pipiAppWebview.isAppLogin) {
            this.emitFunc(EVENT_NAME.onLoginCancel);
          }
        }, 1000);
      }
    },
    openAppLogin () {
      this.isOpenAppLoginWindow = true;
      PPJSBridge.login((res) => {
        if (res.action === 'success') {
          this.emitFunc(EVENT_NAME.onLoginSuccess);
          this.readyNext();
        }
      }, () => {
        // 调用失败，app版本过低
        alert('请先进行登录APP后操作');
      });
    },
    initAppReady (val) {
      PPJSBridge.ready(() => {
        this.readyHandle();
      });
    },
    readyHandle () {
      this.pipiAppWebview.isAppReady = true;
      this.emitFunc(EVENT_NAME.onReady);
      this.readyNext();
    },
    readyNext () {
      if (isAppLogin) {
        this.pipiAppWebview.userId = PPJSBridge.getToken().split('#')[1];
      }
      const isAppLogin = this.pipiAppWebview.isAppLogin = !!PPJSBridge.getToken();
      this.emitFunc(isAppLogin ? EVENT_NAME.onSignAvailable : EVENT_NAME.onSignUnavailable);
      if (this.forciblyLogin && !isAppLogin) {
        this.openAppLogin();
      }
    },
    emitFunc (name) {
      // 如果是引入了 mixin 则不触发事件监听,防止页面事件重复监听
      if (!this.$parent.PIPIPLAYWEBVIEWMIXIN) {
        emitter.emit(EVENT_FORMAT_NAME(name), this.webview);
      }
      const propsFuncName = `on${name.substr(0, 1).toUpperCase()}${name.substring(1).toUpperCase()}`;
      this[propsFuncName] && this[propsFuncName](this.pipiAppWebview);
      this.$emit(name, this.pipiAppWebview);
    }
  },

  render () {
    return this.$slots.default || null;
  }
});
