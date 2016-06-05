# Angular 2

## Hello, Angular2

`angular2.sfx.dev.js` 这个文件是干嘛的？

[Difference between angular.dev.js and angular.sfx.dev.js](http://stackoverflow.com/questions/30093250/difference-between-angular-dev-js-and-angular-sfx-dev-js)

```html
<!-- index.html -->
<head>
  <script src="angular2.sfx.dev.js"></script>
  <script src="app.js"></script>
</head>
<body>
  <app></app>
</body>
```

```javascript
// app.js
function App () {}

App.annotations = [
  new angular.ComponentAnnotation({
    selector: 'app'
  }),
  new angular.ViewAnnotation({
    template: '<h1>Hello, Angular2</h1>'
  })
];

document.addEventListener('DOMContentLoaded', function () {
  angular.bootstrap(App);
});
```

## ViewAnnotation

```javascript
new angular.ViewAnnotation({
  directives: [],
  template/templateUrl: ''
})
```

`directives` 是用来装指令的，可以在 `template` 里使用。而 `template` 或者 `templateUrl` 就是我们的 DOM

## ComponentAnnotation

```javascript
new angular.ComponentAnnotation({
  selector: ''
});
```

`selector` 就是我们组件的标签，类似 XHTML，在 ViewAnnotation 中的 `directives` 中声明之后，就可以使用了

## DirectiveAnnotation

```javascript
new angular.DirectiveAnnotation({
  selector: '[]',
  hostListeners: {
    event: function
  },
  hostProperties: {
    textContent: 'textContent'
  }
});
```

`selector` 是这个指令的名字，用 `[]` 包住是因为他是属性，不是标签，而使用这个属性的标签就是它的 host，可以使用 `hostListeners` 为 host 绑定事件和执行函数。也可以使用 `hostProperties` 为 host 设置属性。这些属性和函数都在这个指令在构造函数中定义

## Binding

在 `template` 的 DOM 里使用 `{{}}` 包含变量，然后就可以在相应的构造器里定义这个变量

## Events & Custom Events

可以在 DOM 节点里添加事件，`(click)` 代表 `onClick`，`(mousemove)` 代表 `onMousemove`，后面加入你想要执行的函数，如果要传 `event` 事件，就要使用 `$event`，例如

```html
<h1 (click)="increaseCount($event)">Click Me!</h1>
```

然后在该 template 对应的构造器中加入该函数

如果想要自己定义一个事件，就可以使用 `new angular.EventEmitter()`，然后使用 `next()` 去触发，例如点击一个 `button`，触发点击事件，然后触发自定义事件

```html
<button (clcik)='onClick($event)'>Click Me!</button>
```

然后在这个模板的构造器中处理 `onClick` 函数

```javascript
this.update = new angular.EventEmitter();
this.onClick = function (event) {
  this.update.next();
}
```

但是要使用自定义事件之前，要在这个构造组件的 `annotations` 里添加

```javascript
new angular.ComponentAnnotation({
  events: ['update'],
  selector: ''
});
```

触发这个自定义事件的处理函数则可以在另外的构造器里面写

```javascript
this.onUpdate = function (evetn) {
  // do something
}
```
