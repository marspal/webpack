//webpack node语法写的
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  devServer:{ // 开发配置
    port: 3000,
    progress: true, // 进度条
    contentBase: './build', // 这个目录静态服务
    open: true, // 自动打开浏览器
    compress: true, // gzip压缩
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      cache: true, // 是否用缓存
      parallel: true, // 并发打包
      sourceMap: true, // 源码映射
    }),new OptimizeCssAssetsPlugin({})],
  },
  mode: 'production',
  entry: "./src/index.js", // 可以写相对路径
  output: {
    filename: 'bundle.js', // 文件名 加上hash  'build.[hash].js' 'build.[hash:8].js' 八位hash 
    path: path.resolve(__dirname, 'build')// 目标路径, 绝对路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css', // 文件名, 选定需要抽离的目标文件(less、css)等
    })
  ],
  module: { // 模块
    rules: [{ // less
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    },{ // 规则
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ]
    }]
  }
};