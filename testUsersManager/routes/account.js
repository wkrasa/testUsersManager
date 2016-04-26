var tokenMgr = require('../infrastructure/token');
var authModule = require('../infrastructure/authorization/authModule');

var util = require('util');
var BaseController = require('../infrastructure/baseController');

var _user = { _id: '123', login: 'test', password: 'test' };
/*
 * AccountController
 */
var AccountController = function () {
    AccountController.super_.apply(this, arguments);
}
var proto = AccountController.prototype;
util.inherits(AccountController, BaseController);

proto.login = function (req, res, next) {
    var login = req.body.login;
    var password = req.body.password;
    var rememberMe = req.body.rememberMe;
    //TODO validate request and check user against database
    if (login != _user.login) {
        console.log('User Not Found with username ' + login);
        return res.json(400, { isAuth: false, message: 'Wrong user or passowrd!' });
    }
    
    if (_user.password != password) {
        console.log('Invalid Password');
        return res.json(400, { isAuth: false, message: 'Wrong user or password!'});
    }
    this.loggers.logSecurity.info('User logged in: %s', login);
    authModule.loginUser(req, res, { login: login }, rememberMe);
    return res.json({ isAuth: true, userData: { login: login, roles: [] } });
}

proto.getUserData = function (req, res, next) {
    if (authModule.isLoggedIn(req)) {
        return res.json({ login: req.session.user.login, roles: [] });
    }
    else {
        return res.json({ });
    }

}
proto.register = function (req, res, next) {
    //todo: validate user data
    if (!req.body.login || req.body.login === 'test') {
        res.json(400, { isRegistred: false, message: 'login already taken' });
        return;
    }
    //todo: create user here
    this.loggers.logSecurity.info('User has registred: %s', req.body.login);
    res.json({ isRegistred: true });
}

proto.logout = function (req, res) {
    this.loggers.logSecurity.info('User logged out: %s', req.session.user.login);
    authModule.logoutUser(req, res);
    res.json({});
};

proto.init = function (app) {
    AccountController.super_.prototype.init.apply(this, arguments);
    
    app.post('/login', this.login);
    app.get('/login', this.getUserData); 
    app.delete('/logout', this.logout);
    app.put('/account', this.register);
}

module.exports = AccountController;
