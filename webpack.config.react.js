const path = require("path");
const webpack = require("webpack");
module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'build'),
        library: "_dll_[name]", // 打包文件加变量名
        // libraryTarget: 'var' // 目标格式: var(默认) commonjs umd(统一资源模块) this
    },
    plugins: [
        new webpack.DllPlugin({
            name: "_dll_[name]",
            path: path.resolve(__dirname, 'build', 'manifest.json')
        })
    ]   
}