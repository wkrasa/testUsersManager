var authModule = require('../infrastructure/authorization/authModule');

var BaseController = function () {
	this.loggers = require('./loggers');
	var validationSrv = require('./validationService');
}
var proto = BaseController.prototype;

proto.isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (authModule.isLoggedIn(req)) {
        return next();
    }
    // if the user is not authenticated then redirect him to the login page
    //res.redirect('/login');
    res.status(401).send('Not authenticated');
}

proto.init = function (app) {

}

module.exports = BaseController;