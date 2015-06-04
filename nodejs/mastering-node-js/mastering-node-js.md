# Mastering Node.js

the note I read Mastering Node.js

## Understanding Asynchronnous Event-Driven Programming

### process.nextTick

`process.nextTick` is similar to the faliliar `setTimeout` method in which it delays execution of its callback function until some point in the future. But the difference is a list of all requested `nextTick` callbacks are placed at the head of the event queue and is processed, in its entirety and in order, before I/O or timer events and after execution of the current script

`process.nextTick`类似`setTimeout`这个方法, 他们都是在延迟回调函数的执行. 但不同的是所有的`nextTick`回调会按顺序地放在整个回调队列的最开始, 在I/O和timer的前面, 在当前脚本所执行的代码后面.

### setImmediate

`setImmediate` is technically a member of the class of timer(`setTimeout`, `setInterval`). However, there is no sense of time associated with it -- there is no number of milliseconds to wait arguments to be sent. This method is really more of a sister to `process.nextTick`, differing in one very important wat: while callbacks queued by `nextTick` will execute before I/O and timer events, callbacks queued by `setImmediate` will be called after I/O events

`setImmediate`和`setTimeout`, `setInterval`看起来很像, 但是不需要传时间参数, 它更像是`process.nextTick`的姐妹, 一个很重要的不同就是, `nextTick`是放在回调队列的前端, 在I/O和timer的前面, `setImmediate`则是在I/O的后面

## Streaming Data Across Nodes and Clients
