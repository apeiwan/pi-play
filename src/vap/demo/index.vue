<!--
 * @Author: 伽蓝
 * @Date: 2021-10-15 15:35:23
 * @LastEditTime: 2021-10-20 11:08:10
 * @LastEditors: 伽蓝
 * @FilePath: /pi-play/src/vap/demo/index.vue
 * @Description: 
 * 代码不规范,调试泪两行
-->
<template>
  <demo-section>
    <demo-block title="常规使用">
      <pi-play-vap
        :cover-img="coverImg"
        :vap-url="url"
        :vap-config="vapConfig"
        inline
        @playing="playing"
      />
      <div> 播放回调 {{ count }}</div>
    </demo-block>
  </demo-section>
</template>
<script>
import DemoMixins from '../../../build/demo/mixin';

// const url = require("./open.mp4")

export default {
  mixins: [DemoMixins],
  data(){
    return{
      url:'https://game-play.apeiwan.com/2021/img/test/open.mp4',
      coverImg:'https://game-play.apeiwan.com/2021/img/test/first.png',
      vapConfig:{
        info:{ v:2,f:26,w:634,h:544,fps:20,videoW:640,videoH:1104,aFrame:[0,548,634,544],rgbFrame:[0,0,634,544],isVapx:0,orien:0 }
      },
      count:0
    }
  },
  methods:{
    playing() {
      this.count+=1
    }
  }
};
</script>
