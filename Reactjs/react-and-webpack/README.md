# About Webpack

构建项目的工具有很多，Grunt, Gulp, Webpack 也是其中一个，这里主要讲的是 React 项目中，怎么用 Webpack 对 React 进行配置

# Introduction

首先全局安装 Webpack

```bash
npm install -g webpack
```

# Word with React

然后我们需要在我们的项目中，有如下的目录结构

- /app
  - main.js
  - componment.js
- build
  - bundle.js (自动创建)
- index.html
- package.jasn
- webpack.config.js

`main.js`是我们项目的入口文件，把我们的 componment 渲染到页面上

```javascript
var React = require('react');
var Hello = require('./componment');

React.render(<Hello name='webpack' />, document.body);
```

`componment.js`就是我们的控件

```javascript
var React = require('react');

// 把我们的控件 export 出去
export default class Hello extends React.Component {
  render () {
    return <h1>Hello {this.props.name}!</h1>;
  }
} 
```

因为我们需要用到`react`模块，所以我们引用`react`

```bash
npm install react --save
```

然后我们会通过 webpack 使用加载器，把我们的文件转换成兼容的`bundle.js`，然后在`index.html`中调用

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="build/bundle.js"></script>
  </head>
  <body>
  </body>
</html>
```

最后就是配置我们的`webpack.config.js`

```javascript
module.exports = {
  entry: [
    './app/main.js'
  ],
  output: {
    path: __dirname + '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{ 
      test: /\.jsx?$/, 
      loader: 'babel'
    }]
  }
};
```

首先确定我们的入口文件，然后把确定把生成的文件放在哪个目录下，并且叫什么名字，最后在`module`里定义一个`loaders`，用正则去判断所有以`.js`或者以`.jsx`结尾的文件，都用 babel-loader 这个加载去编译生成到`bundle.js`文件里。

所以我们还需要安装 babel-loader

```bash
npm install babel-loader --save-dev
```

# Run

运行时，在当前目录下运行

```bash
webpack
```

打开`index.html`就可以看到

## Hello webpack!
