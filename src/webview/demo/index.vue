<template>
  <demo-section>
    <pi-play-webview></pi-play-webview>
    <demo-block title="App环境 已登陆">
      <van-cell
        is-link
        title="事件执行顺序"
        @click="eventLog('appLogin','logs')"
      />
      <div class="log">
        <div style="display: flex;border-bottom: 1px solid #eee;margin-bottom: 6px;padding: 6px 0" :key="index"
             v-for="(log,index) in logs">
          <div style="flex-shrink: 0;width: 100px;align-items: flex-start">{{ log.name }}</div>
          <div>{{ log.msg }}</div>
        </div>
      </div>
    </demo-block>
    <demo-block title="App环境 未登陆">
      <van-cell
        is-link
        title="事件执行顺序"
        @click="eventLog('appUnLogin','logs1')"
      />
      <div class="log">
        <div style="display: flex;border-bottom: 1px solid #eee;margin-bottom: 6px;padding: 6px 0" :key="index"
             v-for="(log,index) in logs1">
          <div style="flex-shrink: 0;width: 100px;align-items: flex-start">{{ log.name }}</div>
          <div>{{ log.msg }}</div>
        </div>
      </div>
      <van-cell
        is-link
        title="登陆成功事件执行顺序"
        @click="eventLog('appLoginOpenSuccess','logs2')"
      />
      <div class="log">
        <div style="display: flex;border-bottom: 1px solid #eee;margin-bottom: 6px;padding: 6px 0" :key="index"
             v-for="(log,index) in logs2">
          <div style="flex-shrink: 0;width: 100px;align-items: flex-start">{{ log.name }}</div>
          <div>{{ log.msg }}</div>
        </div>
      </div>
      <van-cell
        is-link
        title="登陆取消事件执行顺序"
        @click="eventLog('appLoginOpenCancel','logs3')"
      />
      <div class="log">
        <div style="display: flex;border-bottom: 1px solid #eee;margin-bottom: 6px;padding: 6px 0" :key="index"
             v-for="(log,index) in logs3">
          <div style="flex-shrink: 0;width: 100px;align-items: flex-start">{{ log.name }}</div>
          <div>{{ log.msg }}</div>
        </div>
      </div>
    </demo-block>
    <demo-block title="非 App环境">
      <van-cell
        is-link
        title="事件执行顺序"
        @click="eventLog('unApp','logs4')"
      />
      <div class="log">
        <div style="display: flex;border-bottom: 1px solid #eee;margin-bottom: 6px;padding: 6px 0" :key="index"
             v-for="(log,index) in logs4">
          <div style="flex-shrink: 0;width: 100px">{{ log.name }}</div>
          <div>{{ log.msg }}</div>
        </div>
      </div>
    </demo-block>
  </demo-section>
</template>
<script>
import DemoMixins from '../../../build/demo/mixin';

export default {
  name: 'WebviewDemo',
  mixins: [DemoMixins],
  data () {
    return {
      logs: [],
      logs1: [],
      logs2: [],
      logs3: [],
      logs4: [],
      logKey: 'logs'
    };
  },
  methods: {
    updateLog (msg, name) {
      this[this.logKey].push({ msg, name });
      console.log(msg);
    },
    appReady () {
      this.updateLog('app初始化成功触发，此时可以调用native调用的方法', 'appReady');
    },
    notApp () {
      this.updateLog('检测到非app环境时触发', 'notApp');
    },
    app () {
      this.updateLog('检测到app环境时触发，此时 webview 未初始化', 'app');
    },
    loginSuccess () {
      this.updateLog('登陆成功后触发', 'loginSuccess');
    },
    loginCancel () {
      this.updateLog('登陆取消后触发', 'loginCancel');
    },
    signAvailable () {
      this.updateLog('登陆信息有效时触发', 'signAvailable');
    },
    signUnavailable () {
      this.updateLog('登陆信息无效时触发', 'signUnavailable');
    },
    eventLog (name, key) {
      this[this.key] = [];
      this.logKey = key;
      switch (name) {
        case  'appLogin':
          this.logs = [];
          this.app();
          this.appReady();
          this.signAvailable();
          break;
        case  'appUnLogin':
          this.app();
          this.appReady();
          this.signUnavailable();
          break;
        case  'appLoginOpenSuccess':
          this.app();
          this.appReady();
          this.signUnavailable();
          this.loginSuccess();
          this.signAvailable();
          break;
        case  'appLoginOpenCancel':
          this.app();
          this.appReady();
          this.signUnavailable();
          this.loginCancel();
          break;
        case  'unApp':
          this.notApp();
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss">
@import '../../style/var';

.demo-webview {
  .log {
    padding: 15px;
    font-size: 12px;

    p {
      margin-bottom: 6px;
    }
  }
}
</style>
