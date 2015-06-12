var fs = require('fs');
var writeStream = fs.createWriteStream('./counter', {
  flags: 'w',
  mode: 0666
});
