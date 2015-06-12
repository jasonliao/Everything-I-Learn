var express = require('express');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportHttp = require('passport-http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var app = express();

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(verifyCredentials));

passport.use(new passportHttp.BasicStrategy(verifyCredentials));

function verifyCredentials (username, password, done) {
   if (username === password) {
     return done(null, { id: username, name: username });
   } else {
     return done(null, null);
   }
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, { id: id, name: id });
});

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send(403);
  }
}

app.get('/', function (req, res) {
  res.render('index', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

app.use('/api', passport.authenticate('basic', {session: false }));

app.get('/api/data', ensureAuthenticated, function (req, res) {
  res.json([
    { value: 'foo' },
    { value: 'bar' },
    { value: 'boo' }
  ]);
});

app.listen(3000, function () {
  console.log('http://localhost:3000');
});


