# Building App with Angular2 & ES6

关于 Angular2 的 TypeScript 教程有很多，但我喜欢 ES6，喜欢 Webpack。但这种开发模式的教程似乎比较少。但这篇就是！如果你也和我一样，那么这篇教程肯定适合你。这篇教程会从一个 Hello, Angular2 开始，配置好所需要的东西，再到一个简单的 Todo。Angular2 简单的语法不会过多的深入，官网的 [5 MIN QUICKSTART](https://angular.io/docs/js/latest/quickstart.html) 和 [DOCS](https://angular.io/docs/ts/latest/guide/) 是一个好地方

## Hello, Angular2

首先使用 `npm init -y` 快速生成一个 `package.json`，然后输入下面这条命令，安装好 `webpack` 和 `webpack-dev-server`，还有把 ES6 转成 ES5 的 `babel-loader`

```bash
$ npm install --save-dev webpack webpack-dev-server babel-core babel-loader babel-preset-es2015
```

然后简单的配置一个 `webpack.config.js`，主要是设置一下入口文件，loader，还有生成文件的位置等等，详细可以看 [Webpack Docs](https://webpack.github.io/docs/)

```javascript
// webpack.config.js
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './app.js' // 入口文件，记住记住
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel', 
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

现在基本配置都已经好了，那么就来写 Hello, Angular2 吧

首先 `index.html` 非常简单，只需要输入一个自定义的标签，并引入我们待会生成的 `bundle.js` 即可

```html
<!-- index.html -->
<app></app>
<script src="bundle.js"></script>
```

还记得刚刚在 `webpack.config.js` 的入口文件吗？没错，就是 `app.js`。但在写之前，我们还要安装几个非开发的依赖包

```bash
$ npm install --save angular2 reflect-metadata rxjs zone.js
```

后面三个是 angular2 需要的依赖包，也要安装上

```javascript
// app.js
import 'zone.js';
import 'reflect-metadata';
import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

class App {
  constructor () {}
};

App.annotations = [
  new Component({
    selector: 'app', // 刚刚的自定义标签
    template: '<h1>Hello, Angular2<h1>'
  })
];

document.addEventListener('DOMContentLoaded', function () {
  bootstrap(App);
});
```

这时只要开启 `webpack-dev-server` 就可以看到我们的 Hello, Angular2 了 :)

```bash
$ webpack-dev-server --port 3000
```

## Todo App
