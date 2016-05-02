var util = require('util');
var BaseController = require('../infrastructure/baseController.js');
var mongoose = require('mongoose');
var Group = mongoose.model('Group');

/*
 * Users Controller
 */
var GroupsController = function () {
    GroupsController.super_.apply(this, arguments);
}
var proto = GroupsController.prototype;
util.inherits(GroupsController, BaseController);

proto.getGroup = function (req, res) {

};

proto.groupsList = function (req, res) {
    Group.find().exec(function (err, groups) {
        if (err) {
            next(err);
        }
        else {
            return res.json(groups);
        }
    });
};

proto.createGroup = function (req, res) {

};

proto.updateGroup = function (req, res) {

};

proto.deleteGroup = function (req, res) {

};

proto.init = function (app) {
    GroupsController.super_.prototype.init.apply(this, arguments);
    
    app.get('/groups/:id', this.getGroup);
    app.get('/groups', this.isAuthenticated, this.groupsList);
    app.post('/groups', this.createGroup);
    app.put('/groups', this.updateGroup);
    app.delete('/groups', this.deleteGroup);
}

module.exports = GroupsController;
