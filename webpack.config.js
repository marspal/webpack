//webpack node语法写的
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require("webpack");
module.exports = {
  devServer:{ // 开发配置
    port: 3000,
    progress: true, // 进度条
    contentBase: './build', // 这个目录静态服务
    open: true, // 自动打开浏览器
    compress: true, // gzip压缩
    hot: true, // 启用热更新
  }, 
  mode: 'development',
  entry: "./src/index.js", // 可以写相对路径
  output: {
    filename: 'build.js', // 文件名 加上hash  'build.[hash].js' 'build.[hash:8].js' 八位hash 
    path: path.resolve(__dirname, 'build')// 目标路径, 绝对路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  module: { // 模块
    rules: [{
      test: /\.html$/,
      use: 'html-withimg-loader'
    },{
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1,
          outputPath: '/img/',
          publicPath: 'http://www.baidu.com',
        }
      }
    },{ // less
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
    },{
      test: /\.js$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
      use: {
        loader: 'babel-loader',
        options: {
          presets:[
            "@babel/env",
            "@babel/preset-react"
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
          ]
        }
      },
    }]
  }
};