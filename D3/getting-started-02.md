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

## Arcs

之前我们一直在玩直的东西，那现在就来玩玩圆的东西，我们来创建一个圆弧。同样的，D3 已经把我们做好了圆弧的生成器，我们只需要填入我们的配置就可以了

```javascript
var canvas = d3.select('body')
               .append('svg')
               .attr('width', 500)
               .attr('height', 500);

var group = canvas.append('g').attr('transform', 'translate(100, 100)');

var arc = d3.svg.arc()
            .innerRadius(80);
            .outerRadius(100);
            .startAngle(0);
            .endAngle(2 * Math.PI);

group.append('path').attr('d', arc);
```

所有的东西都很简单，除了定义 `arc` 时的那几个函数。`innerRadius()` 就是里面圈的半径，`outerRadius()` 就是外面圈的半径。它们相差多少就是圆弧的宽度了。`startAngle()` 就是圆弧开始的地方，而 `endAngle()` 自然就是圆弧结束的地方，但这里的参数并不是度数，而是圆弧的长。

怎么理解呢，就像刚刚那么例子，开始地方为 0，也就是说从 12 点的方向开始，结束的时候为 `Math.PI * 2`，我们都知道圆的周长为 `2 * PI * r`，所以我们这里只需要填入 `Math.PI * 2`，那么 D3 就会根据
`innerRadius()` 和 `outerRadius()` 来算出圆弧长，所以你想弄一个半弧，我想你已经知道怎么做了

```javascript
endAngle(Math.PI);
```

## The Pie Layout

根据上一部份的内容来做一个 Pie Chart，加入数据，加入样式等等，首先还是一样，准备好画板，当然啦，还有数据

```javascript
var data = [10, 50, 80];

var canvas = d3.select('body')
               .append('svg')
               .attr('width', 500)
               .attr('height', 500);

var group = canvas.append('g').attr('transform', 'translate(100, 100)');
```

像上一节的，我们创建一个圆弧生成器

```javascript
var arc = d3.svg.arc()
            .innerRadius(50)
            .outterRadius(100);
```

为什么这时候不加上之前的起始位置和终止位置呢，因为我们有了数据，所以每个数据都要自定义开始和结束。现在介绍一个新的东西，叫 `pie` layout

`pie` layout 做的就是通过我们的数据，然后返回每一个数据元素的对象，让我们去重新计算或者设置它的开始和结束位置或者设置一些其他的属性等等，那现在就来试一下吧

```javascript
var pie = d3.layout.pie()
            .value(function (d) { return d; });
```

在更进一步之前，来看看 `pie(data)` 会返回什么，返回了一个对象数组，里面每一个对象的 `data` 属性就是我们原来数组里的数值，还有 `startAngle` 和 `endAngle`，那现在每个对象都创建一个 `group`，来组成我们的圆弧

```javascript
var arcs = group.selectAll('.arc')
                .data(pie(data))
                .enter()
                .append('g')
                .attr('class', 'arc');
```

然后就为每一个 `group` 创建一个 `path`，`path` 的 `d` 属性就是 `arc` 这个圆弧生成器

```javascript
arcs.append('path')
    .attr('d', arc);
```

这时你应该看到一个黑色的完整圆弧了，但是怎么用颜色区别开来呢？很简单，先定义一个颜色数组

```javascript
var color = ['#abcdef', '#F44336', '#F8C444'];
```

然后再为每个 `path` 填充色

```javascript
arcs.append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) { return color[i]; });
```

哇，是不是好漂亮，如果标上数值就完成了，快来 `append` 一个 `text` 吧

```javascript
arcs.append('text')
    .attr('transform', function (d) { return 'translate(' + arc.centroid(d) + ')'; })
    .text(function (d) { return d.data; });
```

`arc.centroid()` 这个函数就是找到第一个 `path` 的居中的位置

## The Tree Layout

一棵树主要包含的部分是节点和文本，节点小圈，还有连接节点的线，但是这里的线并不是直直的线，而是很和谐的曲线。这部分我们先来看看这条和谐的线是怎么出来的，一样的，先创建画布

```javascript
var canvas = d3.select('body').append('svg')
               .attr('width', 500)
               .attr('height', 500);
```

这条和谐的曲线的内部算法我们不用知道，因为 D3 已经帮我们做了，我们只要使用它的生成器就可以了，就像之前的直线生成器和圆弧生成器一样。还记得直线生器吗？它需要的是一个点的 `x` 和 `y` 坐标，而这次这个叫对角线生成器，需要的是一个出发点(source)和一个目标点(target)

```javascript
var diagonal = d3.svg.diagonal()
                 .source({ x: 10, y: 10 })
                 .target({ x: 300, y: 300 });
```

好了，我们定义好我们的生成器，就把它放在 `path` 的 `d` 属性里

```javascript
canvas.append('path')
      .attr('d', diagonal)
      .attr('fill', 'none')
      .attr('stroke', 'black');
```

Nice! 

那现在我们就做一棵树吧，老规矩，这里加了一个 `g` 是为了让树在中中间间，好看一点

```javascript
var canvas = d3.select('body')
               .append('svg')
               .attr('width', 500)
               .attr('height', 500)
               .append('g')
               .attr('transform', 'translate(50, 50)');
```

然后我们还需要做一些前期的工作，包括对角线生成器还有 Tree Layout，还有我们的 `data` 对象

```javascript
var data = { /* something you like */ };

var diagonal = d3.svg.diagonal();

var tree = d3.layout.tree()
             .size([400, 200]);
```

好，现在我们就用之前的 `diagonal` 先把优美曲线画出来

```javascript
var nodes = tree.node(data);
var links = tree.links(nodes);

canvas.selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', diagonal)
      .attr('fill', 'none')
      .attr('stroke', '#adadad');
```

上面的 `nodes` 和 `links` 是由 Tree Layout 的方法通过 `data` 生成的，可以通过打印它们来看看究竟是什么。现在下一步就是加上节点啦，也就是那些 `nodes`

```javascript
var node = canvas.selectAll('.node')
                 .data(nodes)
                 .enter()
                 .append('g')
                 .attr('class', 'node')
                 .attr('transfrom', function (d) {
                   return 'translate(' + d.x + ', ' + d.y + ')';
                 });

node.append('circle')
    .attr('r', 5)
    .attr('fill', 'steelblue');
```

如果理解了上面 Pie Layout 的例子，那么这个也就不难理解了。最后加上节点的文字

```javascript
node.append('text')
    .text(function (d) { return d.name; });
```

## Cluster, Pack Layouts

Cluster Layout 和 Tree Layout 基本是一样的，但是 Tree Layout 中的节点永远保持同级关系，而 Cluster Layout 会把所有的 leaf 节点放在同一水平线上

Pack Layout 就像是维恩图，现在就来实现一下，`canvas` 和之前的一样，然后把 `tree` 变成 `pack` layout

```javascript
var pack = d3.layout.pack()
             .size([300, 300])
             .padding(10);
```

然后像之前 Tree Layout 创建节点一样

```javascript
var nodes = pack.nodes(data);

var node = canvas.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return 'translate(' + d.x + ', ' + d.y + ')';
      });

node.append('circle')
    .attr('r', function (d) { return d.r; })
    .attr('fill', 'steelblue')
    .attr('opacity', '0.25')
    .attr('stroke', '#adadad')
    .attr('stroke-width', '2');

node.append('text')
    .text(function (d) {
      return d.children ? '' : d.name;
    });
```
