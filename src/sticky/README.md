# Sticky 粘性布局

### 介绍

Sticky 组件与 CSS 中`position: sticky`属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。

### 引入

```js
import Vue from 'vue';
import { Sticky } from '@apeiwan/pi-play';

Vue.use(Sticky);
```

## 代码演示

### 基础用法

将内容包裹在 `Sticky` 组件内即可。

```html
<pi-play-sticky>
  <pi-play-button type="primary">基础用法</pi-play-button>
</pi-play-sticky>
```

### 吸顶距离

通过 `offset-top` 属性可以设置组件在吸顶时与顶部的距离。

```html
<pi-play-sticky :offset-top="50">
  <pi-play-button type="info">吸顶距离</pi-play-button>
</pi-play-sticky>
```

### 指定容器

通过 `container` 属性可以指定组件的容器，页面滚动时，组件会始终保持在容器范围内，当组件即将超出容器底部时，会固定在容器的底部。

```html
<div ref="container" style="height: 150px;">
  <pi-play-sticky :container="container">
    <pi-play-button type="warning">指定容器</pi-play-button>
  </pi-play-sticky>
</div>
```

```js
export default {
  data() {
    return {
      container: null,
    };
  },
  mounted() {
    this.container = this.$refs.container;
  },
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset-top `v2.8.7` | 吸顶时与顶部的距离，支持 `px` `vw` `vh` `rem` 单位，默认 `px` | _number \| string_ | `0` |
| z-index | 吸顶时的 z-index | _number \| string_ | `99` |
| container | 容器对应的 HTML 节点 | _Element_ | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当吸顶状态改变时触发 | _isFixed: boolean_ |
| scroll | 滚动时触发 | _{ scrollTop: number, isFixed: boolean }_ |

