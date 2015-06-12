var express = require('express');
var routes = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');

var path = require('path');
var logger = require('morgan');
var methodOverride = require('method-override');
var multer = require('multer');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('images', path.join(__dirname, 'public/images'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
 //Multer is a node.js middleware for handling multipart/form-data.
app.use(multer()); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', photos.list);
app.get('/upload', photos.form);
app.post('/upload', photos.submit(app.get('images')));
app.get('/users', users);
app.get('/photo/:id/download', photos.download(app.get('images')));

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

module.exports = app;