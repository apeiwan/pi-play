<template>
  <demo-section name="pull-refresh">
    <van-tabs>
      <van-tab title="基础用法">
        <pi-play-pull-refresh
          v-model="isLoading"
          @refresh="onRefresh(true)"
        >
          <p>{{ tips }}</p>
        </pi-play-pull-refresh>
      </van-tab>

      <van-tab title="成功提示">
        <pi-play-pull-refresh
          v-model="isLoading"
          success-text="刷新成功"
          @refresh="onRefresh(false)"
        >
          <p>{{ tips }}</p>
        </pi-play-pull-refresh>
      </van-tab>

      <van-tab title="自定义提示">
        <pi-play-pull-refresh
          v-model="isLoading"
          head-height="80"
          @refresh="onRefresh(true)"
        >
          <template #pulling="{ distance }">
            <img
              class="doge"
              src="https://b.yzcdn.cn/vant/doge.png"
              :style="{ transform: `scale(${distance / 80})` }"
            >
          </template>
          <template #loosing>
            <img
              src="https://b.yzcdn.cn/vant/doge.png"
              class="doge"
            >
          </template>
          <template #loading>
            <img
              src="https://b.yzcdn.cn/vant/doge-fire.jpg"
              class="doge"
            >
          </template>
          <p>{{ tips }}</p>
        </pi-play-pull-refresh>
      </van-tab>
    </van-tabs>
  </demo-section>
</template>

<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  data() {
    return {
      count: 0,
      isLoading: false,
    };
  },

  computed: {
    tips() {
      if (this.count) {
        return `刷新次数: ${this.count}`;
      }

      return '下拉试试';
    },
  },

  mounted() {
    this.preloadImage();
  },

  methods: {
    preloadImage() {
      // preload doge image
      const doge = new Image();
      const dogeFire = new Image();

      doge.src = 'https://b.yzcdn.cn/vant/doge.png';
      dogeFire.src = 'https://b.yzcdn.cn/vant/doge-fire.jpg';
    },

    onRefresh(showToast) {
      setTimeout(() => {
        if (showToast) {
          this.$toast('刷新成功');
        }

        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
@import '../../style/var';

.demo-pull-refresh {
  background-color: $white;

  .pi-play-pull-refresh {
    height: calc(100vh - 50px);
  }

  .doge {
    width: 140px;
    height: 72px;
    margin-top: 8px;
    border-radius: 4px;
  }

  p {
    margin: 0;
    padding: $padding-md 0 0 $padding-md;
  }
}
</style>
