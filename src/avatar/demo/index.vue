<!--
 * @Author: 伽蓝
 * @Date: 2021-10-15 15:35:23
 * @LastEditTime: 2021-10-21 10:04:25
 * @LastEditors: 伽蓝
 * @FilePath: /pi-play/src/avatar/demo/index.vue
 * @Description: 
 * 代码不规范,调试泪两行
-->
<template>
  <demo-section>
    <demo-block title="常规使用">
      <pi-play-avatar
        :data="head1"
        bg-color="red"
        padding-width="10"
      />
    </demo-block>
    <demo-block title="正方形">
      <pi-play-avatar
        :data="head1"
        bg-color="#f3f3f3"
        padding-width="10"
        :round="false"
      />
    </demo-block>
    <demo-block title="自定义">
      <pi-play-avatar
        :data="head1"
        bg-color="#d3d3d3"
        padding-width="10"
      >
        <div
          slot="top"
          class="top"
        >
          <img src="./icon-1.png">
        </div>
        <div
          slot="bottom"
          class="bottom"
        >
          <img src="./icon-10.png">
        </div>
      </pi-play-avatar>
    </demo-block>
  </demo-section>
</template>
<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  mixins: [DemoMixins],
  data(){
    return{
      head1: {
        "roomNo": null,
        "userId": 5419018,
        "headUrl": "https://game-play.oss-cn-hangzhou.aliyuncs.com/app/images/defaultusericon/userpic11.jpg",
      },
      head2: {
        "roomNo": null,
        "userId": 5419018,
        "headUrl": "https://game-play.oss-cn-hangzhou.aliyuncs.com/app/images/defaultusericon/userpic11.jpg",
      },
    }
  },
  methods:{
  }
};
</script>

<style lang="scss" scoped>
.top {
  position: absolute;
  top: -10px;
  left: 4px;
  width: 100%;
  z-index: 10;
  img {
    width: 100%;
  }
}
.bottom {
  position: absolute;
  bottom: -20px;
  z-index: 10;
  img {
    width: 100%;
  }
}
</style>