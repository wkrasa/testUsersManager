var mongoose = require('mongoose');
var util = require('util');
var tokenMgr = require('../infrastructure/token');
var loggers = require('../infrastructure/loggers');
var validationSrv = require('../infrastructure/validationService');
var authModule = require('../infrastructure/authorization/authModule');


User = mongoose.model('User');

/*
 * AccountController
 */
var AccountController = function () {
}

var proto = AccountController.prototype;

proto.login = function (req, res, next) {
    var login = req.body.login;
    var password = req.body.password;
    var rememberMe = req.body.rememberMe;
    
    User.findOne({ login: req.body.login }).exec(function (err, user) {
        if (err) {
            next(err);
        }
        else if (user == null) {
            loggers.logSecurity.info('User Not Found with username ' + login);
            return res.json(400, { isAuth: false, message: 'Wrong user or passowrd!' });
        }
        else if (user.password != password) {
            loggers.logSecurity.info('Invalid password');
            return res.json(400, { isAuth: false, message: 'Wrong user or password!' });
        }
        else {
            loggers.logSecurity.info('User logged in: %s', login);
            authModule.loginUser(req, res, { login: login, lang: user.lang }, rememberMe);
            return res.json({ isAuth: true, userData: { login: login, roles: [], lang: user.lang } });
        }
    });
}

proto.getUserData = function (req, res, next) {
    if (authModule.isLoggedIn(req)) {
        return res.json({ login: req.session.user.login, roles: [], lang: req.session.user.lang });
    }
    else {
        return res.json({ });
    }

}
proto.register = function (req, res, next) {	
	if (req.body.password !== req.body.repeatPassword) {
		return res.json(400, { isRegistred: false, message: 'passwords have to be the same.' });
	}

    User.checkLoginOccupied(req.body.login, null, function (err, occupied) {
        if (err) {
            next(err);
        }
        else if (occupied) {
            return res.json(400, { isRegistred: false, message: 'login already taken.' });
        }
        else {
            var newUser = new User({
                login: req.body.login,
                password: req.body.password,
                email: req.body.email,
                lang: req.body.lang
            });
            newUser.save(function (err) {
                if (err) {
                    next(err);
                } else {
                    loggers.logSecurity.info('User has registred: %s', req.body.login);
                    res.json({ isRegistred: true });
                }
            });          
        }
    });   
}

proto.logout = function (req, res, next) {
    this.loggers.logSecurity.info('User logged out: %s', req.session.user.login);
    authModule.logoutUser(req, res);
    res.json({});
};

proto.init = function (app) { 
    app.post('/login', this.login);
    app.get('/login', this.getUserData); 
    app.delete('/logout', this.logout);
    app.put('/account', this.register);
}

module.exports = AccountController;
