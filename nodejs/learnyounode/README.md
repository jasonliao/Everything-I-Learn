# NodeSchool Tutorials

```bash
$ npm install -g learnyounode
$ learnyounode
```

I think the solution below is better than the official's :p

## HELLO WORLD

```javascript
console.log('HELLO WORLD');
```

## BABY STEPS

```javascript
var args = process.argv.slice(2),
    sum = args.map(Number).reduce(function (pre, cur) {
      return pre + cur;
    });
console.log(sum);
```

## MY FIRST I/O!

```javascript
var fs = require('fs');

var filePath = process.argv[2],
    bufferString = fs.readFileSync(filePath, 'utf8'),
    lineNumber = bufferString.split('\n').length - 1;

console.log(lineNumber);
```

## MY FIRST ASYNC I/O!

```javascript
var fs = require('fs');

var filePath = process.argv[2];

fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) throw err;
  var lineNumer = data.split('\n').length - 1;
  console.log(lineNumer); 
});
```

## FILTERED LS

```javascript
var fs = require('fs');

var directoryPath = process.argv[2],
    fileFormat = process.argv[3];

fs.readdir(directoryPath, function (err, list) {
  if (err) throw err;
  var reg = new RegExp('\.' + fileFormat + '$', 'i');
  list = list.filter(function (l) {
    return reg.test(l);
  });
  console.log(list.join('\n')); 
});
```

```javascript
var fs = require('fs'),
    path = require('path');

var directoryPath = process.argv[2],
    fileFormat = process.argv[3];

fs.readdir(directoryPath, function (err, list) {
  if (err) throw err;
  list = list.filter(function (l) {
    return path.extname(l) === '.' + fileFormat;
  });
  console.log(list.join('\n')); 
});
```

## MAKE IT MODULAR

```javascript
// mymodule.js
var fs = require('fs'),
    path = require('path');

module.exports = function (dirPath, fileFormat, callback) {
  
  fs.readdir(dirPath, function (err, list) {
    if (err) return callback(err);
    list = list.filter(function (l) {
      return path.extname(l) === '.' + fileFormat;
    });
    callback(null, list);
  });

}
```

```javascript
// program.js
var mymodule = require('./mymodule');

var directoryPath = process.argv[2],
    fileFormat = process.argv[3];

mymodule(directoryPath, fileFormat, function (err, matchFiles) {
  if (err) throw err;
  console.log(matchFiles.join('\n'));
});
```

## HTTP CLIENT

```javascript
var http = require('http');

var url = process.argv[2];

http.get(url, function (res) {
  res.setEncoding('utf8');
  res.on('data', console.log);
}).on('error', console.error);
```

## HTTP COLLECT

```javascript
var http = require('http');

var url = process.argv[2];

http.get(url, function (res) {
  var data = '';

  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    data += chunk;
  });
  res.on('end', function () {
    console.log(data.length);
    console.log(data);
  });
}).on('error', console.error);
```

## JUGGLING ASYNC

```javascript
var http = require('http');

var urls = process.argv.splice(2);

httpGet(urls[0], function (value) {
  console.log(value);
  httpGet(urls[1], function (value) {
    console.log(value);
    httpGet(urls[2], function (value) {
      console.log(value);
    });
  });
});

function httpGet (url, callback) {
  var data = '';
  http.get(url, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      callback(data);
    })
  }).on('error', console.error);
}
```

```javascript
var http = require('http');

var urls = process.argv.splice(2),
    count = 0,
    result = [];

function httpGet (index, callback) {
  var data = '';

  http.get(urls[index], function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      result[index] = data;
      count++;

      if (count === 3) {
        console.log(result.join('\n'));
      }
    });
  }).on('error', console.error);
}

for (var i = 0; i < 3; i++) {
  httpGet(i);
}
```

## TIME SERVER

```javascript
var net = require('net'),
    leftpad = require('left-pad');

net.createServer(function (socket) {
  var date = dateFormat(new Date());
  socket.end(date);
}).listen(process.argv[2]);

function dateFormat (date) {
  var year = date.getFullYear(),
      money = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes();
  
  var result = year + '-' + leftpad(money, 2, 0)
                    + '-' + leftpad(day, 2, 0)
                    + ' ' + leftpad(hour, 2, 0)
                    + ':' + leftpad(min, 2, 0)
                    + '\n';
  return result;
}
```

```javascript
// some zero pad function
function zeroPad () {
  return (i < 10? '0' : '') + i;
}

function zeroPad (number, len) {
  var lotsOfZeroes = '0000000000000000000000000';
  return (lotsOfZeroes + String(numer)).slice(-len);
}
```

## HTTP FILE SERVER

```javascript
var http = require('http'),
    fs = require('fs');

http.createServer(function (req, res) {
  var stream = fs.createReadStream(process.argv[3]); 
  stream.pipe(res);
}).listen(process.argv[2]);
```

## HTTP UPPERCASERER

```javascript
var http = require('http'),
    fs = require('fs');

http.createServer(function (req, res) {
  var data = '';
  if (req.method === 'POST') {
    req.on('data', function (chunk) {
      data += chunk.toString().toUpperCase();
    });
    req.on('end', function () {
      res.end(data);
    });
  }

}).listen(process.argv[2]);
```

## HTTP JSON API SERVER

```javascript
var http = require('http');

http.createServer(function (req, res) {
  var url = req.url.split('?')[0],
      queryString = req.url.split('?')[1],
      date = new Date(queryString.split('=')[1]),
      json,
      result;

  if (url === '/api/unixtime') {
      var unixtime = date.getTime()
      json = {
        unixtime: unixtime
      }
  } else if (url === '/api/parsetime') {
    json = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(json));

}).listen(process.argv[2]);
```
