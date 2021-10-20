<!--
 * @Author: 伽蓝
 * @Date: 2021-10-19 15:09:55
 * @LastEditTime: 2021-10-20 11:15:20
 * @LastEditors: 伽蓝
 * @FilePath: /pi-play/src/vap/README.md
 * @Description: 
 * 代码不规范,调试泪两行
-->
# Vap 动效播放

### 介绍

在`皮皮陪玩App`活动页面需要主图动效时,可以考虑使用Vap进行播放.

### 引入

```js
import Vue from 'vue';
import { Vap } from '@apeiwan/pi-mobile';

Vue.use( Vap );
```

## 代码演示

### 基础用法

```html

<pi-vap :cover-img="cover" :vap-url="url" :loop="false" :config="open"></pi-vap>
```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| cover-img | 占位图 | _string_ | - |
| vap-url | Vap文件地址 | _string_ | - |
| loop | 是否循环播放 | _boolean_ | `true` |
| config | *Web*端播放Vap需要的配置文件 | _string_ | - |


### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| error  | 加载出差触发 | - |
| ended  | 播放结束触发  <br/>*仅在非循环模式触发* | - |
| destory  | 销毁时触发 | - |
| pause  | 播放暂停触发 | - |


## 注意事项

在非客户端使用时,例如`微博`出现默认全屏,可以引入[iphone-inline-video.min.js](https://github.com/fregante/iphone-inline-video)插件.

默认大小以 *750* 标准转换 *vw* 来计算.