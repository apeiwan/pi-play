<template>
  <demo-section>
    <demo-block title="基础用法">
      <pi-play-header
        default-title-color="#333"
        :fixed="false"
        default-bg-color="#fff"
        title="我是标题"
      />
    </demo-block>
    <demo-block title="顶部透明，仅返回键">
      <pi-play-header :fixed="false" />
    </demo-block>
  </demo-section>
</template>
<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
};
</script>
