var util = require('util');

var loggers = require('../infrastructure/loggers');

/*
 * ViewController
 */
var ViewController = function () {
}

var proto = ViewController.prototype;

proto.view = function (req, res, next) {
    var ctrl = req.params.ctrl;
    var view = req.params.view;
    loggers.logInfo.info('requested view: %s/%s', ctrl, view);
    var path = ctrl + '/' + view
    res.render(path, { title: view, });
};

proto.init = function (app) {
    app.get('/views/:ctrl/:view', this.view);
}

module.exports = ViewController;
