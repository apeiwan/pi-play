import { createNamespace, isDef } from '../utils';
import { PopupMixin } from '../mixins/popup';

const [createComponent, bem] = createNamespace('popup');

export default createComponent({
  mixins: [PopupMixin()],

  props: {
    round: Boolean,
    duration: [
      Number,
      String,
    ],
    closeable: Boolean,
    transition: String,
    safeAreaInsetBottom: Boolean,
    position: {
      type: String,
      default: 'center',
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
  },

  beforeCreate() {
    const createEmitter = (eventName) => (event) => this.$emit(eventName, event);

    this.onClick = createEmitter('click');
    this.onOpened = createEmitter('opened');
    this.onClosed = createEmitter('closed');
  },

  render() {
    if (!this.shouldRender) {
      return;
    }

    const {
      round,
      position,
      duration,
    } = this;
    const isCenter = position === 'center';

    const transitionName = this.transition
      || (isCenter ? 'pi-play-fade' : `pi-play-popup-slide-${position}`);

    const style = {};
    if (isDef(duration)) {
      const key = isCenter ? 'animationDuration' : 'transitionDuration';
      style[key] = `${duration}s`;
    }

    return (
      <transition
        appear={ this.transitionAppear }
        name={ transitionName }
        onAfterEnter={ this.onOpened }
        onAfterLeave={ this.onClosed }
      >
        <div
          vShow={ this.value }
          style={ style }
          class={ bem({
            round,
            [position]: position,
            'safe-area-inset-bottom': this.safeAreaInsetBottom,
          }) }
          onClick={ this.onClick }
        >
          { this.slots() }
        </div>
      </transition>
    );
  },
});
