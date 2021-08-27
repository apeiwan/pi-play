<template>
  <demo-section>
    <demo-block title="按钮类型">
      <div class="demo-button-row">
        <pi-play-button type="primary">
          主要按钮
        </pi-play-button>
        <pi-play-button type="info">
          信息按钮
        </pi-play-button>
        <pi-play-button type="default">
          默认按钮
        </pi-play-button>
      </div>
      <pi-play-button type="danger">
        危险按钮
      </pi-play-button>
      <pi-play-button type="warning">
        警告按钮
      </pi-play-button>
    </demo-block>

    <demo-block title="朴素按钮">
      <pi-play-button
        plain
        type="primary"
        text="朴素按钮"
      />
      <pi-play-button
        plain
        type="info"
        text="朴素按钮"
      />
    </demo-block>

    <demo-block title="细边框">
      <pi-play-button
        plain
        hairline
        type="primary"
        text="细边框"
      />
      <pi-play-button
        plain
        hairline
        type="info"
        text="细边框按钮"
      />
    </demo-block>

    <demo-block title="禁用状态">
      <pi-play-button
        disabled
        type="primary"
        text="禁用状态"
      />
      <pi-play-button
        disabled
        type="info"
        text="禁用状态"
      />
    </demo-block>

    <demo-block title="加载中">
      <pi-play-button
        loading
        type="primary"
      />
      <pi-play-button
        loading
        type="primary"
        loading-type="spinner"
      />
      <pi-play-button
        loading
        loading-text="加载中..."
        type="info"
      />
    </demo-block>

    <demo-block title="按钮形状">
      <pi-play-button
        type="primary"
        square
        text="按钮形状"
      />
      <pi-play-button
        type="info"
        round
        text="圆形按钮"
      />
    </demo-block>

    <demo-block title="图标按钮">
      <pi-play-button
        type="primary"
        icon="plus"
      />
      <pi-play-button
        type="primary"
        icon="plus"
        text="按钮"
      />
      <pi-play-button
        plain
        type="info"
        icon="https://img01.yzcdn.cn/vant/user-active.png"
        text="按钮"
      />
    </demo-block>

    <demo-block title="大小">
      <pi-play-button
        type="primary"
        size="large"
      >
        大号按钮
      </pi-play-button>
      <pi-play-button
        type="primary"
        size="normal"
      >
        普通按钮
      </pi-play-button>
      <pi-play-button
        type="primary"
        size="small"
      >
        小型按钮
      </pi-play-button>
      <pi-play-button
        type="primary"
        size="mini"
      >
        迷你按钮
      </pi-play-button>
    </demo-block>

    <demo-block title="块级元素">
      <pi-play-button
        type="primary"
        block
      >
        块级元素
      </pi-play-button>
    </demo-block>

    <demo-block
      v-if="!isWeapp"
      title="URL 跳转"
    >
      <pi-play-button
        text="URL 跳转"
        type="primary"
        url="/vant/mobile.html"
      />
      <pi-play-button
        text="路由跳转"
        type="primary"
        to="index"
      />
    </demo-block>

    <demo-block title="自定义颜色">
      <pi-play-button
        color="#7232dd"
        text="单色按钮"
      />
      <pi-play-button
        plain
        color="#7232dd"
        text="单色按钮"
      />
      <pi-play-button
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        text="渐变色按钮"
      />
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

.demo-button {
  .pi-play-button {
    &--large {
      margin-bottom: $padding-md;
    }

    &--small,
    &--normal:not(:last-child) {
      margin-right: $padding-md;
    }
  }

  .van-doc-demo-block {
    padding: 0 $padding-md;
  }

  .van-doc-demo-block__title {
    padding-left: 0;
  }

  &-row {
    margin-bottom: $padding-sm;
  }
}
</style>
