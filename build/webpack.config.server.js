const path = require('path')

const srcResolve = file => (path.resolve(__dirname, '..', file))

module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        app: srcResolve('src/server-entry.js')
    },
    output: {
        filename: 'server-entry.js', // node端没有浏览器缓存的概念， 并且需要在node中直接import这个文件，所以直接命名就好
        path: srcResolve('dist'),
        publicPath: '',
        libraryTarget: 'commonjs2' // 打包出来js模块所使用的方案  这里适合Node
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                include: [
                    srcResolve('src')
                ]
            },
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                exclude: [
                    srcResolve('node_modules')
                ]
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
    }
}