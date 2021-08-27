<template>
  <demo-section>
    <demo-block title='基础用法'>
      <van-cell
        is-link
        title='全屏loading'
        @click='visible=!visible'
      />
      <pi-play-spinner class-name='full-page' v-model='visible'></pi-play-spinner>
    </demo-block>
    <demo-block title='方法调用'>
      <van-cell
        is-link
        title='loading'
        @click='test("loading")'
      />
      <van-cell
        is-link
        title='indicator'
        @click='test()'
      />
    </demo-block>
    <demo-block
      title="动态更新"
    >
      <van-cell
        is-link
        title="动态更新加载[实例]"
        @click="showCustomizedSpinner"
      />
    </demo-block>
    <demo-block title='指定显示位置'>
      <van-cell
        is-link
        style='margin-bottom: 10px'
        title='相对于组件距离屏幕顶部位置 [组件]'
        @click='visible1=!visible1'
      />
      <pi-play-spinner class-name='full-page' position='rect-screen' v-model='visible1'></pi-play-spinner>
      <van-cell
        is-link
        title='在白色区域内显示 [组件]'
        @click='visible2=!visible2'
      />
      <div id="getContainer" style='height: 200px;background-color: #fff;margin: 10px 0'>
        <pi-play-spinner position='parent-screen' v-model='visible2'></pi-play-spinner>
      </div>
    </demo-block>
  </demo-section>
</template>
<script>
import DemoMixins from '../../../build/demo/mixin';
import Spinner from '../index'

export default {
  components: { Spinner },
  mixins: [DemoMixins],
  data () {
    return {
      visible: false,
      visible1: false,
      visible2: false
    };
  },
  computed:{
    isStartHide(){
      return this.visible || this.visible1 || this.visible2
    }
  },
  watch:{
    isStartHide(val){
      if(val){
        setTimeout(() => {
          this.visible = false;
          this.visible1 = false;
          this.visible2 = false;
        }, 2000);
      }
    }
  },
  methods:{
    showCustomizedSpinner(){
      const spinner = Spinner.loading({
        duration: 0, // 持续展示 spinner
        forbidClick: true,
        message: '倒计时 3 秒',
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          spinner.message = `倒计时 ${second} 秒`;
        } else {
          clearInterval(timer);
          // 手动清除 Toast
          Spinner.clear();
        }
      }, 1000);
    },
    test(type='indicator'){
      this.$spinner({message:"我是文字",type});
      setTimeout(()=>{
        this.$spinner.clear();
      },2000)
    }
  }
};
</script>
<style lang='scss'>
@import '../../style/var';

.demo-spinner {
  .full-page{
    background-color: #fff;
  }
}
</style>
