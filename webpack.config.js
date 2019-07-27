//webpack node语法写的
const path = require("path");
module.exports = {
  devServer:{ // 开发配置
    port: 3000,
    progress: true, // 进度条
    contentBase: './build', // 这个目录静态服务
    open: true, // 自动打开浏览器
    compress: true, // gzip压缩
  },
  mode: 'development',
  entry: "./src/index.js", // 可以写相对路径
  output: {
    filename: 'bundle.js', // 文件名
    path: path.resolve(__dirname, 'build')// 目标路径, 绝对路径
  }
};