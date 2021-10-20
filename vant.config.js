module.exports = {
  name: 'pi-play',
  build: {
    skipInstall: ['ios-input-keyboard'],
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '/pi-play/',
    },
    vetur: {
      tagPrefix: 'pi-',
      test: /README.md/,
    },
  },
  site: {
    title: 'pi-play',
    logo: 'https://h5-public.apeiwan.com/library/assets/images/touch/logo_256%EF%BC%8A256.png',
    description: '皮皮陪玩前端移动端组件库',
    links: [
      {
        logo: 'https://b.yzcdn.cn/vant/logo/github.svg',
        url: 'https://github.com/apeiwan/pi-play',
      },
    ],
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
          {
            path: 'changelog',
            title: '更新日志',
          },
          {
            path: 'contribution',
            title: '开发指南',
          },
        ],
      },
      {
        title: '自定义组件',
        items: [
          {
            path: 'button',
            title: 'Button 按钮',
          },
          {
            path: 'overlay',
            title: 'Overlay 遮罩层',
          },
          {
            path: 'popup',
            title: 'Popup 弹出层',
          },
          {
            path: 'toast',
            title: 'Toast 轻提示',
          },
          {
            path: 'loading',
            title: 'Loading 加载',
          },
          {
            path: 'list',
            title: 'List 列表',
          },
          {
            path: 'pull-refresh',
            title: 'PullRefresh 下拉刷新',
          },
          {
            path: 'dialog',
            title: 'Dialog 弹窗框',
          },
          {
            path: 'action-sheet',
            title: 'ActionSheet 动作面板',
          },
          {
            path: 'count-down',
            title: 'CountDown 倒计时',
          },
          {
            path: 'sticky',
            title: 'Sticky 粘性布局',
          },
          {
            path: 'popover',
            title: 'Popover 气泡弹出框',
          },
        ],
      },
      {
        title: '业务组件',
        items: [
          {
            path: 'spinner',
            title: 'Spinner 加载',
          },
          {
            path: 'header',
            title: 'Header 头部',
          },
          {
            path: 'webview',
            title: 'Webview 皮皮',
          },
          {
            path: 'sign',
            title: 'Sign 验证',
          },
          {
            path: 'vap',
            title: 'Vap 动效播放',
          },
        ],
      },
      {
        title: '指令',
        items: [
          {
            path: 'input-keyboard',
            title: 'input 键盘输入框',
          },
        ],
      },
    ],
  },
};
