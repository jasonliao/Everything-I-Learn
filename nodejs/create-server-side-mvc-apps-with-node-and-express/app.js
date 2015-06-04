var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var todoItems = [{
  desc: 'foo'
}, {
  desc: 'bar'
}];

app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'bower_components')));

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Hello',
    items: todoItems
  });
});

app.post('/add', function (req, res) {
  var newItem = req.body.newItem;
  todoItems.push({desc: newItem});
  res.redirect('/');
});

app.listen(3000, function () {
  console.log('Here I am');
});
