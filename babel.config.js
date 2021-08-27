const plugins = [];
const VantConfig = require('./vant.config');

if (process.env.NODE_ENV === 'production') {
  let outputPath = '/assets/';
  let publicPath = `https://github-npm.apeiwan.com/${process.env.OSS_FILE_PATH}${outputPath}`;
  // 文档模式不上传资源文件到oss
  if (process.env.COMPILE_MODE === 'docs') {
    outputPath = '/site/static';
    publicPath = `${VantConfig.build.site.publicPath}static/`;
  }
  plugins.push([
    'transform-require-image-to-url',
    {
      test: /\.(png|jpg|gif|jp?g|webp|svg|svga)$/,
      publicPath,
      outputPath,
      md5Length: 8,
    },
  ]);
}

module.exports = {
  presets: ['@vant/cli/preset'],
  plugins,
};
