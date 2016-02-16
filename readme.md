# What is Middleware?

Let's start with a basic HTTP server in vanilla Node...

```javascript
var http = require('http');

var server = http.createServer(function(req, res){
  res.end('Hello, World!');
});

server.listen(3000);
```

Take note of the callback function passed to `http.createServer()` - It defines how every request is handled. Simple, right?

Let's add Express into the mix...

```javascript
var express = require('express');
var app = express();

app.use(function (req, res) {
  res.end('Hello, World!');
});

app.listen(3000);
```

Here we passed the callback to `app.use()` rather than passing it directly to `http.createServer()`. This is a middleware function. Such functions are used to defines the steps that a request must go through before a response is returned (or an error is thrown).

So, while middleware is just made up of functions, `app.use` allows us to define such functions for the request to flow through:

```javascript
var express = require('express');
var app = express();

function firstMiddlewareFunction (req, res, next) {
  console.log('first!');
  next();
}

function secondMiddlewareFunction (req, res) {
  console.log('second!');
  res.end('Hello, World!');
}

app.use(firstMiddlewareFunction);
app.use(secondMiddlewareFunction);
app.listen(3000);
```

In this example the request hits the `firstMiddlewareFunction` function, which calls `next()`, passing the request to the next middleware function, `secondMiddlewareFunction()`.

Order matters here. Try switching the middleware functions:

```javascript
app.use(secondMiddlewareFunction);
app.use(firstMiddlewareFunction);
```

What happened?

The `firstMiddlewareFunction()` did not get called since a response was returned in the `secondMiddlewareFunction()` function.

What happens if an error occurs in one of the middleware functions?

Simple. We need to define middleware functions that specifically handle such errors and return a proper response.

```javascript
var express = require('express');
var app = express();

function ensureAuthenticated(req, res, next) {
  if (false) {
    next();
  } else {
    return next(Error('You must be logged in to do that!'));
  }
}

function firstMiddlewareFunction (req, res, next) {
  console.log('first!');
  next();
}

function secondMiddlewareFunction (req, res) {
  console.log('second!');
  res.end('Hello World!');
}

function errorHandlerFunction(err, req, res, next) {
  res.end(err.message);
}

app.use(ensureAuthenticated);
app.use(firstMiddlewareFunction);
app.use(secondMiddlewareFunction);
app.use(errorHandlerFunction);
app.listen(3000);
```

Here the request hits the `ensureAuthenticated()`. Pretend this function *actually* checks to see if a user is logged in. If so, `next()` is called sending the request to `firstMiddlewareFunction()`. If not, `next()` is called with an error argument, which sends the request to the error handler, skipping over the other middleware functions.
