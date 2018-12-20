const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const srcResolve = file => (path.resolve(__dirname, '..', file))

const isDev = process.env.NODE_ENV !== 'preduction'

const config =  {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: srcResolve('src/app.js')
    },
    output: {
        filename: '[name].[hash:8].js',
        path: srcResolve('dist'),
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: { 
               // 注意: priority属性
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    minSize: 1,
                    priority: 0
                },
                reactBase: {
                    name: "reactBase",
                    chunks: "all",
                    minSize: 10,
                    priority: 1
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
            // cacheGroups: {
            //     reactBase: {
            //         name: 'reactBase',
            //         test: (module) => {
            //             return /react|redux|prop-types/.test(module.context);
            //         },
            //         chunks: 'initial'
            //     },
            //     commons: {
            //         name: 'vendor',
            //         test: (module) => {
            //             return /[\\/]node_modules[\\/]/.test(module.context);
            //         },
            //         chunks: 'initial'
            //     }
            // }
        }
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
    },
    plugins: [
        new HTMLPlugin({
            template: srcResolve('src/template.html')
        })
    ]
}

if (isDev) {
    config.devServer = {
        port: '8888',
        historyApiFallback:true,
        contentBase: srcResolve('dist'),
        // hot: true,
        // overlay: {
        //     errors: true
        // },
        publicPath: '/'
        // historyApiFallback: {
        //     index: srcResolve('dist/index.html')
        // }
    }
}

module.exports = config;