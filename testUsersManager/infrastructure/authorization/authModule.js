var bCrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var loggers = require('../loggers');
var httpStatus = require('http-status');

function serializeCookieData(userData) {
	return JSON.stringify(userData);
}

function deserializeCookieData(cookie) {
	return JSON.parse(cookie);
}

var config = {
	authCookieName: 'remember-me'
};

var service = {
	
	loginUser: function (req, res, userData, rememberMe) {
		var cookieData = serializeCookieData(userData);
		if (req.body.rememberMe) {
			res.cookie(config.authCookieName, cookieData, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days      
		}
		req.session.user = userData;
	},
	
	logoutUser: function (req, res) {
		req.session.destroy();
		res.clearCookie(config.authCookieName);
		delete req.user;
	},
	
	isLoggedIn: function (req) {
		return req.session.user != null;
	},
	
	onRequestStart: function (req, res, next) {
		var cookieData = req.cookies[config.authCookieName];
		if (cookieData != null && req.session.user == null) {
			var userData = deserializeCookieData(cookieData);
			req.session.user = userData;
			loggers.logSecurity.info('Cookie login: %s', userData.login);
		}
		next();
	},
	
	isAuthenticated: function (req, res, next) {
		// if user is authenticated in the session, call the next() to call the next request handler 
		// Passport adds this method to request object. A middleware is allowed to add properties to
		// request and response objects
		if (service.isLoggedIn(req)) {
			return next();
		}
		// if the user is not authenticated then redirect him to the login page
		//res.redirect('/login');
		res.status(httpStatus.UNAUTHORIZED).send('Not authenticated');
	}


}
module.exports = service;

