<template>
  <demo-section>
    <demo-block
      card
      title="基础用法"
    >
      <van-cell
        is-link
        title="文字提示"
        @click="$toast({duration:100000,message:'hello'})"
      />
      <van-cell
        is-link
        title="加载提示"
        @click="showLoadingToast()"
      />
      <van-cell
        is-link
        title="成功提示"
        @click="showSuccessToast"
      />
      <van-cell
        is-link
        title="失败提示"
        @click="showFailToast"
      />
    </demo-block>

    <demo-block
      v-if="!isWeapp"
      card
      title="自定义图标"
    >
      <van-cell
        is-link
        title="自定义图标"
        @click="showIconToast"
      />
      <van-cell
        is-link
        title="自定义图片"
        @click="showImageToast"
      />
      <van-cell
        is-link
        title="loading类型"
        @click="showLoadingToast('spinner')"
      />
    </demo-block>

    <demo-block
      v-if="!isWeapp"
      card
      title="自定义位置"
    >
      <van-cell
        is-link
        title="顶部展示"
        @click="showTopToast"
      />
      <van-cell
        is-link
        title="底部展示"
        @click="showBottomToast"
      />
    </demo-block>

    <demo-block
      card
      title="动态更新提示"
    >
      <van-cell
        is-link
        title="动态更新提示"
        @click="showCustomizedToast"
      />
    </demo-block>
  </demo-section>
</template>

<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  methods: {
    showLoadingToast(loadingType) {
      this.$toast.loading({
        forbidClick: true,
        message: '加载中',
        loadingType,
      });
    },

    showSuccessToast() {
      this.$toast.success('成功文案');
    },

    showFailToast() {
      this.$toast.fail({
        forbidClick: true,
        duration:0,
        message: '加载中',
      });
    },

    showTopToast() {
      this.$toast({
        message: '顶部展示',
        position: 'top',
      });
    },

    showBottomToast() {
      this.$toast({
        message: '底部展示',
        position: 'bottom',
      });
    },

    showIconToast() {
      this.$toast({
        message: '自定义图标',
        icon: 'like-o',
      });
    },

    showImageToast() {
      this.$toast({
        message: '自定义图片',
        icon: 'https://img01.yzcdn.cn/vant/logo.png',
      });
    },

    showCustomizedToast() {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '倒计时 3 秒',
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = `倒计时 ${second} 秒`;
        } else {
          clearInterval(timer);
          this.$toast.clear();
        }
      }, 1000);
    },
  },
};
</script>
