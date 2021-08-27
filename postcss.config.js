module.exports = {
  plugins: [
    require('autoprefixer')(),
    require('./build/postcss-vw/index')(),
    require('cssnano')({
      autoprefixer: false,
      'postcss-zindex': false,
    }),
  ],
};
