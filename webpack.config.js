module.exports = {
  output: {
    library: 'PIPLAY',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 0,
          name: 'static/[name].[hash:7].[ext]',
          publicPath: '/'
        },
      },
    ],
  },
}
