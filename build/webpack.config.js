const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
const HappyPack = require('happypack');
const os = require('os')

const rootResolve = file => path.resolve(process.cwd(), file)
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: {app: rootResolve('src/app.js')},
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: rootResolve('dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [
          rootResolve('src')
        ],
        exclude: [
          /[\\/]node_modules[\\/]/
        ],
        use: 'happypack/loader'
      },
      {
        test: /\.css$/,
        use: [ 
        MiniCssExtractPlugin.loader,
        // 'style-loader', 
        'css-loader' ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              // name: 'static/css/font/[name].[hash:7].[ext]' 暂时没用上 png 中使用
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HappyPack({
      // 3) re-add the loaders you replaced above in #1:
      loaders: [ 'babel-loader' ],
      threadPool: happyThreadPool
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[id].[contenthash:8].css"
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
  ]
};