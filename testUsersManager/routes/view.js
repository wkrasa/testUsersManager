var tokenMgr = require('../infrastructure/passport/token');
var passport = require('passport');

var util = require('util');
var BaseController = require('../infrastructure/baseController.js');
/*
 * ViewController
 */
var ViewController = function () {
    ViewController.super_.apply(this, arguments);
}
var proto = ViewController.prototype;
util.inherits(ViewController, BaseController);

proto.view = function (req, res) {
    var ctrl = req.params.ctrl;
    var view = req.params.view;
    this.loggers.logInfo.info('requested view: %s/%s', ctrl, view);
    var path = ctrl + '/' + view
    res.render(path, { title: view, });
};

proto.init = function (app) {
    ViewController.super_.prototype.init.apply(this, arguments);
    
    app.get('/views/:ctrl/:view', this.view);
}

module.exports = ViewController;
