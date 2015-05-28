# Array.prototype.?

## Array.prototype.slice

在看JavaScript框架设计的时候，在种子模块里看到数组化，像arguments和HTMLCollection这些类数组对象，不能直接使用数组的方法

在大部分的浏览器下，通过`[].slice.call()`就可以转换了，[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)里也有把类数组对象转成数组的例子

但字符串调用这个方法的时候，生成就是每个字符组成的数组

```javascript
[].slice.call('Hello') //['H', 'e', 'l', 'l', 'o']
//  同时下面这两种方法也可以
[].map.call('Hello', function (s) {
	return s;
}); //['H', 'e', 'l', 'l', 'o']
'Hello'.split(''); //['H', 'e', 'l', 'l', 'o']
```

我们就可以推出，slice里的内部大致实现

```javascript
var spliceLikeMethod = function (start, end) {
	var start = start || 0,
			end = end || this.length,
			result = [];
	for(var i = start; i < end; i++) {
		result.push(this[i]);
	}
	return result;
};
//test
function list () {
	return spliceLikeMethod.call(arguments);
}
console.log(spliceLikeMethod.call('Hello')); //['H', 'e', 'l', 'l', 'o']
console.log(list(1,2,3)); //[1, 2, 3]
```

## Array.prototype.map

在codewars里看到一个这样的题目，'123'->[1, 2, 3]，我们可以用刚刚上面的三个方法把'123'转成['1', '2', '3']，那怎么转成我们想要的效果呢，有什么方法是可以数组转数组呢?
Yep, we got Array.prototype.map.

再来看看[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)关于这个方法的描述

map方法接一个回调函数，回调函数传入三个函数，当前值、索引、原数组。所以我们不可以用`['1', '2', '3'].map(parseInt(i))`来完成我们的效果，原因在MDN里说得很清楚，我们可以`['1', '2', '3'].map(Number(i))`来实现

里面有几个Example，我们还是一样，根据由这些Example去推出map里面的大致实现

```javascript
var mapLikeMethod = function (callback) {
	var arr = [];
	for(var i=0; i<this.length; i++) {
		arr.push(callback(this[i], i, this));
	}
	return arr;
};
// test
var array = mapLikeMethod.call([1, 2, 3], function (num) {
	return num * 2;
});
var strArr = mapLikeMethod.call('Hello', function (s) {
	return s;
});
console.log(array); // [2, 4, 6]
console.log(strArr); // ['H', 'e', 'l', 'l', 'o']
```

## Array.prototype.join

join方法就是可以让你用你想用的分隔符把数组里的每个元素连接起来组成一个字符串，就像这样

```javascript
['Hello', 'world'].join('-'); //'Hello-world'
```

我们还可以用join方法来实现repeat这个功能

```javascript
var repeat = function (str, times) {
	return Array.prototype.join.call({
		length: times + 1
	}, str);
};
console.log(repeat('str', 2)); //strstr
```

这个实现的原理是把我们要复制的字符串当成了分隔符，由一个伪数组调用，因为伪数组里的值都为undefined，自动转成了`''`，所以就相当于把分隔符直接连在一起了，我们也可以推出join方法的大致实现

```javascript
var joinLikeMethod = function (separator) {
	var result = this[0] || '',
			length = this.length,
			i = 1;
	// 默认separator为','
	separator = separator !== '' ?
		separator || ',' :
		separator;
	for(; i < length; i++) {
		result += separator;
		result += this[i] || '';
	}
	return result;
}
```

## Array.prototype.reduce

codewar上有Flatten这道题，才去真正了解reduce这个方法，这个方法接受一个回调函数和一个初始值。reduce方法回把四个参数放到回调函数里，分别是`perviousValue`、`currentValue`、`index`、`array`，后面三个不用说了，但第一个参数要说说，如果reduce的第二个参数，即初始值有传入，那`perviousValue`一开始就是该初始值，后面则是前一次回调函数的返回值，循环从数组第一个索引开始。如果初始值没有传入，那一开始就是这个数组的第一个索引，循环也会从第二个索引开始。

例如这个实现 `squareSum([1, 2, 2]); //should return 9`

```javascript
var squareSum = function (numbers) {
	return numbers.reduce(function (sum, n) {
		return n*n + sum;
	}, 0);
}
console.log(squareSum([1, 2, 2])); // 9
```

我们来看看下面这个问题

```javascript
var arr = [{x:1}, {x:2}, {x:4}];
var newArr = arr.reduce(function (a, b) {
	return a.x + b.x;
});
console.log(newArr); // NaN
```

为什么会NaN，刚刚一开头那段话已经提到了，初始值没有传入，所以a就是我们的第一个对象`{x:1}`，第一次循环之后，a就是上一次循环的返回值，所以第二次循环的时候，a就变成了3，所以`a.x`就已经不存在了。所以就会出现错误，所以正确的应该是下面这样

```javascript
var arr = [{x:1}, {x:2}, {x:4}];
var newArr = arr.reduce(function (a, b) {
	return {x: a.x + b.x};
});
console.log(newArr.x); // 7 
```
































