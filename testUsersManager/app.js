
/**
 * Module dependencies.
 */
var config = require('./config')('dev');
var express = require('express');
var http = require('http');
var path = require('path');
var lessMiddleware = require("less-middleware");
var passport = require('passport');
var tokenMgr = require('./infrastructure/passport/token');
var initPassport = require('./infrastructure/passport/init');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./domain/user.js');
var User = mongoose.model('User');

//mongoose.connect(config.dbConnectionString);
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

//db.once('open', function () {
//	console.log('connected to: ' + config.dbConnectionString);
//});
//User.find({}, function (err, res) {

//});

var app = express();

// all environments
app.set('port', config.expressPort);
app.set('views', path.join(__dirname, config.viewsFolder));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());

app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(express.session({ secret: tokenMgr.generateToken(32), cookie: { maxAge: 60000 } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

var flash = require('connect-flash');
app.use(flash());
initPassport(passport);

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
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var IndexController = new require('./routes/index.js');
var ctrl = new IndexController();
ctrl.init(app);
var AccountController = new require('./routes/account.js');
ctrl = new AccountController();
ctrl.init(app);
var ViewController = new require('./routes/view.js');
ctrl = new ViewController();
ctrl.init(app);
//app.get('/views/:ctrl/:view', routes.view);
//app.get('/', routes.index);
//app.get('/home', routes.home);
//app.get('/about', isAuthenticated, routes.about);
//app.get('/contact', routes.contact);
//app.get('/login', routes.loginForm);
//app.post('/login', passport.authenticate('login', {
//        //successRedirect: '/',
//        failureRedirect: '/login',
//        failureFlash : true
//    }), 
//	routes.loginPost, 
//    function (req, res) {   
//        res.redirect('/');
//    });
//app.get('/logout', routes.logout);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port')); 
});
