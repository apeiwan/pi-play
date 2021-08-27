/* 需要提前缓存加载图片的可以放置在这里 */
const { preload }=require('../utils/img')

const IMG = {
  indicator: require('../../static/spinner/indicator.png'),
  loading: require('../../static/spinner/loading.png'),
};

const PRELOAD_IMG = function() {
  for (let key in IMG) {
    preload(IMG[key]);
  }
};

module.exports={
  IMG,
  PRELOAD_IMG
};
