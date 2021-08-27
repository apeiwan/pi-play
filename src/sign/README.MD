# Sign 验证

### 介绍

主要用于验证App是否登陆或所属是否在App环境

### 引入

```js
import Vue from 'vue';
import { Sign } from '@apeiwan/pi-play';

Vue.use(Sign);
```

## 代码演示

### 基础用法

```html

<pi-play-sign tag="div" validate-type="agent" @click="agentValidate()">
  验证是否在App环境
</pi-play-sign>

<pi-play-sign tag="div" validate-type="app" @click="agentValidate()">
  验证是否在App环境
</pi-play-sign>

<pi-play-sign tag="div" @click="appValidate()">
  验证App是否登陆
</pi-play-sign>

```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| tag | 挂载的标签 | _string_ | `span` |
| webview | 是否有挂载的webview，如果为true的话，当拉起登陆成功后，会更新webview对应的状态，同时会触发webview的生命周期 | _boolean_ | `true` |
| disabled | 是否禁用 | _boolean_ | `false` |
| validateType | 验证类型，可选`agent、token、app` | _string_ | `token` |
| autoLogin | 是否自动登陆，仅在`validateType=token`有效 | _boolean_ | `true` |
| loginAwayClick | 自动登陆后是否自动执行`click` | _参数值类型_ | `false` |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| notApp  | 仅在`validateType=agent`且非app环境时执行的回调,此时默认的下载将失效 | `{event}` |
| noLogin  | 仅在`validateType=token`和未登陆时触发  | `{event,app}` |
