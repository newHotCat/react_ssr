## webpack优化

### 静态资源路径

```js
module.exports = {
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        path: rootResolve('dist'),
        publicPath: '/'
    },
    plugins: [
         new MiniCssExtractPlugin({ // 单独打包css
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "static/css/[id].css"
        })
    ]
}
```

### hash缓存

将业务代码、第三方库、runtime代码、css代码单独打包，给他们不同的hash,来最大的利用缓存
分区注意：

1. [hash] 整个项目有变动，hash 变化
2. [chunkhash] chunk 有变动， chuankhash 有变动
3. [contenthash] 不知
4. webpack4 使用chunkhash, 修改css时，js chunkhash也会修改(带验证)

```js
module.exports = {
    optimization: {
        splitChunks: { // 拆分公共代码
            cacheGroups: {
                common: {
                name: 'common',
                test: /[\\/]node_modules[\\/]/,
                chunks: 'all',
                priority: 0
                },
                reactbase: {
                name: 'reactbase',
                test: /node_modules[\\/](react|react-dom)[\\/]/,
                chunks: 'all',
                priority: 10
                }
            }
        },
        runtimeChunk: true // 打包runtime 代码
  },
}
```
### 压缩混淆代码
webpack4 mode:"production"，就自动打包混淆js代码

设置压缩css
```js
// https://github.com/NMFR/optimize-css-assets-webpack-plugin
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// https://www.npmjs.com/package/uglifyjs-webpack-plugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    optimization: {
        runtimeChunk: true, // 打包runtime 代码
        minimizer: [ // 混淆，丑化代码 默认为true 设置后 js混淆失效，需要加入丑化js plugin
        new OptimizeCssAssetsPlugin({})
        ]
    },
    plugins: [
         new OptimizeCssAssetsPlugin({ // 丑化css plugin
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ]
}
// webpack.config.prod.js 
const merge = require('webpack-merge')
const common = require('./webpack.config')
// webpack 视图分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//  https://github.com/webpack-contrib/compression-webpack-plugin
const CompressionWebapckPlugin = require('compression-webpack-plugin')

module.exports = merge(common, {
    // mode: 'development',
    mode: 'production',
    devtool: 'none',
    plugins: [
        new CompressionWebapckPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css)(\?.*)?$/i,
            cache: true,
            // 仅处理大于此大小的资产。以字节为单位
            threshold: 10240,
            minRatio: 0.8
        })
        // new BundleAnalyzerPlugin()
    ]
})

```
