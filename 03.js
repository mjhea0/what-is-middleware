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

app.use(secondMiddlewareFunction);
app.use(firstMiddlewareFunction);
app.listen(3000);