# Getting Started with D3

## Paths

svg 给我们提供了一个 `path` 的组件，它可以用来画出任何我们可想要的形状，并且把这些形状的信息都放在 `d` 这个属性里面。

但是一般 `d` 的属性值都是很复杂的，我们很难手写出来，而 D3 则给我们提供了 path 的生成器，我们现在就来看看吧。我们还是像以前一样，创建一个 svg 画布

```javascript
var canvas = d3.select('body')
               .append('svg')
               .attr('width', 500)
               .attr('height', 500);
```

然后我们创建一个 json 数据，后面我们会用这个数据里的点，用直线连成一个图案，我做了一个正方形

```javascript
var data = [{
  x: 0, y: 0
}, {
  x: 0, y: 100
}, {
  x: 100, y: 100
}, {
  x: 100, y: 0
}, {
  x: -5, y: 0
}];
```

现在，我们再来重温一下 group 的使用方法，建立一个组

```javascript
var group = canvas.append('g').attr('transform', 'translate(100, 100)');
```

然后就可以在 group 里画 path 啦

```javascript
group.selectAll('path')
     .data([data]).enter()
     .append('path')
     .attr('d', line)
     .attr('fill', 'none')
     .attr('stroke', '#000')
     .attr('stroke-width', 10);
```

这里有两个要注意的地方，一是我们的 `data` 外层为什么要包裹多个一个数组，那是因为我们要把这个 `data` 里面的所有点，组成一个 `path`，如果不在外层加多一个数组，就会有 `data.length` 个 `path` 了。第二个就是看到 `d` 属性的值了吗？ `line` 是什么东西，刚刚说了，决定一个 `path` 的显示就是靠 `d` 这个属性，所以这个 `line` 其实就是 d3 给我们提供的 path 生成器，现在我们来补充定义一个 `line`

```javascript
var line = d3.svg.line()
             .x(function (d) { return d.x; })
             .y(function (d) { return d.y; });
```

这样的意思就是，把我们数据里的所有点，都用直线连上，并返回一个 path 的值
