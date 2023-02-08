var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const proxy = require('http-proxy-middleware').createProxyMiddleware;
const proxies = require('./routes/index');

var app = express();


proxies.forEach(p => {
    app.use(p.url, proxy(p.proxy)); 
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
