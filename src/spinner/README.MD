# Spinner 加载

### 介绍

加载指示器,主要`页面初始化`和`业务提交`时的等待行为

### 引入

```js
import Vue from 'vue';
import { Spinner } from '@apeiwan/pi-play';

Vue.use(Spinner);
```


## 代码演示

```html
<!-- 默认全屏-->
<pi-play-spinner
  v-model='visible'
/>

<!--相对于本身组件位置顶部距离屏幕底部的剩余位置-->
<pi-play-spinner
  position='rect-screen'
  v-model='visible'
/>
<!--相对于父容器-->
<pi-play-spinner
  position='parent-screen'
  v-model='visible'
/>
```

### 全局方法

引入 `Spinner` 组件后，会自动在 Vue 的 prototype 上挂载 `$spinner` 方法，便于在组件内调用。

```js
/* 默认为 loading 形式 */
this.$spinner();

/* 指定type */
this.$spinner({type:'indicator'});

/* 指定 indicator */
this.$spinner.indicator();

/* 指定 loading */
this.$spinner.loading();

/* 关闭加加载器 */
this.$spinner.clear();
```

### 动态更新提示

执行 `Spinner` 方法时会返回对应的 Spinner 实例，通过修改实例上的 `message` 属性可以实现动态更新提示的效果。

```js
import { Spinner } from '@apeiwan/pi-play';

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
    // 手动清除 Spinner
    Spinner.clear();
  }
}, 1000);
```


### 单例模式

Spinner 默认采用单例模式，即同一时间只会存在一个 Spinner，如果需要在同一时间弹出多个 Spinner，可以参考下面的示例：

```js
Spinner.allowMultiple();

const spinner1 = Spinner('第一个 Spinner');
const spinner2 = Spinner('第二个 Spinner');

spinner1.clear();
spinner2.clear();
```

### 修改默认配置

通过 `Spinner.setDefaultOptions` 函数可以全局修改 Spinner 的默认配置。

```js
// 将所有 Spinner 的展示时长设置为 2000 毫秒
Spinner.setDefaultOptions({ duration: 2000 });

// 将所有 loading Spinner 设置为背景不可点击
Spinner.setDefaultOptions('loading', { forbidClick: true });

// 重置所有 Spinner 的默认配置
Spinner.resetDefaultOptions();

// 重置 loading Spinner 的默认配置
Spinner.resetDefaultOptions('loading');
```

## API

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| Spinner | 展示提示 | `options | message` | Spinner 实例 |
| Spinner.loading | 展示加载提示 | `options | message` | Spinner 实例 |
| Spinner.indicator | 展示成功提示 | `options | message` | Spinner 实例 |
| Spinner.clear | 关闭提示 | `clearAll: boolean` | `void` |
| Spinner.allowMultiple | 允许同时存在多个 Spinner | - | `void` |
| Spinner.setDefaultOptions | 修改默认配置，对所有 Spinner 生效。<br>传入 type 可以修改指定类型的默认配置 | `type | options` | `void` |
| Spinner.resetDefaultOptions | 重置默认配置，对所有 Spinner 生效。<br>传入 type 可以重置指定类型的默认配置 | `type` | `void` |

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| v-model (value) | 是否显示 | _boolean_ | `false` |
| position | 显示位置, 可选值为<br/>*rect-screen:*`显示位置为相对于组件距离屏幕顶部的高度`<br/>*parent-screen：:*<br/>`显示位置相对于父组件的内容区域内`<br/>*full-screen：:*<br/>`全屏`<br/>*Element：:*<br/>`指定DOM对象` | _string \| object \| () => Element_ | `full-screen` |
| className | css样式 | _string_ | - |
| duration | 展示时长(ms)，值为 0 时，spinner 不会消失 | _number_ | `2000` |
| forbidClick | 是否禁止背景点击 | _boolean_ | `false` |
| closeOnClick | 是否在点击后关闭 | _boolean_ | `false` |
| closeOnClickOverlay | 是否在点击遮罩层后关闭 | _boolean_ | `false` |
| type | 加载类型, 可选值为 `indicator、loading` | _string_ | `indicator` |
| className | 自定义类名 | _any_ | - |
| onOpened | 完全展示后的回调函数 | _Function_ | - |
| onClose | 关闭时的回调函数 | _Function_ | - |
| transition | 动画类名，等价于 [transtion](#transition) 的`name`属性 | _string_ | `pi-play-fade` |
| getContainer | 指定挂载的节点 | _string \| () => Element_ | `body` |
