# Webview 容器

### 介绍

在`皮皮陪玩App`内运行的`Webview`容器，主要是一些验证操作

### 引入

```js
import Vue from 'vue';
import { Webview } from '@apeiwan/pi-play';

Vue.use(Webview);

/* 可以引入现有的debug配置文件，会在本地开发环境使用 */
Vue.prototype.$PIPLAY = {
  webviewDebugConfig: require('@/src/local.debug.config')
}
```

## 代码演示

### 基础用法

```html
<template>
  <pi-play-webview
    @ready="appReady"
    @notApp="notApp"
    @app="app"
    @signAvailable="signAvailable"
    @signUnavailable="signUnavailable"
    @loginCancel="loginCancel"
    @loginSuccess="loginSuccess">
    <div class="page"></div>
  </pi-play-webview>
</template>
<script>
export default {
  methods: {
    appReady () {
      console.log('app初始化成功触发，此时可以调用native调用的方法', 'appReady');
    },
    notApp () {
      console.log('检测到非app环境时触发', 'notApp');
    },
    app () {
      console.log('检测到app环境时触发，此时 webview 未初始化', 'app');
    },
    loginSuccess () {
      console.log('登陆成功后触发', 'loginSuccess');
    },
    loginCancel () {
      console.log('登陆取消后触发', 'loginCancel');
    },
    signAvailable () {
      console.log('登陆信息有效时触发', 'signAvailable');
    },
    signUnavailable () {
      console.log('登陆信息无效时触发', 'signUnavailable');
    }
  }
}
</script>
```

### Mixin用法

如果在根组件使用了 `pi-play-webview`，在此根组件的所有组件中，如果需要监听 webview 事件状态，

可以在对应子组件引入`mixin`，如果对应子组件有方法名，则会触发，引入`mixin`后会在当前子组件的`data`对象注入一个会注入 `pipiAppWebview`对象

```html
pipiAppWebview: {
isLogin: false,
isAppReady: false,
isPiPiApp,
userId: ''
}
```

```js
import { Webview } from '@apeiwan/pi-play';

export default {
  mixins: [Webview.Mixin],
  methods: {
    onReady () {},
    onNotApp () {},
    onApp () {},
    onLoginSuccess () {},
    onLoginCancel () {},
    onLoginAfter () {},
    onSignAvailable () {},
    onSignUnavailable () {},
  }
}

```

### 手动登陆

`Webview`可以手动手动调用登陆方法

```js
import { Webview } from '@apeiwan/pi-play';
/* 如果页面引用了 pi-play-webview 组件会触发对应事件。如果子组件引用了 mixin ，也会触发 */
Webview.login()
```

### 全局方法

引入 `Webview` 组件后，会自动在 Vue 的 prototype 上挂载 `$webview` 方法，便于在组件内调用。

```js
export default {
  mounted () {
    this.$webview({
      autoReady: true,
      onReady () {},
      onNotApp () {},
      onApp () {},
      onLoginSuccess () {},
      onLoginCancel () {},
      onLoginAfter () {},
      onSignAvailable () {},
      onSignUnavailable () {},
    })
  }
}
```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| autoReady | 是否自动初始化webview | _boolean_ | `true` |
| forciblyLogin | _是否强制登陆_ | _boolean_ | `false` |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| ready  | `native`环境初始化完成，此时可以调用原生方法 | _`Object：pipiAppWebview`_ |
| notApp  | 非app环境 | _`Object：pipiAppWebview`_ |
| app  | 当时app环境时触发 | _`Object：pipiAppWebview`_ |
| loginSuccess  | 登陆成功时触发 | _`Object：pipiAppWebview`_ |
| loginCancel  | 登陆取消时触发 | _`Object：pipiAppWebview`_ |
| signAvailable  | 登陆信息有效时触发 | _`Object：pipiAppWebview`_ |
| signUnavailable  | 登陆信息无效时触发 | _`Object：pipiAppWebview`_ |
