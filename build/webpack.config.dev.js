const path = require('path');
const merge = require('webpack-merge')
const common = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonPrd = require('./webpack.common.prod')

const rootResolve = file => path.resolve(process.cwd(), file)

const config = merge(common, {
    // mode: 'development',
    mode: 'production',
    // devtool: 'eval-source-map',
    devServer: {
        historyApiFallback:true,
        contentBase: rootResolve('dist'),
        publicPath: '/',
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: rootResolve('src/template.html')
        }),
    ],
})

const devConf = merge(config, commonPrd)

module.exports = devConf