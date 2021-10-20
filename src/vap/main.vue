<template>
  <div
    :style="{...layout}"
    class="pi-vap-wrap"
  >
    <div
      ref="bg"
      :style="{...layout,...bgImg}"
      class="bg"
    />
    <div
      :id="id"
      class="vap-wrap"
    />
  </div>
</template>
<script>
import px2vw from '../utils/px2vw';
import { getUUID , createNamespaceStr } from '../utils';

const { name } = createNamespaceStr('vap');
export default {
  name,
  props: {
    loop: {
      type: Boolean,
      default: true,
    },
    coverImg: {
      type: String,
      default:''
    },
    vapUrl: {
      type: String,
      required: true,
    },
    vapConfig: {
      type: Object,
      required: true,
    },
    // inline:{
    //   type: Boolean,
    //   default:false,
    // }
  },
  data() {
    return {
      vapPlayStatus: '',
      vapPlayer: null,
      id: getUUID(),
      isPlyaFail:false // 播放是否失败
    };
  },
  computed: {
    layout() {
      const { w, h } = this.vapConfig.info;
      return {
        width: px2vw(w),
        height: px2vw(h),
      };
    },
    bgImg() {
      if (this.vapPlayStatus === 'play') return {};
      return {
        backgroundImage: `url(${this.coverImg})`,
      };
    },
  },
  // created(){
  //   if(this.inline && !window.enableInlineVideo){
  //      require('./dll/iphone-inline-video.min.js');
  //   }
  // },
  mounted() {
    this.vapScale();
    this.vapInit();
  },
  beforeDestroy() {
    this.vapPlayer && this.vapPlayer.destroy();
    this.vapPlayer = null;
  },
  methods: {
    vapScale() {
      const vapEl = document.getElementById(this.id);
      const scale = vapEl.clientWidth / this.vapConfig.info.w;
      vapEl.style.transform = `scale(${scale})`;
    },
    vapInit() {
      // 开始播放4秒钟内没有初始化完成就默认失败了
      if (this.vapPlayer) return;
      this.isPlyaFail = true;
      setTimeout(() => {
        if(this.isPlyaFail)this.ended();
      }, 1500);
      const options = {
        src: this.vapUrl,
        config: this.vapConfig,
        container: document.getElementById(this.id),
        type: this.id,
        loop: this.loop,
        width:this.vapConfig.info.w,
        height:this.vapConfig.info.h,
        precache: true,
        mute: true,
        onLoadError:this.error,
        onDestory:this.destory
      };
      try {
        this.vapPlayer = new window.Vap(options);
        this.vapPlayer.play();
        this.isPlyaFail=false;
        this.vapPlayer.on('ended', this.ended);
        this.vapPlayer.on('playing', this.playing);
        this.vapPlayer.on('pause', this.pause);
        this.vapPlayer.on('canplay', this.oncanplay);
        
      } catch (error) {
        this.ended();
      }
    },
    playing() {
      this.vapPlayStatus = 'play';
      this.$emit('playing');
    },
    oncanplay(){
      this.$emit('canplay');
    },
    error(){
      this.sentry();
      this.$emit('ended');
    },
    ended() {
      this.$emit('ended');
    },
    destory() {
      this.$emit('destory');
    },
    pause() {
      this.$emit('pause');
    },
  },
};
</script>

<style lang="scss" scoped>
.pi-vap-wrap {
  position: relative;
  .bg {
    transform-origin: left top;
    top: 0;
    left: 0;
    position: absolute;
    background: {
      size: 100% 100%;
      repeat: no-repeat;
      position: center center;
    }
  }

  .vap-wrap {
    width: 100%;
    height: 100%;
    transform-origin: left top;
    position: absolute;
    top: 0;
    left: 0;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>