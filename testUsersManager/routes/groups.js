var util = require('util');
var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var loggers = require('../infrastructure/loggers');
var validationSrv = require('../infrastructure/validationService');
var authModule = require('../infrastructure/authorization/authModule');
/*
 * Users Controller
 */
var GroupsController = function () {
}

var proto = GroupsController.prototype;

proto.getGroup = function (req, res, next) {

};

proto.groupsList = function (req, res, next) {
    Group.find().exec(function (err, groups) {
        if (err) {
            next(err);
        }
        else {
            return res.json(groups);
        }
    });
};

proto.createGroup = function (req, res, next) {

};

proto.updateGroup = function (req, res, next) {

};

proto.deleteGroup = function (req, res, next) {

};

proto.init = function (app) {
    app.get('/groups/:id', this.getGroup);
    app.get('/groups', authModule.isAuthenticated, this.groupsList);
    app.post('/groups', this.createGroup);
    app.put('/groups', this.updateGroup);
    app.delete('/groups', this.deleteGroup);
}

module.exports = GroupsController;
