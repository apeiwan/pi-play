# Popover 气泡弹出框

### 介绍

弹出式的气泡菜单。

### 引入

```js
import Vue from 'vue';
import { Popover } from '@apeiwan/pi-play';

Vue.use(Popover);
```

## 代码演示

### 基础用法

当 Popover 弹出时，会基于 `reference` 插槽的内容进行定位。

```html
<pi-play-popover
  v-model="showPopover"
  trigger="click"
  :actions="actions"
  @select="onSelect"
>
  <template #reference>
    <pi-play-button type="primary">浅色风格</pi-play-button>
  </template>
</pi-play-popover>
```

```js
import { Toast } from '@apeiwan/pi-play;

export default {
  data() {
    return {
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
    };
  },
  methods: {
    onSelect(action) {
      Toast(action.text);
    },
  },
};
```

### 深色风格

Popover 支持浅色和深色两种风格，默认为浅色风格，将 `theme` 属性设置为 `dark` 可切换为深色风格。

```html
<pi-play-popover
  v-model="showPopover"
  theme="dark"
  trigger="click"
  :actions="actions"
>
  <template #reference>
    <pi-play-button type="primary">深色风格</pi-play-button>
  </template>
</pi-play-popover>
```

```js
export default {
  data() {
    return {
      showPopover: false,
      actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
    };
  },
};
```

### 弹出位置

通过 `placement` 属性来控制气泡的弹出位置。

```html
<pi-play-popover placement="top" />
```

`placement` 支持以下值：

```bash
top           # 顶部中间位置
top-start     # 顶部左侧位置
top-end       # 顶部右侧位置
left          # 左侧中间位置
left-start    # 左侧上方位置
left-end      # 左侧下方位置
right         # 右侧中间位置
right-start   # 右侧上方位置
right-end     # 右侧下方位置
bottom        # 底部中间位置
bottom-start  # 底部左侧位置
bottom-end    # 底部右侧位置
```

### 展示图标

在 `actions` 数组中，可以通过 `icon` 字段来定义选项的图标，支持传入[图标名称](#/zh-CN/icon)或图片链接。

```html
<pi-play-popover v-model="showPopover" trigger="click" :actions="actions">
  <template #reference>
    <pi-play-button type="primary">展示图标</pi-play-button>
  </template>
</pi-play-popover>
```

```js
export default {
  data() {
    return {
      showPopover: false,
      actions: [
        { text: '选项一', icon: 'add-o' },
        { text: '选项二', icon: 'music-o' },
        { text: '选项三', icon: 'more-o' },
      ],
    };
  },
};
```

### 禁用选项

在 `actions` 数组中，可以通过 `disabled` 字段来禁用某个选项。

```html
<pi-play-popover v-model="showPopover" trigger="click" :actions="actions">
  <template #reference>
    <pi-play-button type="primary">禁用选项</pi-play-button>
  </template>
</pi-play-popover>
```

```js
export default {
  data() {
    return {
      showPopover: false,
      actions: [
        { text: '选项一', disabled: true },
        { text: '选项二', disabled: true },
        { text: '选项三' },
      ],
    };
  },
};
```

### 自定义内容

通过默认插槽，可以在 Popover 内部放置任意内容。

```html
<pi-play-popover v-model="showPopover" trigger="click">
  <van-grid
    square
    clickable
    :border="false"
    column-num="3"
    style="width: 240px;"
  >
    <van-grid-item
      v-for="i in 6"
      :key="i"
      text="选项"
      icon="photo-o"
      @click="showPopover = false"
    />
  </van-grid>
  <template #reference>
    <pi-play-button type="primary">自定义内容</pi-play-button>
  </template>
</pi-play-popover>
```

```js
export default {
  data() {
    return {
      showPopover: false,
    };
  },
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否展示气泡弹出层 | _boolean_ | `false` |
| actions | 选项列表 | _Action[]_ | `[]` |
| placement | 弹出位置 | _string_ | `bottom` |
| theme | 主题风格，可选值为 `dark` | _string_ | `light` |
| trigger | 触发方式，可选值为 `click` | - |
| offset | 出现位置的偏移量 | _[number, number]_ | `[0, 8]` |
| overlay | 是否显示遮罩层 | _boolean_ | `false` |
| close-on-click-action | 是否在点击选项后关闭 | _boolean_ | `true` |
| close-on-click-outside | 是否在点击外部元素后关闭菜单 | _boolean_ | `true` |
| get-container | 指定挂载的节点，[用法示例](#/zh-CN/popup#zhi-ding-gua-zai-wei-zhi) | _string \| () => Element_ | `body` |

### Action 数据结构

`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| text | 选项文字 | _string_ |
| icon | 文字左侧的图标，支持传入[图标名称](#/zh-CN/icon)或图片链接 | _string_ |
| disabled | 是否为禁用状态 | _boolean_ |
| className | 为对应选项添加额外的类名 | _any_ |

### Events

| 事件名 | 说明                     | 回调参数                        |
| ------ | ------------------------ | ------------------------------- |
| select | 点击选项时触发           | _action: Action, index: number_ |
| open   | 打开菜单时触发           | -                               |
| close  | 关闭菜单时触发           | -                               |
| opened | 打开菜单且动画结束后触发 | -                               |
| closed | 关闭菜单且动画结束后触发 | -                               |

### Slots

| 名称      | 说明                        |
| --------- | --------------------------- |
| default   | 自定义菜单内容              |
| reference | 触发 Popover 显示的元素内容 |


## 常见问题

### Popover 的点击事件无法正确触发？

这种情况通常是由于项目中引入了 `fastclick` 库导致的。建议移除 `fastclick`，或者配置 `fastclick` 的 [ignore 规则](https://github.com/ftlabs/fastclick#advanced)。
