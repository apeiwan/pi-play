<!--
 * @Author: 伽蓝
 * @Date: 2021-10-19 15:09:55
 * @LastEditTime: 2021-10-21 10:04:02
 * @LastEditors: 伽蓝
 * @FilePath: /pi-play/src/avatar/README.md
 * @Description: 
 * 代码不规范,调试泪两行
-->
# Avatar 头像

### 介绍

在`皮皮陪玩App`活动的头像链接,具备基础功能.

### 引入

```js
import Vue from 'vue';
import { Avatar } from '@apeiwan/pi-mobile';

Vue.use( Avatar );
```

## 代码演示

### 基础用法

```html

<pi-play-avatar round :size="100" :data="data" :borderWidth="10" :bgColor="red"></pi-play-avatar>
```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| data | 头像数据 | _object_<br/>*必传*  | - |
| size | 宽高 | _string_ `or` _number_ | 100 |
| padding-width | 内边距 | _string_ `or` _number_ | 0 |
| bgColor | 背景色 | _string_ | transparent |
| round | 圆角 | _boolean_ | `true` |


### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| error  | 加载出差触发 | - |
| ended  | 播放结束触发  <br/>*仅在非循环模式触发* | - |
| destory  | 销毁时触发 | - |
| pause  | 播放暂停触发 | - |


## 注意事项
