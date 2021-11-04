<template>
  <div
    :style="layout"
    class="pi-play-avatar"
  >
    <slot name="top" />
    <div
      :style="{...layout,...borderStyle}"
      :class="['body',{round}] "
    >
      <slot
        v-if="$slots.content"
        name="content"
        @click.self="onclick"
      />
      <img
        v-else
        :src="data.headUrl"
        @click.self="onclick"
      >
    </div>
    <slot name="bottom" />
  </div>
</template>
<script>
import px2vw from '../utils/px2vw';
import {  createNamespaceStr } from '../utils';
// @ts-ignore
import PPJSBridge from '@apeiwan/ppjsbridge';

const { name } = createNamespaceStr('avatar');
export default {
  name,
  props: {
    data: {
      type: Object,
      required: true
    },
    size: {
      type: [String, Number],
      default:100
    },
    paddingWidth: {
      type: [String, Number],
      default: 0
    },
    bgColor:{
      type: String,
      default:'transparent'
    },
    round:{
      type: Boolean,
      default: true
    },
    props:{
      type: Object,
      default(){
        return{
          head:'headUrl',
          room:'roomNo',
          userId:'userId'
        }
      }
    },
  },
  data() {
    return {
    };

  },
  computed: {
    layout() {
      return {
        width: px2vw(this.size),
        height: px2vw(this.size),
      };
    },
    borderStyle(){
      return {
        background:this.bgColor,
        padding:px2vw(this.paddingWidth),
      };
    }
  },
  methods: {
    onclick() {
      if(PPJSBridge.isPiPiApp){
        if (!PPJSBridge.isLogin()) PPJSBridge.login();
        const {room}=this.props
        // 在直播就去直播间
        if (this.data[room]) return this.livePage();
        // 不在就去个人页
        if (!this.data[room]) return this.userPage();
      }else{
        console.log('非App环境');
      }
    },
    livePage(){
      const {room}=this.props
      const url = PPJSBridge.isCanIUse('1.7.3') ? `roomNo=${this.data[room]}` : this.data[room];
      const android = `RoomDetailActivity_PaiDan?${url}`;
      const options = {
        ios: `KHChatRoomViewController?roomNo=${this.data[room]}`,
        android
      };
      PPJSBridge.openWindow(options);
    },
    userPage(){
      const {userId}=this.props
      PPJSBridge.openWindow({
        android: '/khpw/UserDetailActivity',
        ios: 'KHCardViewController',
        query: {
          '[ios:userId,android:uid]': this.data[userId]
        }
      })
    },
    pause() {
      this.$emit('pause');
    },
  },
};
</script>

<style lang="scss" scoped>
.pi-play-avatar {
  position: relative;
  left: 0;
  top: 0;
  .body {
    position: absolute;
    top: 0;
    left: 0;
    &.round {
      border-radius: 200vw;
      overflow: hidden;
      img {
        border-radius: 200vw;
      }
    }
    img {
      width: 100%;
      color: transparent;
    }
  }
}
</style>