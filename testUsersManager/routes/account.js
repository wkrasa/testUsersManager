var tokenMgr = require('../infrastructure/token');
var authModule = require('../infrastructure/authorization/authModule');

var util = require('util');
var BaseController = require('../infrastructure/baseController');

var mongoose = require('mongoose');
User = mongoose.model('User');

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
    
    User.findOne({ login: req.body.login }).exec(function (err, user) {
        if (err) {
            next(err);
        }
        else if (user == null) {
            this.loggers.logSecurity.info('User Not Found with username ' + login);
            return res.json(400, { isAuth: false, message: 'Wrong user or passowrd!' });
        }
        else if (user.password != password) {
            this.loggers.logSecurity.info('Invalid password');
            return res.json(400, { isAuth: false, message: 'Wrong user or password!' });
        }
        else {
            this.loggers.logSecurity.info('User logged in: %s', login);
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
    if (!req.body.login) {
        return res.json(400, { isRegistred: false, message: 'login is required.' });
    }
    if (!req.body.password) {
        return res.json(400, { isRegistred: false, message: 'password is required.' });
    }
    if (!req.body.repeatPassword) {
        return res.json(400, { isRegistred: false, message: 'repeat password is required.' });
    }
    if (req.body.password !== req.body.repeatPassword) {
        return res.json(400, { isRegistred: false, message: 'passwords have to be the same.' });
    }
    if (!req.body.lang) {
        return res.json(400, { isRegistred: false, message: 'please select language.' });
    }

    User.findOne({ login: req.body.login }).exec(function (err, user) {
        if (err) {
            next(err);
        }
        else if (user) {
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
                    this.loggers.logSecurity.info('User has registred: %s', req.body.login);
                    res.json({ isRegistred: true });
                }
            });          
        }
    });   
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
