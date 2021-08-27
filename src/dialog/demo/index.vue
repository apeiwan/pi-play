<template>
  <demo-section>
    <demo-block
      card
      title="基础用法"
    >
      <van-cell
        is-link
        title="提示弹窗"
        @click="onClickAlert"
      />
      <van-cell
        is-link
        title="提示弹窗（无标题）"
        @click="onClickAlert2"
      />
      <van-cell
        is-link
        title="确认弹窗"
        @click="onClickConfirm"
      />
    </demo-block>

    <demo-block
      card
      title="圆角按钮"
    >
      <van-cell
        is-link
        title="提示弹窗"
        @click="onClickRound"
      />
      <van-cell
        is-link
        title="提示弹窗（无标题）"
        @click="onClickRound2"
      />
    </demo-block>

    <demo-block
      card
      title="异步关闭"
    >
      <van-cell
        is-link
        title="异步关闭"
        @click="onClickAsyncClose"
      />
    </demo-block>

    <demo-block
      card
      title="组件调用"
    >
      <van-cell
        is-link
        title="组件调用"
        @click="show = true"
      />
      <pi-play-dialog
        v-model="show"
        title="标题"
        show-cancel-button
        :lazy-render="false"
      >
        <img :src="image">
      </pi-play-dialog>
    </demo-block>
  </demo-section>
</template>

<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  data() {
    return {
      show: false,
      currentRate: 0,
      image: 'https://img01.yzcdn.cn/vant/apple-3.jpg',
    };
  },

  methods: {
    onClickAlert() {
      this.$dialog.alert({
        title: '标题',
        message: '内容',
      });
    },

    onClickAlert2() {
      this.$dialog.alert({
        message: '内容',
      });
    },

    onClickRound() {
      this.$dialog.alert({
        theme: 'round-button',
        title: '标题',
        message: '内容',
      });
    },

    onClickRound2() {
      this.$dialog.alert({
        theme: 'round-button',
        message: '内容',
      });
    },

    onClickConfirm() {
      this.$dialog.confirm({
        title: '标题',
        message: '内容',
      });
    },

    onClickAsyncClose() {
      function beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      }

      this.$dialog.confirm({
        title: '标题',
        message: '内容',
        beforeClose,
      });
    },
  },
};
</script>

<style lang="scss">
@import '../../style/var';

.demo-dialog {
  img {
    box-sizing: border-box;
    width: 100%;
    padding: 25px 20px 0;
  }
}
</style>
