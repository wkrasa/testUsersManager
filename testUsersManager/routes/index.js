var util = require('util');

var loggers = require('../infrastructure/loggers');

/*
 * IndexController
 */
var IndexController = function () {
    //IndexController.super_.apply(this, arguments);
}

//util.inherits(IndexController, BaseController);

var proto = IndexController.prototype;

proto.index = function (req, res, next) {
	loggers.logInfo.info('index.index requested');

	    res.render('index', {
        title: 'Express',
        year: new Date().getFullYear()
	});
};

proto.init = function (app) {
    //IndexController.super_.prototype.init.apply(this, arguments);    
    app.get('/', this.index);
}


module.exports = IndexController;
