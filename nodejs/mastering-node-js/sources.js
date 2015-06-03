var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var pos = 0;
var messager = new EventEmitter();

messager.on('message', function (msg) {
  console.log(++pos + ' MESSAGE: ' + msg);
});

console.log(++pos + ' FIRST');

process.nextTick(function () {
  console.log(++pos + ' NEXT');
});

setTimeout(function () {
  console.log(++pos + ' QUICK TIMER');
}, 0);

setTimeout(function () {
  console.log(++pos + ' LONG TIMER');
}, 10);

setImmediate(function () {
  console.log(++pos + ' IMMEDIATE');
});

messager.emit('message', 'Hello!');

fs.stat(__filename, function () {
  console.log(++pos + ' FIRST STAT');
});

fs.stat(__filename, function () {
  console.log(++pos + ' LAST STAT');
});

console.log(++pos + ' LAST');
