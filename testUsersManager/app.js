﻿
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var lessMiddleware = require("less-middleware");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());

app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(express.session({ secret: '1234567890QWERTY', cookie: { maxAge: 60000 } }));
app.use(app.router);
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(lessMiddleware(path.join(__dirname, 'public'), {
    debug: true,
    //dest: __dirname,
    force: true
}));
app.use(express.static(path.join(__dirname, 'public')));


var routes = require('./routes');

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
