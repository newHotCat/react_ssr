const path = require('path')
const common = require('./webpack.config')
const merge = require('webpack-merge')

const srcResolve = file => (path.resolve(__dirname, '..', file))

const webConfig = merge(common,{
    target: 'node',
    devtool: 'none',
    mode: 'development',
    // mode: 'production',
    entry: {
        app: srcResolve('src/server-entry.js')
    },
    output: {
        filename: 'server-entry.js', // node端没有浏览器缓存的概念， 并且需要在node中直接import这个文件，所以直接命名就好
        path: srcResolve('dist'),
        publicPath: '',
        libraryTarget: 'commonjs2' // 打包出来js模块所使用的方案  这里适合Node
    }
})

module.exports = webConfig;