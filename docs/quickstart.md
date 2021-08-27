# 快速上手

### 介绍

通过本章节你可以了解到 `pi-play` 的安装方法和基本使用姿势。

## 安装

### 通过 npm 安装

在现有项目中使用 `pi-play` 时，可以通过 `npm` 或 `yarn` 进行安装：

```bash
# npm
npm install @apeiwan/pi-play --save
```

```bash
# yarn
yarn add @apeiwan/pi-play --save
```

### 通过 CDN 安装

使用 `pi-play` 最简单的方法是直接在 html 文件中引入 CDN 链接，之后你可以通过全局变量 `PIMOBILE` 访问到所有组件。

```html
<!-- 引入样式文件 -->
<link
  rel="stylesheet"
  href="https://github-npm.apeiwan.com/pi-play/lib/index.css"
/>

<!-- 引入 Vue 和 pi-play 的 JS 文件 -->
<script src="https://cdn.jsdelivr.net/npm/vue@next"></script>
<script src="https://github-npm.apeiwan.com/pi-play/dist/pi-play.min.js"></script>

<script>
    // 在 #app 标签下渲染一个头部组件
    new Vue({
        el: '#app',
        template: `<pi-header title="头部标题"></pi-header>`,
    });

</script>
```

### 通过脚手架安装

在新项目中使用 `pi-play` 时，推荐使用 Vue 官方提供的脚手架 [Vue Cli](https://cli.vuejs.org/zh/) 创建项目并安装 `pi-play`。

```bash
# 安装 Vue Cli
npm install -g @vue/cli

# 创建一个项目
vue create hello-world

# 创建完成后，可以通过命令打开图形化界面，如下图所示
vue ui
```

![](https://img.yzcdn.cn/vant/vue-cli-demo-201809032000.png)

在图形化界面中，点击 `依赖` -> `安装依赖`，然后将 `pi-play` 添加到依赖中即可。

## 引入组件

### 方式一. 自动按需引入组件 (推荐)

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 语句自动转换为按需引入的方式。

```bash
# 安装插件
npm install babel-plugin-import --save-dev
```

```js
// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "pi-play",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```

```js
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'pi-play',
      libraryDirectory: 'es',
      style: true
    }, 'pi-play']
  ]
};
```


### 方式二. 手动按需引入组件

在不使用插件的情况下，可以手动引入需要使用的组件和样式。

```js
// 引入组件
import Header from '@apeiwan/pi-play/lib/header';
// 引入组件对应的样式，若组件没有样式文件，则无须引入
import '@apeiwan/pi-play/lib/header/style';
```

### 方式三. 导入所有组件

`pi-play` 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法。

```js
import Vue from 'vue';
import PiMobile from '@apeiwan/pi-play';
import '@apeiwan/pi-play/lib/index.css';

Vue.use(PiMobile);
```

> Tips: 配置按需引入后，将不允许直接导入所有组件。
