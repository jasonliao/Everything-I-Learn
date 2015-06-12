var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var seed;
var result;

var getRandomArray = function (seed) {
  var arr = [];
  while (arr.length < 270) {
    var flag = false;
    var randomNumber = ((Math.floor(Math.random() * 800) + 1 + seed) % 800);
    for (var j = 0; j < arr.length; j++) {
      if (randomNumber == arr[j] || randomNumber == 0) {
        flag = true;
        break;
      }
    }
    if(!flag) {
      arr.push(randomNumber);
    }
  }
  return arr;

};

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/bower_components')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
  res.render('index', {
    seed: seed,
    result: result
  });
});

app.post('/generate', function (req, res) {
  var date = new Date();
  var number7 = date.getMilliseconds() + 1;  //获取当时时间的毫秒数
  var numbers = [];
  for (var i = 1; i < 7; i++) {
    numbers.push(Number(req.body['number' + i]));
  }
  numbers.push(number7);  //获得一个7个三位数的数组
  seed = numbers.reduce(function (pre, cur) {
    return Number((pre * cur).toString().slice(-4, -1));
  });
  res.redirect('/#firstPage/slide3');
});

app.post('/getResult', function (req, res) {
  result = getRandomArray(seed);
  res.redirect('/#firstPage/slide4');
});

app.listen('3000', function (req, res) {
  console.log('http://localhost:3000');
});
