# ES6 in Depth: Interators and the for-of loop

深入了解ES6是介绍JavaScript第六版新特性的一个系列。

你是怎么循环遍历数组里的元素的？当JavaScript在二十年引进来的时候，你都会向下面那样做
```javascript
for (var index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}
```

ES5之后，你会用内置方法`forEach`
```javscript
myArray.forEach(function (value) {
  console.log(value);
});
```

这个比之前的方便一点点，但是还是有一个小小的缺点：那就是你不可以用`break`来跳出这个循环或者用`return`在函数里返回。

如果有一个`for`循环的语法可以循环数组里的元素那肯定是棒棒哒。

`for-in`循环怎么样
```javascript
for (var index in myArray) {
  console.log(myArray[index]);
}
```

这是一个不好的方法，下面是原因：

- 代码里分配给index的值是字符串的"0","1","2"等等，不是真正的数字。但你是不需要string的算术逻辑("2" + 1 = "21")，这是最不方便的。
－ 循环体不仅仅会循环数组里的元素，还会有其他别人加进去的属性。例如，如果你的数组里有一个可以遍历的属性myArray.name，那么这个循环就会执行多一次`index == number`，尽管这个属性是数组原型键上的属性，也会被访问得到。
－ 更惊人的是，在某些情况下，这串代码会不按顺序地访问数组里的元素。

简单来说，`for-in`是为老式的对象工作，对数组来说，它并不是很好。

## The mighty `for-of` loop (威武的`for-of`循环)

还记得上星期我说过ES6不会让你已经写好的JavaScript代码不能执行，有很多的网站还是依赖`for-in`来遍历元素，对的，即使是对数组的操作。所以毫无疑问我们应该"修复"`for-in`方法，让我们在数组中使用它时可以更加的有用。在ES6中唯一的办法就是添加一个新的循环语法。

这就是`for-of`

```javascript
for (var value of myArray) {
  console.log(value);
}
```

嗯，看起来也不是那么的威武呀，好好好，我们来看看它有哪几把刷子。现在我们先记下这些

－ 这是目前为止，最简洁，最直接地遍历数组元素的方法。
－ 它避免了`for-in`的所以陷阱
－ 不像`forEach()`，它可以`break`，`continue`，和`return`

`for-in`方法是循环对象属性的
`for-of`方法是循环数据的，像数组里的元素，但却不仅仅是这样。

## Other collection support `for-of` too (其他的集合也支持`for-of`)

`for-of`不仅仅是为数组设计。对伪数组对象也起作用，例如DOM NodeLists.

它同时对字符串起作用，还可以处理Unicode的字符序列
```javascript
for (var chr of "😺😲A") {
  alert(chr);
}
```

它对`Map`和`Set`对象也同样起作用。

对喔，你还没有听说过`Map`和`Set`对象，好吧，他们是ES6的新特性。我们将会在不久之后发布关于他们的文章。如果你已经在其他语言里了解过`Map`和`Set`，那就不会有太大的惊讶。

例如，一个`Set`对象有利于我们去重
```javascript
// make a set from an array of words
var uniqueWords = new Set(words);
```

一旦你得到了一个`Set`，你可能就会去循环他里面的内容。那就很容易了：
```javascript
for (var word of uniqueWords) {
  console.log(word);
}
```

而`Map`就有一点点的不同，它里面的data是键值对，所以你想把key和value解构，把他们当做两个分开的变量：

```javascript
for (var [key, value] of phoneBookMap) {
  console.log(key + "'s phone number is: " + value);
}
```

解构是一个新的ES6特性而且对我们之后的博文是一个很好的话题。我应该把他记下来。

到此，你可以想像得到，JavaScript已经有一些很不同的集合类，或者以后会更多。`for-of`就是为了你更好地去使用他们的时候而设计的。

`for-of`对老式的对象并不起作用，但如果你想支遍历一个对象的属性，你即可以使用`for-in`，因为`for-in`就是为了做这个的，或者你也可以建立一个`object.key()`：
```javascript
for (var key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}
```

## Under the hood (实现原理)

> "Good artists copy, great artists steal." —— Pablo Picasso

加进去ES6的这些新特性并不是凭空出来的。大多数都是已经在其他语言上被试过和被证明过。

`for-of`循环，类似于C++，Java，C#和pathon等等，它都是与他们语言和标准库所提供的数据结构工作的。但它在不同语言也会有不同的扩展。

像`for/forEach`在其他语言中一样，`for-of`完全靠函数调用执行。我们所说的`Arrays`,`Maps`,`Sets`,和其他对象和共同之处在于他们都有遍历的方法

就像你会加一个`myObject.toString()`方法去任意一个对象然后JavaScript就突然间知道怎么把对象转成字符串，你也可以加一个`myObject[Symbol.iterator]()`方法然后突然间JavaScript也会知道怎么去循环遍历这个对象

例如，假设你在用jQuery，而且你也很喜欢`.each()`方法，但你也会想jQuery的对象可以使用`for-of`，那怎么做呢：
```javascript
jQuery.prototype[Symbol.iterator] = 
  Array.prototype[Symbol.iterator];
```

好，我知道你在想什么，这[Symbol.iterator]语法怎么那么奇怪。这里发生了什么？这里要的是方法的名字。标准委员可能会调用`iterator()`这个方法，但是你现存的一些对象可能也会有`iterator()`这个方法，而且还是有一点问题的。所以标准就用一个符号来代替这个方法的名字，而不是用字符串。

符号在ES6中是新的东西，我们会以在之后的博文中介绍。现在你需要知道的是，标准定义了一个全新的符号，像`[Symbol.iterator]()`，它是来保证我们不会与现存的代码冲突。不好的是语法有一点点的怪异。但你却可以付一点点的代价，来享受这种多功能的新特性和出色的向后兼容。

有`[Symbol.iterator]()`方法的对象被称为可遍历对象，在接下来的几个星期里，我们将会看到可遍历对象这个概念会已经出现，不仅仅在`for-of`里，还会在`Map`和`Set`的构造里，解构赋值，还有新的操作符

## Iterator object (遍历对象)

现在，你将会有机会自己去实现一个迭代器。我们将会在下星期告诉你为什么，但现在我们先来看看一个迭代对象是长什么样子的

`for-of`循环由一个在集合中的`[Symbol.iterator]()`方法调用开始。这个方法会返回一个新的迭代对象。迭代对象可以是任意的一个对象，只要有一个`next()`的方法；`for-of`会执行马上执行这个方法，一次循环进行一次。下面就是一个最简单的迭代对象：
```javascript
var zeroesForeverIterator = {
  [Symbol.iterator]: function () {
    return this;
  },
  next: function () {
    return {
      done: false,
      value: 0
    };
  }
}
```

每次`next()`这个方法被调用，都会返回相同的东西，告诉`for-of`循环第一，我们还没有完成遍历，第二，下一值为0。这意味`for(value of zeroesForeverIterator) {}`会是一个死循环，当然，典型的循环不会是这样的。

这个迭代器有`value`和`done`属性，像一般其他语言的迭代器的工作原理并不一样，在Java中，迭代器有`hasNext()`和`next()`方法。在Python中，它只有`next()`这一个方法，但它还会抛出`StopIterator`来告诉你没有再可以遍历的元素了。但这三种设计最后都是返回相同的信息。

一个迭代对象还可以选择性地实现`.return()`或`throw(exc)`方法。`for-of`循环会在报错或者你`break`和`return`之后调来`.return()`方法。迭代器可以当你需要清理或者释放一些东西的时候来实现`.return()`方法。大多数的迭代对象都不需要实现它。`.throw(exc)`则是更加特别：`for-of`循环根本就不会调用它。但我们会在下一个星期听到更多关于它的东西。

现在我们已经掌握了全部的细节，我们可以拿一个简单的`for-of`循环来重写它底层方法调用。

首先是一个`fot-of`的循环
```javascript
fot (VAR of ITERATOR) {
  STATMENTS
}
```

这是一个大概的环境，用底层的方法和一些临时的变量：
```javascript
var $iterator = ITERATOR[Symbol.iterator]();
var $result = $iterator.next();
while (!$result.done) {
  VAR = $return.value;
  STATMENTS
  $result = $iterator.next();
}
```

这串代码没有展示`.return()`方法怎么处理。我们可以加上去，但是我认为这只会让它更难懂，`for-of`是很容易使用，但它底层还是有很多其他东西的。

## When can I start using this? (什么时候可以用呀)

`for-of`在现在所有Firefox版本中都支持，如果你想让Chrome支持，就要到`chrome://flags`里打开"Experimental JavaScript"。它在微软的Edge也同样得到支持，但在IE中却不可以。如果你想使用这个新的语法，你就要去兼容IE和Safari，你可以使用[Babel](http://babeljs.io/)和Google的[Traceur](https://github.com/google/traceur-compiler)编译器去把你的ES6转成ES5。

在服务器端，你不需要编译器，你可以在io.js，node使用`for-of`

## {done: true} (完成)

哇！

好了，今天就差不多了，但是对于`for-of`循环来说还远远未完成。

在ES6中还有一种对象可以和`for-of`完美地工作，我没有提出来是因为那是下星期的话题。我认为那是ES6最神奇的东西，如果你没有遇到过像C#或者Python这样的语言，你一开始可能会觉得难以置信。但那却是写一个迭代器最简单的方法，它对重构很有作用，它可能还会改变你写异步代码的方式，不管是在客户端还是服务端。所以跟随我们，我们下个星期将会深入了解ES6的生成器。
