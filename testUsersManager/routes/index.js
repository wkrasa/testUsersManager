var tokenMgr = require('../infrastructure/passport/token');
var passport = require('passport');

var util = require('util');
var BaseController = require('../infrastructure/baseController.js');
/*
 * IndexController
 */
var IndexController = function () {
    IndexController.super_.apply(this, arguments);
}
var proto = IndexController.prototype;
util.inherits(IndexController, BaseController);

proto.index = function (req, res, next) {
    var login = "";
    if (req.user) { login = req.user.login; }
    res.render('index', {
        title: 'Express',
        year: new Date().getFullYear(),
        userName: login
	});
};

proto.init = function (app) {
    IndexController.super_.prototype.init.apply(this, arguments);    
    app.get('/', this.index);
}

module.exports = IndexController;
