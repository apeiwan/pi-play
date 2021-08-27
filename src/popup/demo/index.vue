<template>
  <demo-section>
    <demo-block
      card
      title="基础用法"
    >
      <van-cell
        title="基础用法"
        is-link
        @click="showBasic = true"
      />
      <pi-play-popup
        v-model="showBasic"
        :style="{ padding: '30px 50px' }"
      >
        内容
      </pi-play-popup>
    </demo-block>

    <demo-block
      card
      title="弹出位置"
    >
      <van-cell
        title="顶部弹出"
        is-link
        @click="showTop = true"
      />
      <van-cell
        title="底部弹出"
        is-link
        @click="showBottom = true"
      />
      <van-cell
        title="左侧弹出"
        is-link
        @click="showLeft = true"
      />
      <van-cell
        title="右侧弹出"
        is-link
        @click="showRight = true"
      />

      <pi-play-popup
        v-model="showTop"
        position="top"
        :style="{ height: '30%' }"
      />
      <pi-play-popup
        v-model="showBottom"
        position="bottom"
        :style="{ height: '30%' }"
      />
      <pi-play-popup
        v-model="showLeft"
        position="left"
        :style="{ width: '30%', height: '100%' }"
      />
      <pi-play-popup
        v-model="showRight"
        position="right"
        :style="{ width: '30%', height: '100%' }"
      />
    </demo-block>

    <demo-block
      card
      title="圆角弹窗"
    >
      <van-cell
        title="圆角弹窗"
        is-link
        @click="showRoundCorner = true"
      />
      <pi-play-popup
        v-model="showRoundCorner"
        round
        position="bottom"
        :style="{ height: '30%' }"
      />
    </demo-block>

    <demo-block
      v-if="!isWeapp"
      card
      title="指定挂载节点"
    >
      <van-cell
        title="指定挂载节点"
        is-link
        @click="showGetContainer = true"
      />
      <pi-play-popup
        v-model="showGetContainer"
        get-container="body"
        :style="{ padding: '30px 50px' }"
      />
    </demo-block>
  </demo-section>
</template>

<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  data() {
    return {
      showBasic: false,
      showTop: false,
      showBottom: false,
      showLeft: false,
      showRight: false,
      showCloseIcon: false,
      showRoundCorner: false,
      showGetContainer: false,
      showCustomCloseIcon: false,
      showCustomIconPosition: false,
    };
  },
};
</script>

<style lang="scss">
@import '../../style/var';

.demo-popup {
  .van-row {
    margin-bottom: $padding-md;
  }

  .van-button {
    margin-left: $padding-md;
  }
}
</style>
