# Getting Started with D3

## Baisc Methods

- `select()` 选择一个区域，进行我们的工作
- `append()` 为这个区域添加一个标签
- `text` 为这个标签添加文本内容
- `attr()` 为添加的标签添加属性

```javascript
d3.select('body')
  .append('p')
  .text('Hello, D3')
  .attr('style', 'color: #abcdef');
```

## Working with SVG

但 D3 并不是用来做这些东西的， D3 主要用于数据的展示，而且是基于 SVG 的。那现在我们来看看它真正的魅力。首先，我们创建一个 `<svg>` 

```javascript
var canvas = d3.select('body')
               .append('svg')
               .attr('width', 500)
               .attr('height', 500);
```

在 [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element) 上我们可以找到很多在 SVG 上使用的元素，例如常见的 `<circle>`，`<rect>`，`<line>` 等等。那我们现在就先做个简单的例子，在 `<svg>` 里画一个矩形

```javascript
canvas.append('rect')
      .attr('width', 400)
      .attr('height', 200);
      .attr('fill', '#abcdef')
```

这时你应该就可以看到一个天空蓝的矩形出现在我们的页面中啦

## Binding with Dataset

好的，我们继续往前走，刚刚说到 D3 是用来做数据展示的，那肯定要有数据呀。而数据一般都是动态获取的。那么 D3 是怎么绑定我们从后台获取回来的数据呢

我们先从一个简单的柱状图开始

```javascript
// bars

var dataset = [10, 20, 30]; // our data

var bars = canvas.selectAll('rect')
                 .data(dataset)
                 .enter()
                 .append('rect')
                 .attr('width', function (d) { return d; })
                 .attr('height', 50)
                 .attr('y', function (d, i) { return i * 55; });
```

这里出现了三个新的方法。

- `selectAll()` 选择所有的指定标签
- `data()` 传入要处理的数据
- `enter()` 返回与数据相对应的点位符

可能有些人很困惑，一开始 `canvas` 里都没有 `rect`，为什么就可以 `selectAll('rect')` 呢？的确，这里是有点奇怪。而我的理解是，我们要先告诉 D3 我们用什么标签去处理我们的数据和我们有多少数据，然后我们用 `enter()` 去返回占位符，每个占位符都会执行 `append()` 和 `attr` 等下面的操作，`d` 就是每个数据的值，`i` 就是数据的下标，类似 `map()` 一样

好吧，其实我也不能说服自己。那就记住就好。但不管怎么说，我们的确做出了一个很丑的柱状图 :)

## Scale Our Data

你看这个柱状图又粗又短不能忍，那就加长一点吧，每个乘 10！

```javascript
.attr('width', function (d) { return d * 10; })
```

棒棒不够多？加多两条！

```javascript
var dataset = [10, 20, 30, 50, 60]; // our data
```

咦？为什么最后两条棒棒一样长。对啦，我们的 `canvas` 才设置了 `500`，怎么可以装下 600 的棒棒呢？所以我们就要求我们的棒棒都会等比例伸缩

D3 给我们提供了很多类型的比例尺。具体当然还是看 [文档](https://github.com/mbostock/d3/wiki/API-Reference#d3scale-scales) 啦

我就举个最简单的线性比例，在我们刚刚的代码基础上，添加一个 `widthScale` 的变量

```javascript
var widthScale = d3.scale.linear()
                   .domain([0, 60])
                   .range([0, 500]);
```

这几行代码的意思就是，我要使用线性比例，数据在 0 ～ 60 之间，范围在 0 ~ 500 之间。最后，还让所有的 `rect` 都使用这个规则

```javascript
.attr('width', function (d) { return widthScale(d); })
```

当然啦，我们棒棒的宽度，高度，甚至填充色都可以 Scale，快来试试吧
