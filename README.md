# webpack
webpack 4.0 blog

#### 可以做的事

代码转换、文件优化、代码分隔、模块合并、自动刷新、代码教研、自动发布


#### 常用配置

##### 安装webpack

- 安装本地配置
- 安装webpack,  webpack-cli(4.0以上需要) -D

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
    2. style-loader: 把css插入到head的标签中, loader的特点: 单一职责
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
  配置文件: postcss.config.js;
  ```js
  module.exports = {
    require('autoprefixer')({ browsers: 'last 2 versions' })
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

- 转es6语法 babel-loader @babel/core @babel/preset-env(转换模块)

1. 箭头函数等
```js
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets:[
            "@babel/env"
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            "@babel/plugin-proposal-class-properties"
          ]
        }
      },
    }
```
2. @babel/plugin-proposal-class-properties 转换定义的属性a

```js
class A {
  a = 1;
}
```

3. 转化@ decorator语法 "@babel/plugin-proposal-decorators

4. 提取_classCallCheck 公共函数, 打包*函数, *函数(Promise)内置的api, 并不转化, 需要内置regeneratorRuntime;  @babel/plugin-transform-runtime -D  @babel/runtime -S
配置中加上exclude: /node_modules/,include: path.resolve(__dirname, 'src'),


```
regeneratorRuntime is not defined
```
5. "aaa".includes("a") @babal/polyfill

- 处理js语法及校验

1. npm install eslint eslint-loader --save-dev 下载[.eslintrc.json](https://eslint.org/demo)
   注意: npm install babel-eslint --save-dev babel-eslint支持新属性
```js
  {
    enforce: "pre",
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'eslint-loader',
    include: path.resolve(__dirname, 'src')
  }
```

- 全局变量引入问题

1. 安装jquery, expose-loader 暴露全局loader; 
   说明: loader分类: pre  normal 内联loader(代码中使用) 后置

```js
  import $ from 'jquery';
  console.log($)  // 问题取window.$ undefined

  import $$ from 'expose-loader?$!jquery';
  console.log(window.$, '===')
  console.log($$)
```
```js
  {
    test: require.resolve('jquery'),
    use: [{
      loader: 'expose-loader',
      options: '$'
    }]
  }  
```

  给每一个模块中注入$
  ```js
    new webpack.ProvidePlugin({
      '$': 'jquery'
    })
  ```

  模板文件中引入: jquery cdn https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js
  代码中也引入import $ from jquery

  配置externals 属性: 防止将某些 import 的包(package)打包到 bundle 中
  ```js
    externals: {
      jquery: 'jQuery'
    }
  ```


- 图片配置

  - 3种引入图片的方式
  1. js中创建图片来引入
  2. css中来引入 background
  3. html<img src=""/> 

  - 所需loader

  1. file-loader: 默认内部生成一种图片到build目录下，把生成图片的名字返回回来
  ```js
    import logo from './123.jpg'; // 返回结果是新的图片
    let image = new Image();
    image.src = logo
    document.body.appendChild(image);
  ```
  ```
    {
      test: /\.(png|jpg|gif)$/,
      use: 'file-loader'
    }
  ```
  2. css-loader自己解析
  ```css
    body{
      background: url("./123.jpg")
    }
  ```
  3. html引入 npm install html-withimg-loader --save

  4. base64 直接用url-loader file-loader升级版,做一个限制

  ```js
    {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 200 * 1024
        }
      }
    }
  ```

- 文件分类

  options中 outputPath: 'img/' publicPath加上cdn

  ```js
    test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1,
          outputPath: '/img/',
          publicPath: 'http://www.baidu.com',
        }
      }
  ```

- 打包多页应用

```js
  entry: {
    index: "./src/index.js",
    home: "./src/home.js",
  }, // 可以写相对路径
  output: {
    filename: '[name].js', // 文件名 加上hash  'build.[hash].js' 'build.[hash:8].js' 八位hash 
    path: path.resolve(__dirname, 'build')// 目标路径, 绝对路径
  },
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    chunks: ['index'] // 代码块
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'home.html',
    chunks: ['home','index'] // 代码块
  }),
```

- watch的应用

```js
  watch: true,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/
  },
```

- webpack小插件应用

1. cleanWebpackPlugin、copyWebpackPlugin(拷贝静态文件)、bannerPlugin(webpack内置)

- webpack 跨域问题:

1. 配置http-proxy: 
```js
  // 1 代理
  proxy: {
    // '/api': 'https://www.localhost:3000/' 
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: {'/api': ''}
    }
  }

  // 2. 单纯模拟数据
  before(app){
    app.get('/user', (res,res,next) => {
      res.json({name: 'aa'})
    })
  }

  
```
```js
  // 3.有服务端, 不想用代理, 在服务端启动webpack, 用服务端的port
 let express = require("express");
 let app = express();
 let webpack = require("webpack");
 
 // 中间件
 let middle = require("webpack-dev-middleware");
 let config = require("./webpack.config.js");
 let complier = webpack(config);

 app.use(middle(complier));

 app.get("/user", (req,res) => {
   res.json({'aaa'});
 })
 app.listen(3000)
```

- resolve 属性的配置

```js
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: { // 别名
      'bootstrap': 'bootstrap/dist/css/bootstrap.css'
    },
    mainFields: ['style', 'main'] , // 主入口文件
    mainFiles: '', // 入口文件的名字 默认index.js
    extensions: ['.less']
  }
```


- 定义环境变量

  webpack.DefinePlugin

- 区分不同的环境

  webpack-merge

#### webpack优化

- noParse
  module: {
    noParse: /jquery/  // 不去解析jquery 中的依赖项
  }

- ignorePlugin webpack.IgnorePlugin
  {
    test: '',
    exclude: '',
    include: ''
  };

  解析moment
  ```js
    import moment from 'moment';
    moment.locale('zh-cn');
    console.log(moment().endOf('day').fromNow())
  ```
  ```js
    // 手动引入
    import 'moment/locale/zh-cn'
    new Webpack.IgnorePlugin(/\.\/locale/, /moment/)
  ```

- dllPlugin

1. 安装 react react-dom @babel/preset-react(解析react)
  ```js
  presets:[
    "@babel/env",
    "@babel/preset-react"
  ],
  ```
  单独打包react react-dom 
  
  测试
  ```js
  const path = require("path");
  module.exports = {
      mode: 'development',
      entry: "./src/test.js",
      output: {
          filename: '[name].js',
          path: path.resolve(__dirname, 'dist'),
          library: "ab", // 打包文件加变量名
          libraryTarget: 'this' // 目标格式: var(默认) commonjs umd(统一资源模块) this
      }
  }
  ```

  react react-dom
  ```js
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
  ```

  引入html
  <script src="/_dll_react.js"></script>

  引入dll
  ```js
  new Webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, 'dist', "manifest.json")
  }),
  ```
- webpack自带优化
  
  1. import语法在生产环境下 自动去掉没有的代码 tree-shaking
  require不支持tree-shaking
  
  2. 作用域提升
  ```js
    let a = 1, b = 2, c = 3, d = a+b+c; console.log(d)
  ```
  生产环境最终编译d = 1+2+3;


- 抽离公共代码

  多个页面中: 多次引用
  ```js
    // webpack 配置
    optimization: {
      splitChunks: { // 分割代码块
        cacheGroups: {// 缓存组
          common: { // 公共模块
            minSize: 0, // 字节数
            minChunks: 2, //引入次数 2次以上
            chunks: 'initial', // 开始文件
          },
          vendor: { // 第三方
            priority: 1, // 权重
            test: /node_modules/,
            chunks: 'initial',
            minSize: 0,
            minChunks: 2,
          }
        }
      }
    }
  ```

  解决第三方模块 jquery的问题 同上 配置


- 懒加载

```js
  let button = document.createElement("button");
      button.innerHTML = "test"

  // vue懒加载 react 懒加载
  button.addEventListener('click', function(){
    // es6 草案中的语法, jsonp实现动态加载文件
    // console.log("click"); promise
    import("./source.js").then(data => {
      console.log(data.default)
    });
  })

  document.body.appendChild(button)
```

- 热更新

```js
  devServer:{ // 开发配置
    port: 3000,
    progress: true, // 进度条
    contentBase: './build', // 这个目录静态服务
    open: true, // 自动打开浏览器
    compress: true, // gzip压缩
    hot: true, // 启用热更新
  }, 

  new Webpack.NamedModulesPlugin(), // 告诉那个文件更新了, 打印更新的模块路径
  new Webpack.HotModuleReplacementPlugin() // 支持热更新组件, 热更新插件

  import str from './source.js';
  console.log(str, '===')
  if(module.hot){
    module.hot.accept('./source.js', () => {
      console.log('更新了');
      let str = require("./source.js");
      console.log(str, '==ss');
    });
  }
```
