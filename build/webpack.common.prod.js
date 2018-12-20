
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const commonOptions = {
    chunks: 'initial',
    reuseExistingChunk: true
  }
const config = {
    optimization: {
        splitChunks: {
          maxInitialRequests: 4, // 设置一个入口最大chunk 数 默认是3个
          cacheGroups: {
            polyfill: {
              name: 'polyfill',
              test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
              priority: 2,
              ...commonOptions
            },
            dll: {
              name: 'dll',
              test: /node_modules[\\/](react|react-dom)[\\/]/,
              priority: 1,
              ...commonOptions
            },
            // commons: {
            //   name: 'commons',
            //   minSize: 0,
            //   priority: 0,
            //   // minChunks: 1,
            //   ...commonOptions
            // }
          },
        },
        runtimeChunk: true, // 打包runtime 代码
        minimizer: [ // 混淆，丑化代码 默认为true
          new OptimizeCssAssetsPlugin({}),
          new UglifyJsPlugin({
            uglifyOptions: {
              ecma: 6,
              cache: true,
              parallel: true
            }
          })
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
    ]
}

module.exports = config