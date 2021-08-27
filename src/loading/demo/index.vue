<template>
  <demo-section>
    <demo-block title="加载类型">
      <pi-play-loading />
      <pi-play-loading type="spinner" />
    </demo-block>

    <demo-block title="自定义颜色">
      <pi-play-loading color="#1989fa" />
      <pi-play-loading
        type="spinner"
        color="#1989fa"
      />
    </demo-block>

    <demo-block title="自定义大小">
      <pi-play-loading size="24" />
      <pi-play-loading
        type="spinner"
        size="24"
      />
    </demo-block>

    <demo-block title="加载文案">
      <pi-play-loading size="24px">
        加载中
      </pi-play-loading>
    </demo-block>

    <demo-block title="垂直排列">
      <pi-play-loading
        size="24px"
        vertical
      >
        加载中
      </pi-play-loading>
    </demo-block>

    <demo-block title="自定义文本颜色">
      <pi-play-loading
        size="24px"
        vertical
        color="#0094ff"
      >
        加载中
      </pi-play-loading>
      <pi-play-loading
        size="24px"
        vertical
        text-color="#0094ff"
      >
        加载中
      </pi-play-loading>
    </demo-block>
  </demo-section>
</template>

<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
};
</script>

<style lang="scss">
@import '../../style/var';

.demo-loading {
  background: $white;

  .pi-play-loading {
    display: inline-block;
    margin: 5px 0 5px 20px;

    &--vertical {
      display: inline-flex;
    }
  }
}
</style>
