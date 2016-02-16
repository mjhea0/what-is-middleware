var express = require('express');
var app = express();

app.use(function (req, res) {
  res.end('Hello, World!');
});

app.listen(3000);