# JavaScript Generators - They change everything

## How Generators work

```javascript
var myGen = function* () {
  var one = yield 1;
  var two = yield 2;
  var three = yield 3;
  console.log(one, two, three);
}

var gen = myGen();

console.log(gen.next()); // {value: 1, done: false}
console.log(gen.next()); // {value: 2, done: false}
console.log(gen.next()); // {value: 3, done: false}
// undefined, undefined, undefined
console.log(gen.next()); // {value: undefined, done: true}
console.log(gen.next()); // {value: undefined, done: true}
```

```javascript
console.log(gen.next()); // {value: 1, done: false}
console.log(gen.next(3)); // {value: 2, done: false}
console.log(gen.next(4)); // {value: 3, done: false}
// 3, 4, 5
console.log(gen.next(5)); // {value: undefined, done: true}
```

## Use Generator in promise

```javascript
// give me a generator
function smartCoed (generatorsb) {
  // get the generator ready to run
  var gen = generator();
  // get my first yielded value
  var yieldVal = gen.next();
  // if it's a promise, wait for it to fulfill and pass value back into the generator
  if (yieldVal.then) {
    // it's a promise!!
    yieldVal.then(gen.next);
  }
}
```
