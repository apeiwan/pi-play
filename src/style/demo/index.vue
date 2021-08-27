<template>
  <demo-section>
    <demo-block title="文字省略">
      <div class="pi-ellipsis">
        这是一段最多显示一行的文字，后面的内容会省略
      </div>
      <div class="pi-multi-ellipsis--l2">
        这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略
      </div>
    </demo-block>

    <demo-block
      card
      title="文字省略"
    >
      <div class="pi-hairline--top" />
    </demo-block>

    <demo-block
      card
      title="动画"
    >
      <van-cell
        is-link
        title="Fade"
        @click="animate('pi-play-fade')"
      />
      <van-cell
        is-link
        title="Slide Up"
        @click="animate('pi-slide-up')"
      />
      <van-cell
        is-link
        title="Slide Down"
        @click="animate('pi-slide-down')"
      />
      <van-cell
        is-link
        title="Slide Left"
        @click="animate('pi-slide-left')"
      />
      <van-cell
        is-link
        title="Slide Right"
        @click="animate('pi-slide-right')"
      />
    </demo-block>

    <transition :name="transitionName">
      <div
        v-show="show"
        class="demo-animate-block"
      />
    </transition>
  </demo-section>
</template>

<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  data() {
    return {
      show: false,
      transitionName: '',
    };
  },

  methods: {
    animate(transitionName) {
      this.show = true;
      this.transitionName = transitionName;

      setTimeout(() => {
        this.show = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss">
@import '../../style/var';

.demo-style {
  .pi-play-ellipsis,
  .pi-play-multi-ellipsis--l2 {
    max-width: 300px;
    margin-left: $padding-md;
    font-size: 14px;
    line-height: 18px;
  }

  .pi-play-ellipsis {
    margin-bottom: $padding-md;
  }

  .pi-play-hairline--top {
    height: 30px;
    background-color: $white;

    &::after {
      top: 5px;
    }
  }

  .demo-animate-block {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
    background-color: $blue;
    border-radius: 8px;
  }
}
</style>
