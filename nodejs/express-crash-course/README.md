# Express.js Crash Course

## What is Express

- Minimal "unopinionated" web framework
- Thin layer over core Node.js http module
- Leverages various middleware packages to provide useful functionality, such as
  - parsing HTTP headers, request parameters and bodies
  - parsing cookies, etc
  - automatic reponse headers based on data types
- MVC-like structure and routing is available

## res.send

```javascript
res.send('<h1>Hello,World</h1>'); //autimatic -> text/html
```

```javascript
res.header('content-type','text/plain');
res.send('Hello, World'); // you got to tell it -> text/plain
```

```javascript
res.send(new Buffer('Hello, World')); // application/octet-stream
```

```javascript
res.sned({ message: 'Hello,World' }); // automatic -> json`
```

```javascript
res.sned([ 'Hello,World' ]); // automatic -> json`
```
