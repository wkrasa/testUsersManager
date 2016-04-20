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

proto.loginPost = function (req, res, next) {
    // issue a remember me cookie if the option was checked
    if (!req.body.rememberMe) { return next(); }
    
    var token = tokenMgr.generateToken(64);
    tokenMgr.saveRememberMeToken(token, req.user, function (err) {
        if (err) { return done(err); }
        res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
        res.cookie('remember_me2', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
        return next();
    });
};

proto.logout = function (req, res) {
    req.logout();
    res.clearCookie("remember_me");
    res.redirect('/');
};

proto.init = function (app) {
    AccountController.super_.prototype.init.apply(this, arguments);
    
    app.post('/login', passport.authenticate('login', {
        //successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : true
    }), 
	this.loginPost, 
    function (req, res) {
        res.redirect('/');
    });
    app.get('/logout', this.logout);
}

module.exports = AccountController;
