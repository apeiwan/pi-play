<template>
  <demo-section>
    <demo-block title="基础用法">
      <pi-play-count-down :time="time" />
    </demo-block>

    <demo-block title="自定义格式">
      <pi-play-count-down
        :time="time"
        format="DD 天 HH 时 mm 分 ss 秒"
      />
    </demo-block>

    <demo-block title="毫秒级渲染">
      <pi-play-count-down
        millisecond
        :time="time"
        format="HH:mm:ss:SS"
      />
    </demo-block>

    <demo-block title="自定义格式">
      <pi-play-count-down :time="time">
        <template #default="currentTime">
          <span class="block">{{ currentTime.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ currentTime.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ currentTime.seconds }}</span>
        </template>
      </pi-play-count-down>
    </demo-block>

    <demo-block title="手动控制">
      <pi-play-count-down
        ref="countDown"
        millisecond
        :time="3000"
        :auto-start="false"
        format="ss:SSS"
        @finish="$toast('倒计时结束')"
      />
      <van-grid
        clickable
        :column-num="3"
      >
        <van-grid-item
          icon="play-circle-o"
          text="开始"
          @click="start"
        />
        <van-grid-item
          icon="pause-circle-o"
          text="暂停"
          @click="pause"
        />
        <van-grid-item
          icon="replay"
          text="重置"
          @click="reset"
        />
      </van-grid>
    </demo-block>
  </demo-section>
</template>

<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  data() {
    return {
      time: 30 * 60 * 60 * 1000,
    };
  },

  methods: {
    start() {
      this.$refs.countDown.start();
    },

    pause() {
      this.$refs.countDown.pause();
    },

    reset() {
      this.$refs.countDown.reset();
    },
  },
};
</script>

<style lang="scss">
@import '../../style/var';

.demo-count-down {
  background-color: $white;

  .pi-play-count-down {
    margin-left: $padding-md;
  }

  .colon {
    display: inline-block;
    margin: 0 4px;
    color: $red;
  }

  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: $red;
    border-radius: 4px;
  }

  .van-grid {
    margin-top: 10px;
  }
}
</style>
