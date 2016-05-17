var util = require('util');
var fs = require('fs');
var path = require('path');
var translationsManager = require('../infrastructure/translationsManager');

/*
 * translations controller
 */
var TranslationsController = function () {
}


var proto = TranslationsController.prototype;

proto.getTranlations = function (req, res, next) {
    var culture = req.params.culture;
    return res.json(translationsManager.getTranlations(culture));
}

proto.init = function (app) {
    app.get('/translations/:culture', this.getTranlations);
}

module.exports = TranslationsController;
