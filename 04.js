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