<template>
  <demo-section>
    <demo-block title="基础用法">
      <pi-play-sticky>
        <pi-play-button
          type="primary"
          style="margin-left: 15px;"
        >
          基础用法
        </pi-play-button>
      </pi-play-sticky>
    </demo-block>

    <demo-block title="吸顶距离">
      <pi-play-sticky :offset-top="50">
        <pi-play-button
          type="info"
          style="margin-left: 115px;"
        >
          吸顶距离
        </pi-play-button>
      </pi-play-sticky>
    </demo-block>

    <demo-block
      v-if="!isWeapp"
      title="指定容器"
    >
      <div
        ref="container"
        style="height: 150px; background-color: #fff;"
      >
        <pi-play-sticky :container="container">
          <pi-play-button
            type="warning"
            style="margin-left: 215px;"
          >
            指定容器
          </pi-play-button>
        </pi-play-sticky>
      </div>
    </demo-block>
  </demo-section>
</template>

<script>

import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  data() {
    return {
      container: null,
    };
  },

  mounted() {
    this.container = this.$refs.container;
  },
};
</script>

<style lang="scss">
@import '../../style/var';

.demo-sticky {
  height: 200vh;

  .pi-play-button {
    margin-left: $padding-md;
  }
}
</style>
