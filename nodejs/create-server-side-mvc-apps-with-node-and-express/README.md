# Some Note here

## Configuration

- `app.get()`and`app.set()`methods to read and write settings
- standard settings used by Express(with defaults)
  - env - application mode (process.env.NODE_ENV || 'development')
  - trust proxy - trust headers set by reverse proxies (false)
  - jsonp callback name - query string param name (callback)
  - json replacer - callback for JSON stringification (null)
  - case sensitive routing - /foo and /FOO are different (true)
  - strict routing - /foo and /foo/ are different (false)
  - view cache - cache complied views (true when env is production)
  - view engine - default extension for views (no default)
  - views directory containing views (./views)

## Routing

- app.get()
- app.post()
- app.put()
- app.del()

## Route Patterns

- Pattern can be string or regular expressions
- Strings can contain param placeholders
```javascript
app.get('/api/user/:id', function (req, res) {
    var userId = req.params.id;
});
```
- Regular expressions with capture groups can be used for more complex routes
```javascript
app.get(/^\/api\/history\/(\d{4})$/, function (req, res) {
    var year = parseInt(req.params[0]);
});
```

## Requests

- Request objects expose details of HTTP request
  - req.params - route params in URL
  - req.query - query string params
  - req.get() - get header value
  - req.cookies - cookies object (requires middleware)
  - req.body - parsed body (requiraes middleware)
  - req.is() - test content type of request body
  - req.accepts() - content negotiation for response
  - req.url - URL thar matched current route (minus mount point)
  - req.originalUrl - original URL as sent by client
  - req.protocal - http or https
  - req.secure - true if protocal is https
  - req.host - value in Host header
  - req.subdomains - subdomains of host
  - req.path - path in URL
  - req.xhr - true if X-Requested-With: XMLHttpRequest

## Resposes

- Many way to repond to request
  - res.set() - set response headers
  - res.cookie() - and res.clearCookie() - modify reponse cookies
  - res.redirect() - issue 301 or 302 redirect to URL
  - res.send() - write status with string/Buffer/Object/Array
  - res.json() - stringify JavaScript value
  - res.jsonp() - send JavaScript value to callback functinon
  - res.sendfile() - stream contents of file
  - res.download() - stream file with content-disposition: attachment
  - res.render() - render view using pluggable view engine

```javascript
app.get('/products/:sku', function (req, res) {
    Product.findById(req.body.params.sku, function (err, product) {
      if (err) {
        return res.send(500);
      }
      if (!product) {
        return res.send(404);
      }
      res.render('product', product);
    });
});
```

## view engine

- jade
- ejs

## Middleware

- configured with `app.use()` method
- must be installed and require() separately (except for static)

```javascript
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser);
```

## Writing Middleware

Middleware are just functions
- invoked in the other they're app.use()'ed
- route callback functions are just middleware that terminate requests
- middleware that don't generate responses must call next() or request will never end!

```javascript
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url + ' ' + (new Date()));
    next();
});
```

## Error Handlers

- Error handlers are middleware functions with 4 arguments instead of the normal 3- when next() is called with error, all subsequent middleware skipped

```javascript
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
});
```
