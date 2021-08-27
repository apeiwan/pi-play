<template>
  <div
    v-if="show"
    ref="topHead"
    :class="['pi-play-header',{'pi-play-header_fixed':fixed}]"
  >
    <div
      ref="placeholder"
      class="pi-play-header_placeholder"
    />
    <div class="pi-play-header_bd">
      <slot>
        <div
          ref="left"
          :class="['pi-play-header_left']"
        >
          <slot name="left">
            <div
              :style="{backgroundImage:`url(${backImgUrl})`}"
              class="pi-play-header_back"
              @click.prevent="back()"
            />
          </slot>
        </div>
        <div class="pi-play-header_center">
          <slot name="center">
            <p
              v-if="title && (alwaysShowTitle || sticky)"
              class="pi-play-ellipsis"
              :style="titleStyle"
            >
              {{ title }}
            </p>
          </slot>
        </div>
        <div
          ref="right"
          :class="['pi-play-header_right']"
        >
          <slot name="right" />
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import { scrollListener } from '../utils/scrollListener';
import { isPiPiApp, iPhoneX, android } from '../utils/env';
import { hexToRgb } from '../utils/colorChange';
import { createNamespaceStr } from '../utils';
import PPJSBridge from '@apeiwan/ppjsbridge';

const { name } = createNamespaceStr('header');

/* 返回键图片配置 */
const BACK_ICON = {
  white: require('./images/back-white.png'),
  black: require('./images/back-black.png')
};

export default {
  name,
  props: {
    defaultBgColor: {
      type: String,
      default: ''
    },
    scrollBgColor: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: true
    },
    onBack: {
      type: Function,
      default () {

      }
    },
    title: {
      type: String,
      default: ''
    },
    alwaysShowTitle: {
      type: Boolean,
      default: true
    },
    showWebview: {
      type: Boolean,
      default: false
    },
    defaultBackIcon: {
      type: String,
      default: 'black'
    },
    scrollBackIcon: {
      type: String,
      default: 'white'
    },
    defaultTitleColor: {
      type: String,
      default: 'transparent'
    },
    scrollTitleColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      opacity: 0,
      show: false
    };
  },
  computed: {
    sticky () {
      return this.scrollBgOpacityEnable && this.opacity > 0.7;
    },
    scrollBgOpacityEnable () {
      return !!this.scrollBgColor;
    },
    backImgUrl () {
      let icon = BACK_ICON[this.defaultBackIcon] || this.defaultBackIcon;
      if (this.scrollBgOpacityEnable) {
        icon = this.sticky ? BACK_ICON[this.scrollBackIcon] || this.scrollBackIcon : icon;
      }
      return icon;
    },
    titleStyle () {
      let color = this.defaultTitleColor;
      if (this.scrollBgOpacityEnable) {
        if (this.alwaysShowTitle) {
          color = this.alwaysShowTitle;
        } else {
          color = this.sticky ? this.scrollTitleColor : this.defaultTitleColor;
        }
      }
      return {
        color
      };
    },
    scrollBgColorStr () {
      return hexToRgb(this.scrollBgColor).color;
    }
  },
  created () {
    this.init();
  },
  mounted () {
    if (this.showWebview && !isPiPiApp) return;
    this.show = true;
    this.$nextTick(() => {
      this.$topHead = this.$refs.topHead;
      this.opacity = this.scrollBgOpacityEnable ? 0 : 1;
      if (this.defaultBgColor) {
        this.$topHead.style.backgroundColor = this.defaultBgColor;
      }
      if (this.scrollBgOpacityEnable) {
        this.bindHeadScroll();
      }
      if (this.fixed && !this.$slots.center && !this.title) {
        this.$refs.topHead.style.width = '0px';
      }
      this.$emit('load', this.$topHead);
    });
  },
  methods: {
    bindHeadScroll () {
      scrollListener.bind(this.bindHeadScrollHandle, {
        debounce: 0,
        scrollEl: window,
        contentEl: document
      });
    },
    init () {
      let className = 'pi-play-header-iphone';
      if (android) {
        className = 'pi-play-header-android';
      } else if (iPhoneX) {
        className = 'pi-play-header-iphoneX';
      }
      document.getElementsByTagName('html')[0]
        .classList
        .add(className);
    },
    bindHeadScrollHandle ({ scrollTop }) {
      // eslint-disable-next-line no-multi-assign
      const opacity = this.opacity = scrollTop / 100;
      this.$topHead.style.backgroundColor = `rgba(${this.scrollBgColorStr},${opacity})`;
      this.$emit('scroll', {
        scrollTop,
        opacity,
        isTop: opacity > 1
      });
    },
    handleBack () {
      if (isPiPiApp) {
        PPJSBridge.back();
      } else {
        window.history.go(-1);
      }
    },
    back () {
      if (this.onBack) {
        this.onBack();
      } else {
        this.handleBack();
      }
    }
  }
};
</script>
