<template>
  <demo-section>
    <demo-block
      card
      title="基础用法"
    >
      <van-cell
        is-link
        title="基础用法"
        @click="show.basic = true"
      />
      <van-cell
        is-link
        title="展示取消按钮"
        @click="show.cancel = true"
      />
      <van-cell
        is-link
        title="展示描述信息"
        @click="show.description = true"
      />
    </demo-block>

    <demo-block
      card
      title="选项状态"
    >
      <van-cell
        is-link
        title="选项状态"
        @click="show.status = true"
      />
    </demo-block>

    <demo-block
      card
      title="自定义面板"
    >
      <van-cell
        is-link
        title="自定义面板"
        @click="show.title = true"
      />
    </demo-block>

    <pi-play-action-sheet
      v-model="show.basic"
      :actions="simpleActions"
      @select="onSelect"
    />

    <pi-play-action-sheet
      v-model="show.cancel"
      :actions="simpleActions"
      close-on-click-action
      cancel-text="取消"
      @cancel="onCancel"
    />

    <pi-play-action-sheet
      v-model="show.description"
      :actions="actionsWithDescription"
      close-on-click-action
      cancel-text="取消"
      description="这是一段描述信息"
    />

    <pi-play-action-sheet
      v-model="show.status"
      close-on-click-action
      :actions="statusActions"
      cancel-text="取消"
    />

    <pi-play-action-sheet
      v-model="show.title"
      title="标题"
    >
      <div class="demo-action-sheet-content">
        内容
      </div>
    </pi-play-action-sheet>
  </demo-section>
</template>

<script>
import { RED } from '../../utils/constant';
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  data() {
    return {
      show: {
        basic: false,
        cancel: false,
        title: false,
        status: false,
        description: false,
      },
    };
  },

  computed: {
    simpleActions() {
      return [
        { name: '选项一' },
        { name: '选项二' },
        { name: '选项三' },
      ];
    },

    actionsWithDescription() {
      return [
        { name: '选项一' },
        { name: '选项二' },
        { name: '选项三', subname: '描述信息' },
      ];
    },

    statusActions() {
      return [
        { name: '着色选项', color: RED },
        { name: '禁用选项', disabled: true },
        { loading: true },
      ];
    },
  },

  methods: {
    onSelect(item) {
      this.show.basic = false;
      this.$toast(item.name);
    },

    onCancel() {
      this.$toast('取消');
    },
  },
};
</script>

<style lang="scss">
@import '../../style/var';

.demo-action-sheet {
  &-content {
    padding: $padding-md $padding-md $padding-md * 10;
  }
}
</style>
