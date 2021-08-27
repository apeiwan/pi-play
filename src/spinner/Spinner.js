// Utils
import { createNamespace, isDef } from '../utils';
import { lockClick } from './lock-click';

// Mixins
import { PopupMixin } from '../mixins/popup';

// Components
import { IMG } from './img';
import { isMobileDevice } from '../utils/validate/mobile';
import { getElement } from '../utils/dom/node';

const [createComponent, bem] = createNamespace('spinner');

export default createComponent({
  mixins: [PopupMixin()],

  props: {
    className: null,
    forbidClick: Boolean,
    closeOnClick: Boolean,
    message: [Number, String],
    type: {
      type: String,
      default: 'indicator'
    },
    styles: {
      type: Object,
      default: null
    },
    position: {
      type: String,
      default: 'middle'
    },
    transition: {
      type: String,
      default: 'pi-play-fade'
    },
    lockScroll: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      clickable: false,
      positionClass: '',
      style: {}
    };
  },

  mounted () {
    this.toggleClickable();
  },

  destroyed () {
    this.toggleClickable();
  },

  watch: {
    value: 'toggleClickable',
    forbidClick: 'toggleClickable'
  },

  computed: {
    messageEnable () {
      return this.type === 'loading';
    }
  },

  methods: {
    calcPoint () {
      const spinnerEl = this.$refs.spinnerEl;
      const position = this.position;
      if (position === 'full-screen') {
        this.style = {
          top: 0,
          bottom: 0
        };
      } else if (position === 'rect-screen') {
        const { top } = spinnerEl.getBoundingClientRect();
        const { height } = isMobileDevice ? window.screen : { height: 640 };
        this.style = {
          top: top + 'px',
          height: (height - top) + 'px'
        };
      } else if (position === 'parent-screen') {
        const parentEl = spinnerEl.parentNode;
        const { top } = parentEl.getBoundingClientRect();
        const height = parentEl.clientHeight;
        this.style = {
          top: top + 'px',
          height: height + 'px'
        };
      } else if (typeof position === 'string') {
        const height = getElement(position);
        this.style = {
          top: top + 'px',
          height: (height - top) + 'px'
        };
      } else if (Object.prototype.toString.call(position) === '[object object]') {
        this.style = { position };
      }
      this.positionClass = 'pi-play-spinner--rect';
    },

    onClick () {
      if (this.closeOnClick) {
        this.close();
      }
    },

    toggleClickable () {
      if (this.value) {
        this.$nextTick(() => {
          this.calcPoint();
        });
      }
      const clickable = this.value && this.forbidClick;

      if (this.clickable !== clickable) {
        this.clickable = clickable;
        lockClick(clickable);
      }
    },

    /* istanbul ignore next */
    onAfterEnter () {
      this.$emit('opened');

      if (this.onOpened) {
        this.onOpened();
      }
    },

    onAfterLeave () {
      this.positionClass = '';
      this.style = {};
      this.$emit('closed');
    },

    genMessage () {
      const { type, message, messageEnable } = this;

      if (!isDef(message) || message === '' || !messageEnable) {
        return;
      }

      if (type === 'html') {
        return <div class={bem('message')} domPropsInnerHTML={message} />;
      }

      return <div class={bem('message')}>{message}</div>;
    }
  },

  render () {
    return (
      <transition
        name={this.transition}
        onAfterEnter={this.onAfterEnter}
        onAfterLeave={this.onAfterLeave}
      >
        <div
          ref="spinnerEl"
          style={{ ...this.styles, ...this.style }}
          vShow={this.value}
          class={[bem(), this.positionClass, this.className]}
          onClick={this.onClick}
        >
          <div class={[`pi-play-spinner__${this.type}-icon`, { 'pi-play-spinner--text': this.messageEnable }]}
               style={{ backgroundImage: `url(${IMG[this.type]})` }}>
            {this.genMessage()}
          </div>
        </div>
      </transition>
    );
  }
});
