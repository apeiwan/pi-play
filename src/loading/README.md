# Loading 加载

### 介绍

加载图标，用于表示加载中的过渡状态。

### 引入

```js
import Vue from 'vue';
import { Loading } from '@apeiwan/pi-play';

Vue.use(Loading);
```

## 代码演示

### 加载类型

通过 `type` 属性可以设置加载图标的类型，默认为 `circular`，可选值为 `spinner`。

```html
<pi-play-loading />

<pi-play-loading type="spinner" />
```

### 自定义颜色

通过 `color` 属性设置加载图标的颜色。

```html
<pi-play-loading color="#1989fa" />

<pi-play-loading type="spinner" color="#1989fa" />
```

### 自定义大小

通过 `size` 属性设置加载图标的大小，默认单位为 `px`。

```html
<pi-play-loading size="24" />

<pi-play-loading type="spinner" size="24px" />
```

### 加载文案

可以使用默认插槽在图标的右侧插入加载文案。

```html
<pi-play-loading size="24px">加载中...</pi-play-loading>
```

### 垂直排列

设置 `vertical` 属性后，图标和文案会垂直排列。

```html
<pi-play-loading size="24px" vertical>加载中...</pi-play-loading>
```

### 自定义文案颜色

通过 `color` 或者 `text-color` 属性设置加载文案的颜色。

```html
<!-- 可修改文案和加载图标的颜色 -->
<pi-play-loading color="#0094ff" />

<!-- 只修改文案颜色 -->
<pi-play-loading text-color="#0094ff" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 颜色 | _string_ | `#c9c9c9` |
| type | 类型，可选值为 `spinner` | _string_ | `circular` |
| size | 加载图标大小，默认单位为 `px` | _number \| string_ | `30px` |
| text-size | 文字大小，默认单位为 `px` | _number \| string_ | `14px` |
| text-color  | 文字颜色 | _string_ | `#c9c9c9` |
| vertical | 是否垂直排列图标和文字内容 | _boolean_ | `false` |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 加载文案 |

