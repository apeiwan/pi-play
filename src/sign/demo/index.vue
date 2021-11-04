<!--
 * @Author: 伽蓝
 * @Date: 2021-10-19 11:30:29
 * @LastEditTime: 2021-10-20 15:11:21
 * @LastEditors: 伽蓝
 * @FilePath: /pi-play/src/sign/demo/index.vue
 * @Description: 
 * 代码不规范,调试泪两行
-->
<template>
  <demo-section>
    <demo-block title="环境验证">
      <van-cell>
        <pi-play-sign
          validate-type="agent"
          @notApp="notApp"
        >
          非App环境拦截下载
        </pi-play-sign>
      </van-cell>
      <van-cell>
        <pi-play-sign validate-type="agent">
          非App环境正常下载
        </pi-play-sign>
      </van-cell>
      <van-cell>
        <pi-play-sign
          validate-type="agent"
          @notApp="app"
        >
          App环境Click
        </pi-play-sign>
      </van-cell>
    </demo-block>
  </demo-section>
</template>
<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  name: 'sign',
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
