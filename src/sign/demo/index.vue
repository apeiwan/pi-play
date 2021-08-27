<template>
  <demo-section>
    <demo-block title="环境验证">
      <van-cell
      >
        <pi-play-sign validate-type="agent" @notApp="notApp">
          非App环境拦截下载
        </pi-play-sign>
      </van-cell>
      <van-cell
      >
        <pi-play-sign validate-type="agent">
          非App环境正常下载
        </pi-play-sign>
      </van-cell>
      <van-cell
      >
        <pi-play-sign validate-type="agent" @notApp="app">
          App环境Click
        </pi-play-sign>
      </van-cell>
    </demo-block>
  </demo-section>
</template>
<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  name: 'Sign',
  mixins: [DemoMixins],
  methods: {
    app () {
      alert('App环境Click');
    },
    notApp () {
      alert('拦截下载');
    }
  }
};
</script>
