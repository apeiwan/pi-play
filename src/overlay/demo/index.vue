<template>
  <demo-section>
    <demo-block title="基本用法">
      <pi-play-button
        type="primary"
        text="显示遮罩层"
        style="margin-left: 16px;"
        @click="show = true"
      />

      <pi-play-overlay
        :show="show"
        @click="show = false"
      />
    </demo-block>

    <demo-block title="嵌入内容">
      <pi-play-button
        type="primary"
        text="嵌入内容"
        style="margin-left: 16px;"
        @click="showEmbedded = true"
      />

      <pi-play-overlay
        :show="showEmbedded"
        @click="showEmbedded = false"
      >
        <div class="wrapper">
          <div class="block" />
        </div>
      </pi-play-overlay>
    </demo-block>
  </demo-section>
</template>

<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  data() {
    return {
      show: false,
      showEmbedded: false,
    };
  },
};
</script>

<style lang="scss">
@import '../../style/var';

.demo-overlay {
  background: $white;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: $white;
  }
}
</style>
