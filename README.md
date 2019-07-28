# webpack
webpack 4.0 blog

#### 可以做的事

代码转换、文件优化、代码分隔、模块合并、自动刷新、代码教研、自动发布


#### 常用配置

##### 安装webpack

- 安装本地配置
- 安装webpack, webpack webpack-li(4.0以上需要) -D

##### webpack 可以进行零配置(比较弱)

- 打包工具 -> 输出结果(js 模块)
  
  ```js
   // src/index.js
   console.log("aa")
  ```
  执行``npx webpack:`` 打包进dist/main.js, 默认production模式
      ``Code Runner:`` 帮助运行代码

- 打包 (支持js模块化)

  ```js
    // src/a.js
    module.exports = "测试"
    // src/index.js
    var a = require("./a.js");
    console.log(a);
  ```

##### 手动配置

- 默认:webpack.config.js or webpackfile.js; 其它名字cli: npx webpack --config webpack.config.my.js
  ```js
    {
      type: "string",
      describe: "Path to the config file",
      group: CONFIG_GROUP,
      defaultDescription: "webpack.config.js or webpackfile.js",
      requiresArg: true
    },
  ```
  ```js
    //webpack node语法写的 简单配置
    const path = require("path");
    module.exports = {
      mode: 'development',
      entry: "./src/index.js", // 可以写相对路径
      output: {
        filename: 'bundle.js', // 文件名 加上hash  'build.[hash].js' 'build.[hash:8].js' 八位hash 
        path: path.resolve(__dirname, 'build')// 目标路径, 绝对路径
      },
    };
  ```
  打包后的文件
  ```js
  (function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if(installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      module.l = true;
      return module.exports;
    }
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
  })({
    "./src/a.js":
    (function(module, exports) {
    eval("module.exports = \"测试\"\n\n//# sourceURL=webpack:///./src/a.js?");
    }),
    "./src/index.js":
    (function(module, exports, __webpack_require__) {
    eval("var a = __webpack_require__(/*! ./a.js */ \"./src/a.js\");\nconsole.log(a);\n\n//# sourceURL=webpack:///./src/index.js?");
    })
  });
  ```
  package.json 脚本配置
  ```json
    // 1.
   "scripts": {
      "build": "webpack --config webpack.config.my.js"
    },

    // npm run build
    // webpack-log@1.0.0 build /Users/admin/webspace/webpack-log
    // webpack --config webpack.config.my.js 

    // 2.
    "scripts": {
      "build": "webpack"
    },
    // npm run build -- --config webpack.config.my.js
  ```


- 开发服务配置: webpack-dev-server(express), 安装 npm i webpack-dev-server -D

  ``使用方式:``
  1. npx webpack-dev-server
  2. 在webpack.config.js配置
  ```js
    {
      devServer:{ // 开发配置
        port: 3000,
        progress: true, // 进度条
        contentBase: './build', // 这个目录静态服务
        open: true, // 自动打开浏览器
        compress: true, // gzip压缩
      }
    }
  ```
- 模板文件打包到内存中(解决dev index.html不存在的问题)

  1. 安装webpack插件:  html-webpack-plugin
  2. 配置: 
  
  ```js
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 删除属性的双引号
        collapseWhitespace: true, // 变成一行
      },
      hash: true // 加上hash戳: src=bundle.js?c734048219a94c0495b2
    })
  ```

- 样式配置
  ``说明:`` 多个loader 需要[], loader执行顺序默认是从右向左、从下到上
  1. 解析css文件:  npm i css-loader style-loader -D
  ```
    1. css-loader: 解析@import、路径等语法
    2. style-loader: 把css插入到head的标签中, loader的特点: 单一
  ```
  ```js
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            insertAt: 'top', // default: bottom
            singleton: true // 合成一个style 标签
          }
        },
        'css-loader'
      ]
    }
  ```

  2. 处理less文件: npm i less-loader less -D, less-loader调用less中的方法
  ```js
  { // less
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          insertAt: 'top',
          singleton: true 
        }
      },
      'css-loader',
      'less-loader'
    ]
  }
  
  ```

  3. 处理sass文件: sass-loader node-sass

  4. 处理stylus文件: stylus stylus-loader

  5. 进阶配置: 抽离css样式 npm install --save-dev mini-css-extract-plugin

  ```js
    const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 引入插件

    new MiniCssExtractPlugin({ // 要打包多个css文件, 创建多个对象 
      filename: 'main.css', // 文件名, 选定需要抽离的目标文件(less、css)等
    })

    // module rules
    { // 规则 抽离css
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }

    { // less 抽离less
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
      ]
    }
  ```

  6. 自动加前缀: autoprefixer postcss-loader

  ```js
    { // less 抽离less
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    }
  ```
  配置文件: postcss.config.js 不知道为啥不生效?
  ```js
  module.exports = {
    plugins: [require('autoprefixer')]
  }
  ```
  7. 压缩css : npm i optimize-css-assets-webpack-plugin -D
  ```js
  const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin({})], // 
  },
  // 解决js 不能压缩的文件 minimizer: 数组中添加un
  // npm install uglifyjs-webpack-plugin --save-dev

  minimizer: [new UglifyJsPlugin({
      cache: true, // 是否用缓存
      parallel: true, // 并发打包
      sourceMap: true, // 源码映射
    }),new OptimizeCssAssetsPlugin({})],
  },
  ```

  ``注意:`` 能不能less 打一个文件  css的打一个文件？

#### 高级配置


#### webpack优化策略

