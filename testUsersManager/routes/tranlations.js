
var util = require('util');
var fs = require('fs');
var path = require('path');
var BaseController = require('../infrastructure/baseController');
var cache = {};
/*
 * translations controller
 */
var TranslationsController = function () {
    TranslationsController.super_.apply(this, arguments);
}

var proto = TranslationsController.prototype;
util.inherits(TranslationsController, BaseController);

proto.getTranlations = function (req, res, next) {
    var fileName = req.params.file;
    if (cache[fileName]) {
        return res.json(cache[fileName]);
    }
    else {
        var filePath = path.join('./translations', fileName);
        filePath += '.json';
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) throw err;
            cache[fileName] = JSON.parse(data);
            return res.json(cache[fileName]);
        });
    }
}

proto.init = function (app) {
    TranslationsController.super_.prototype.init.apply(this, arguments);
    
    app.get('/translations/:file', this.getTranlations);
}

module.exports = TranslationsController;
