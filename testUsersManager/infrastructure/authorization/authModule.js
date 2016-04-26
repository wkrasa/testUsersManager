var bCrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var loggers = require('../loggers');
var config = {
    authCookieName: 'remember-me'
}
module.exports.config = config;

module.exports.loginUser = function (req, res, userData, rememberMe) {
    var cookieData = serializeCookieData(userData);
    if (req.body.rememberMe) {
        res.cookie(config.authCookieName, cookieData, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days      
    }
    req.session.user = userData;
}

module.exports.logoutUser = function (req, res) {
    req.session.destroy();
    res.clearCookie(config.authCookieName);
    delete req.user;
}

module.exports.isLoggedIn = function (req) {
    return req.session.user != null;
}

module.exports.onRequestStart = function (req, res, next) {
    var cookieData = req.cookies[config.authCookieName];
    if (cookieData != null && req.session.user == null) {
        var userData = deserializeCookieData(cookieData);
        req.session.user = userData;
        loggers.logSecurity.info('Cookie login: %s', userData.login);
    }
    next();
}

function serializeCookieData(userData) {
    return JSON.stringify(userData);
}

function deserializeCookieData(cookie) {
    return JSON.parse(cookie);
}