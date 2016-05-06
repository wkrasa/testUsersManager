
/**
 * Module dependencies.
 */
loggers = require('./infrastructure/loggers');
loggers.logInfo.info('Server starting');

var config = require('./config')('dev');
var express = require('express');
var http = require('http');
var path = require('path');
var lessMiddleware = require("less-middleware");
var tokenMgr = require('./infrastructure/token');
var mongoose = require('mongoose');
//var I18n = require('i18n-2');
var translationsManager = require('./infrastructure/translationsManager');

var app = express();

// all environments
app.set('port', config.expressPort);

app.locals.__ = function (text) {
    return translationsManager.translate(text);
}

app.use(function (req, res, next) {
    var cultutre = config.culture;
    var user = null;
    if (req.session) { user = req.session.user; }   
    if (user) { cultutre = user.lang; }
    // req.i18n.setLocale(locale);
    translationsManager.setCulture(cultutre);
  
    next();
});

app.set('views', path.join(__dirname, config.viewsFolder));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: tokenMgr.generateToken(32), cookie: { maxAge: 60000 } }));
app.use(require('./infrastructure/authorization/authModule').onRequestStart);

//db schema initialization
require('./domain/user');
require('./domain/group');

//validation
var validationSrv = require('./infrastructure/validationService');
validationSrv.registerValidatorsFolder(path.join(__dirname, 'validators'));

//db initialization
require('./infrastructure/dbConnection').dbInit(config.dbConnectionString);

app.use(app.router);
app.use(lessMiddleware(path.join(__dirname, config.publicFolder), {
    debug: 'development' == app.get('env'),
    force: true
}));
app.use(express.static(path.join(__dirname, config.publicFolder)));


//var routes = require('./routes');

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    loggers.logError.error('Not found %s', req.url);
    var err = new Error('Not Found:' + req.url);
    err.status = 404;
    next(err);
});

//app.use(err, req, res, next) {
//    loggers.logError('Error while procesing request: %s', JSON.stringify(err));
//    if (res.headersSent) {
//        return next(err);
//    }
//    res.status(500);
//    res.render('error', { error: err });
//});

var IndexController = require('./routes/index.js');
var ctrl = new IndexController();
ctrl.init(app);
var AccountController = require('./routes/account.js');
ctrl = new AccountController();
ctrl.init(app);
var ViewController = require('./routes/view.js');
ctrl = new ViewController();
ctrl.init(app);
var TranslationsController = require('./routes/tranlations.js');
ctrl = new TranslationsController();
ctrl.init(app);
var GroupsController = require('./routes/groups.js');
ctrl = new GroupsController();
ctrl.init(app);
var UsersController = require('./routes/users.js');
ctrl = new UsersController();
ctrl.init(app);
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
    loggers.logInfo.info('Express server listening on port ' + app.get('port'));
});
