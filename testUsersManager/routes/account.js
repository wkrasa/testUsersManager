var tokenMgr = require('../infrastructure/passport/token');
var passport = require('passport');

var util = require('util');
var BaseController = require('../infrastructure/baseController.js');
/*
 * AccountController
 */
var AccountController = function () {
    AccountController.super_.apply(this, arguments);
}
var proto = AccountController.prototype;
util.inherits(AccountController, BaseController);

proto.login  = function (req, res, next) {
    passport.authenticate('login', {},  function (err, user, info) {
        if (err) {
            return next(err); // will generate a 500 error
        }
        if (!user) {
            this.loggers.logSecurity.info('Authentication failed: %s', req.body.login);
            return res.json({ isAuth: false, message: 'authentication failed' });
        }
        else {
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                this.loggers.logSecurity.info('Authentication success, user: %s', req.body.login);
                if (req.body.rememberMe) {
                    var token = tokenMgr.generateToken(64);
                    res.cookie('remember-me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days      
                }
                res.json({ isAuth: true, userData: { login: user.login, roles: [] } });
                
            });
           
            
        }
    })(req, res, next);
}
proto.logout = function (req, res) {
    this.loggers.logSecurity.info('User logged out: %s', req.user.login);
    req.logout();
    res.clearCookie("remember-me");
    res.redirect('/');
};

proto.init = function (app) {
    AccountController.super_.prototype.init.apply(this, arguments);
    
    app.post('/login', this.login); 
    app.get('/logout', this.logout);
}

module.exports = AccountController;
