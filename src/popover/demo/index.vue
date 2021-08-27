<template>
  <demo-section>
    <demo-block title="基础用法">
      <pi-play-popover
        v-model="show.lightTheme"
        trigger="click"
        :actions="actions"
        placement="bottom-start"
        style="margin-left: 16px;"
        @select="onSelect"
      >
        <template #reference>
          <pi-play-button type="primary">
            浅色风格
          </pi-play-button>
        </template>
      </pi-play-popover>
      <pi-play-popover
        v-model="show.darkTheme"
        theme="dark"
        trigger="click"
        :actions="actions"
        style="margin-left: 16px;"
        @select="onSelect"
      >
        <template #reference>
          <pi-play-button type="primary">
            深色风格
          </pi-play-button>
        </template>
      </pi-play-popover>
    </demo-block>

    <demo-block title="弹出位置">
      <van-field
        is-link
        readonly
        name="picker"
        label="选择弹出位置"
        @click="showPicker = true"
      />

      <pi-play-popup
        v-model="showPicker"
        round
        position="bottom"
        get-container="body"
      >
        <div class="demo-popover-box">
          <pi-play-popover
            v-model="show.placement"
            theme="dark"
            trigger="click"
            :actions="shortActions"
            :placement="currentPlacement"
            @select="onSelect"
          >
            <template #reference>
              <div class="demo-popover-refer" />
            </template>
          </pi-play-popover>
        </div>
        <van-picker
          :columns="placements"
          @change="onPickerChange"
        />
      </pi-play-popup>
    </demo-block>

    <demo-block title="选项配置">
      <pi-play-popover
        v-model="show.showIcon"
        trigger="click"
        :actions="actionsWithIcon"
        placement="bottom-start"
        style="margin-left: 16px;"
        @select="onSelect"
      >
        <template #reference>
          <pi-play-button type="primary">
            展示图标
          </pi-play-button>
        </template>
      </pi-play-popover>

      <pi-play-popover
        v-model="show.disableAction"
        trigger="click"
        :actions="statusActions"
        style="margin-left: 16px;"
        @select="onSelect"
      >
        <template #reference>
          <pi-play-button type="primary">
            禁用选项
          </pi-play-button>
        </template>
      </pi-play-popover>
    </demo-block>

    <demo-block title="自定义内容">
      <pi-play-popover
        v-model="show.customContent"
        trigger="click"
        placement="top-start"
        style="margin-left: 16px;"
        @select="onSelect"
      >
        <van-grid
          square
          clickable
          :border="false"
          column-num="3"
          style="width: 240px;"
        >
          <van-grid-item
            v-for="i in 6"
            :key="i"
            icon="photo-o"
            text="选项"
            @click="show.customContent = false"
          />
        </van-grid>
        <template #reference>
          <pi-play-button type="primary">
            自定义内容
          </pi-play-button>
        </template>
      </pi-play-popover>
    </demo-block>
  </demo-section>
</template>

<script>
import { RED } from '../../utils/constant';
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  data() {
    return {
      shortActions: [
        { text: '选项一' },
        { text: '选项二' },
      ],
      actions: [
        { text: '选项一' },
        { text: '选项二' },
        { text: '选项三' },
      ],
      actionsWithIcon: [
        {
          text: '选项一',
          icon: 'add-o',
        },
        {
          text: '选项二',
          icon: 'music-o',
        },
        {
          text: '选项三',
          icon: 'more-o',
        },
      ],
      statusActions: [
        {
          name: '着色选项',
          color: RED,
        },
        {
          name: '禁用选项',
          disabled: true,
        },
        { loading: true },
      ],
      show: {
        showIcon: false,
        placement: false,
        darkTheme: false,
        lightTheme: false,
        customContent: false,
        disableAction: false,
      },
      showPicker: false,
      currentPlacement: 'top',
      placements: [
        'top',
        'top-start',
        'top-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
      ],
    };
  },

  methods: {
    onPickerChange(picker, value) {
      setTimeout(() => {
        this.show.placement = true;
        this.currentPlacement = value;
      });
    },
    onSelect(action) {
      this.$toast(action.text);
    },
  },
};
</script>

<style lang="scss">
@import '../../style/var';

.demo-popover {
  &-refer {
    width: 60px;
    height: 60px;
    background-color: $blue;
    border-radius: 8px;
  }

  .van-field {
    width: auto;
    margin: 0 12px;
    overflow: hidden;
    border-radius: 8px;
  }

  &-box {
    display: flex;
    justify-content: center;
    margin: 110px 0;
  }
}
</style>
