const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  //publicPath: './', // 设置打包文件相对路径
  configureWebpack:{
    resolve: {
      alias: {
        'components': '@/components',
        'assets':'@/assets',
        'views':'@/views',
        'network':'@/network',
      }
    },
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        },
        sourceMap: false,
        parallel: true
      }),
      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  // 这是前端解决跨域的代码
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    port: 8081,     // 端口号
    // open: true, //配置自动启动浏览器
    /*proxy: {
      '/api': {
        target: ``,//写上接口基地址
        changeOrigin: true,
        ws: true,
        // secure: false, //如果是http接口，需要配置此参数
        pathRewrite: {
          '^/api': ''
        }
      }
    }*/
  }
}