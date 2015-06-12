var EventEmitter = require('events').EventEmitter;
//var Counter = function (init) {
//  this.increment = function () {
//    init++;
//    this.emit('incremented', init);
//  }
//}
//Counter.prototype = new EventEmitter();
//var counter = new Counter(10);
//var callback = function (count) {
//  console.log(count);
//}
//counter.addListener('incremented', callback);
//
//counter.increment();
//counter.increment();

//function getEmitter () {
//  var emitter = new EventEmitter();
//  process.nextTick(function () {
//    emitter.emit('start');
//  })
//  return emitter;
//}
//
//var myEmitter = getEmitter();
//myEmitter.on('start', function () {
//  console.log('Started');
//});

