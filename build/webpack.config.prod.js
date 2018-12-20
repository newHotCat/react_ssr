const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.config')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebapckPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonPrd = require('./webpack.common.prod')


const rootResolve = file => path.resolve(process.cwd(), file)
  
const prodConfig = merge(common, {
    // mode: 'development',
    mode: 'production',
    devtool: 'none',
    plugins: [
        // new CompressionWebapckPlugin({
        //     filename: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: /\.(js|css)(\?.*)?$/i,
        //     cache: true,
        //     // 仅处理大于此大小的资产。以字节为单位
        //     threshold: 10240,
        //     minRatio: 0.8
        // }),
        new CleanWebpackPlugin(['dist'],{
            root: rootResolve('')
        }),
        new HtmlWebpackPlugin({
                template: rootResolve('src/template.html')
        })
        // new BundleAnalyzerPlugin()
    ]
})

const webConf = merge(prodConfig, commonPrd)

module.exports = webConf