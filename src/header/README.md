# Header 头部

### 介绍

在`皮皮陪玩App`打开的Webview窗口，当嵌入的web页面顶部标题导航栏非原生设置，需要web自定义头部显示。

### 引入

```js
import Vue from 'vue';
import { Header } from '@apeiwan/pi-play';

Vue.use( Header );
```

## 代码演示

### 基础用法

```html

<pi-play-header :fixed="false" default-bg-color="#fff" title="我是标题"></pi-play-header>
```

### 顶部透明，仅返回键

```html

<pi-play-header :fixed="false"></pi-play-header>
```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| default-bg-color | 默认头部背景色 | _string_ | - |
| scroll-bg-color | 根据滑动距离动态改变头部背景色的透明度 | _string_ | - |
| fixed | 是否固定头部 | _boolean_ | `true` |
| on-back | 点击头部返回键事件 | _function_ | - |
| title | 头部标题 | _string_ | - |
| always-show-title | 是否总是显示标题。当`title`不为空和`scroll-bg-color`有值时，<br/> 如果为`true`,标题会永远显示，<br/>如果为`false`只会在头部`opacity>1`时，才会显示 | _boolean_ | `false` |
| show-webview | 是否仅在`webview`环境显示 | _boolean_ | `false` |
| default-back-icon | 左侧操作的图片`url`。<br/>图片大小是设计稿`750px`标准的`44*44`,<br/>也可以是字符串，仅支持<br/>`white: 白色图标` <br/> `black: 黑色图标` | _string_ | 白色的返回图标 |
| scroll-back-icon | 左侧高亮时的图片`url`，图片大小是设计稿`750px`标准的`44*44`,<br/>也可以是字符串，仅支持<br/>`white: 白色图标` <br/> `black: 黑色图标` <br/>*仅当有`scroll-bg-color`时且头部`opacity>1`时会显示* | _string_ | 黑色的返回图标 |
| default-title-color | 标题的颜色 | _string_ | `#333` |
| scroll-title-color | 高亮时的标题颜色，当有`scroll-bg-color`时且头部`opacity>1`时 | _string_ | `#333` |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| load  | 加载完毕时触发 | _`HTMLElement` -头部_ |
| scroll  | 滚动时触发 | _Object:<br/>`{scrollTop:滚动距离,opacity:渐变度值,isTop:是否已滚到顶部}`_ |
| back-before  | 返回前触发。<br/>*当传递`on-back`时，不会触发此通知事件* | - |
| back-after  | 返回后触发。<br/>*当传递`on-back`时，不会触发此通知事件* | - |

### Slots

| 名称    | 说明     | 默认            |
| ------- | -------- |-------- |
| left | 左边插槽 | 返回键
| center | 中间插槽 | 标题显示
| right | 右边插槽 | -
| default | 默认插槽 | 覆盖整个头部内容，*此时仅`fixed`选项属性有作用，其他属性无效*
