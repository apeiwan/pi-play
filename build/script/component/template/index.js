import {{pascalCaseComponentName}} from './main'

/* 是否需要提前缓存图片，可以打开此处注释 */
// require('./img').PRELOAD_IMG();

{{pascalCaseComponentName}}.install = function (app) {
  app.component({{pascalCaseComponentName}}.name, {{pascalCaseComponentName}});
};

export default {{pascalCaseComponentName}};
export {
  {{pascalCaseComponentName}}
}
