var Readable = require('stream').Readable;
var readable = new Readable;
var count = 0;

readable._read = function () {
  if (++count > 10) {
    return readable.push(null);
  }
  setTimeout(function () {
    readable.push(count + '\n');
  }, 500);
};
readable.pipe(process.stdout);
