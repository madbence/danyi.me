'use strict';

var koa = require('koa');
var serve = require('koa-static');

var app = koa();

app.use(function*(next) {
  if (this.path == '/') {
    this.path = '/index.html';
  }
  yield* next;
});

app.use(serve('./public'));

app.listen(process.env.PORT || 3000);
