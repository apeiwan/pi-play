# 参与开发

### 介绍

`pi-play`为`皮皮陪玩`定制化的陪玩移动端组件

## 参与开发

### 本地开发 `* 包管理工具采用 yarn *`

按照下面的步骤操作，即可在本地开发 `pi-play` 组件。

```bash
# 克隆仓库
git clone git@github.com:apeiwan/pi-play.git

# 安装依赖
cd pi-play && yarn

# 进入开发模式，浏览器访问 http://localhost:8080
yarn run dev
```

### 目录结构

- 仓库的组件代码位于 src 下，每个组件一个文件夹
- docs 目录下是文档网站的代码，本地开发时可以在目录下运行 `yarn run dev` 开启文档网站

##### 开发目录：

```
pi-play
├─ build        # 构建的辅助脚本
├─ docs         # 文档说明
├─ src          # 组件
├───└─ utils    # 放置js的api工具
├───└─ style    # 全局scss文件，如果要放置引入样式，需要在在 base.scss文件中import进去，
├─ static       # 图片资源文件，按照src的目录进行区分
├─ test         # 单测
└─ types        # 类型检测
```
##### .gitignore 目录
`在执行一些命令后产生的目录,以下目录不会在 git 版本管理中`
```
pi-play
├─ assets       #  library 编译后产生的图片资源目录
├─ es           #  library esMobule 版本
├─ lib          #  library umd/commonjs 版本
├─ test         #  测试结果目录
├─ vetur        #  ide（vscode,webstrom） 相关的提示语法文件

```

### CSS 样式 px 转 vw

##### 整个文件转义
`在文件的顶部加入该行注释，750为设计稿画布大小，支持任意数字大小`
```css
/* CSS PX TO VW 750 */
```

##### 只是文件中的部分单位转义
`在文件的顶部引入sass 的 vw，默认 750`
```scss
@use '../style/vw' as *;
/* input */
.demo {
  font-size: vw(24px); // Simple
  padding: vw(5px 10px); // Multiple values
  border-bottom: vw(1px solid black); // Multiple mixed values
  box-shadow: vw(0 0 2px #ccc, inset 0 0 5px #eee); // Comma-separated values
  // Multiple properties
  @include vw((
    margin: 10px 5px,
    text-shadow: (1px 1px #eee, -1px -1px #eee) // Parentheses needed because of comma
  ));
}
/*output*/
.demo {
  font-size: 1.5vw;
  padding: 0.3125vw 0.625vw;
  border-bottom: 0.0625vw solid black;
  box-shadow: 0 0 0.125vw #ccc, inset 0 0 0.3125vw #eee;
  margin: 0.625vw 0.3125vw;
  text-shadow: 0.0625vw 0.0625vw #eee, -0.0625vw -0.0625vw #eee;
}
```
```scss
/* 自定义基准打大小 */
@use '../style/vw' as * with (
  $baseVwWidth: 1080px /*基准改为1080*/
);

/* input */
.demo {
  width:vw(1080px)
}
/* output */
.demo {
  width:100vw
}
```


### script 命令
```shell
yarn run dev   #本地调试服务
yarn run test  #运行测试用例
yarn run lint   #eslint
yarn run component   #命令式创建组件
yarn run release   #npm publish 
yarn run release:dry:run   #npm publish try run
yarn run changelog:file   #生成 changelog 文件到 docs/changelog.md
yarn run changelog:stdout   #changelog 输出为 stdout
yarn run build:docs   #编译doc文档 
yarn run build:docs:upload   #上传doc文档到web服务器
yarn run build:library   #本地编译组件库
yarn run build:library:npm:upload   #编译组件库为 npm 版本(**资源引用文件为 npm 的版本**)
yarn run build:library:dist:upload   #编译组件库 dist 版本(**会更改在线引用的 cdn 版本**)
yarn run build:library:release:upload   #编译组件库  release 版本
yarn run build:library:beta:upload   #编译组件库 beta 版本
```

### 添加新组件

添加新组件时，请按照下面的目录结构组织文件，或者执行`yarn run component`采用命令式创建。并在 `vant.config.js` 中配置组件名称。

```
src
└─ button
   ├─ demo             # 示例代码
   ├─ test             # 单元测试
   ├─ index.js         # 组件入口
   ├─ index.scss       # 组件样式
   ├─ README.md        # 组件的文档说明
```

## 提交 PR

### Pull Request 规范

- 如果遇到问题，建议保持你的 PR 足够小。保证一个 PR 只解决一个问题或只添加一个功能
- 当新增组件或者修改原有组件时，记得增加或者修改测试代码，保证代码的稳定
- 在 PR 中请添加合适的描述，并关联相关的 Issue

### Pull Request 流程

1. fork 主仓库，如果已经 fork 过，请同步主仓库的最新代码
2. 基于 fork 后仓库的 dev 分支新建一个分支，比如`feature/button_color`
3. 在新分支上进行开发，开发完成后，提 Pull Request 到主仓库的 dev 分支
4. Pull Request 会在 Review 通过后被合并到主仓库

### git commit 规范

1、使用命令式提交
```shell
git commit -am 'feta(test)：新增测试组件'
```

- `feat`：新功能
- `fix`：修补 bug
- `docs`：修改文档，比如 README, CHANGELOG, CONTRIBUTE 等等
- `style`： 不改变代码逻辑 (仅仅修改了空格、格式缩进、逗号等等)
- `refactor`：重构（既不修复错误也不添加功能）
- `perf`: 优化相关，比如提升性能、体验
- `test`：增加测试，包括单元测试、集成测试等
- `build`: 构建系统或外部依赖项的更改
- `ci`：自动化流程配置或脚本修改
- `chore`: 非 src 和 test 的修改
- `revert`: 恢复先前的提交

#####

2、运行`git cz`命令，根据命令行提示提交

```html
- Select the **type** of change that you're committing:
-- (type) 选择提交更改的类型
- ? What is the **scope** of this change (e.g. component or file name)? (press enter to skip)
-- (scope) 此次更改的范围是什么（组件或者文件名）
- ? Write a **short**, imperative tense description of the change:
-- (subject) 写一个简短的，命令式的变化描述
- ? Provide a **longer description** of the change: (press enter to skip)
-- (Body) 提供更改的长描述
- ? Are there any **breaking changes**?
-- (Footer) 有没有突破性的变化
- ? Does this change affect any open **issues**? (y/N)
-- (Footer) 此次更改是否有要关闭 issues
```

### 同步最新代码

提 Pull Request 前，请依照下面的流程同步主仓库的最新代码：

```bash
# 添加主仓库到 remote，作为 fork 后仓库的上游仓库
git remote add upstream https://github.com/apeiwan/pi-play.git

# 拉取主仓库最新代码
git fetch upstream

# 切换至 dev 分支
git checkout dev

# 合并主仓库代码
git merge upstream/dev
```
