# Getting Started with D3

## Transitions in D3

这一小节是主要是讲怎么让东西动起来，首先，我们有个波波。还记得怎么写出来吗？

```javascript
var canvas = d3.select('body')
               .append('svg')
               .attr('width', 500)
               .attr('height', 500);

var circle = canvas.append('circle')
                   .attr('cx', 50)
                   .attr('cy', 50)
                   .attr('r', 25);
```

ok，现在我们有了一个小黑波了。现在就调用 `transition` 方法，让他动起来

```javascript
circle.transition()
      .attr('cx', 150);
```

可以看到我们的小黑波可以从圆心在横坐标 50 的地方，滑动了 150 的地方，非常顺滑。但一般动画都有几个关键的参数，例如 duration(时间长短)，delay(延时)，ease(动画效果) 这些都可以设置

```javascript
circle.transition()
      .duration(1500)
      .delay(1000)
      .ease('bounce')
      .attr('cy', 150);
```

当然啦，这些 transition 都是可以连着调动的，所以你可以一个动画一个动画接着执行。例如球丢了然后就滚走了

```javascript
circle.transition()
      .delay(1000)
      .duration(1500)
      .ease('bounce')
      .attr('cy', 150)
      .transition()
      .duration(3500)
      .attr('cx', 750);
```

最后要介绍的就是 `each` 这个 control，它可以控制一个动效 "start", "end" 和 "interrupt" 这几个事件，例如，我们想让这个波在结束之后，回到一开始的地方

```javascript
circle.transition()
      .delay(1000)
      .duration(1500)
      .ease('bounce')
      .attr('cy', 150)
      .transition()
      .duration(3500)
      .attr('cx', 750)
      .each('end', function () { d3.select(this).attr('cx', 50).attr('cy', 50); });
```

关于 [Transitions](https://github.com/mbostock/d3/wiki/Transitions) 这一块官方文档写得也很详细，有很多方法不仅仅是对于一个图形的，还可以对多个图形统一处理的，快去看一下吧！

## Working With Arrays

一些对数组的操作，详情可以直接查看 [API](https://github.com/mbostock/d3/wiki/Arrays) 

## Loading External Data

怎么加载外部的数据来形成我们想要的数据展示形式呢？这一节我们就来看看，首先我们来定义一个外部的 json 数据 `data.json`

```json
[{
  "name": "Jason",
  "age": 22
}, {
  "name": "Drake",
  "age": 18
}, {
  "name": "Fred",
  "age": 30
}]
```

那么现在一切都变得很简单了，用的都是这们之前学过的内容，现在就当作复习吧

```javascript
d3.json('data.json', function (data) {

  var canvas = d3.select('body').append('svg')
                 .attr('width', 500).attr('height', 500);

  canvas.selectAll('rect')
        .data(data).enter()
        .append('rect')
        .attr('width', function (d) {
          return d.age * 10;
        })
        .attr('height', 45)
        .attr('y', function (d, i) {
          return i * 50;
        })
        .attr('fill', '#abcdef');

  canvas.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('fill', '#fff')
        .attr('y', function (d, i) {
          return i * 50 + 26;
        })
        .text(function (d) {
          return d.name + "'s age";
        });

});
```
