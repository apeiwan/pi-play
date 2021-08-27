/* 图片配置 */
const { preload }=require('../utils/img')

/** example
const IMG = {
  loading: require('../../static/indicator/loading.png')
};
 */
// 图片地址配置，在 main.vue 文件已引入 IMG 对象
const IMG = {

};

// 图片缓存开启，需要在 index.js 入口文件执行此方法
const IMG_PRELOAD = function() {
  for (let key in IMG) {
    preload(IMG[key]);
  }
};

module.exports={
  IMG,
  PRELOAD_IMG
};
