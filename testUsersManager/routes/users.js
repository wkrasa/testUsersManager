var util = require('util');
var BaseController = require('../infrastructure/baseController.js');
var mongoose = require('mongoose');
User = mongoose.model('User');
/*
 * Users Controller
 */
var UsersController = function () {
    UsersController.super_.apply(this, arguments);
}
var proto = UsersController.prototype;
util.inherits(UsersController, BaseController);

proto.getUser = function (req, res) {

};

proto.usersList = function (req, res) {
    User.find().exec(function (err, users) {
        if (err) {
            next(err);
        }
        else {
            return res.json(users);
        }
    });
};

proto.createUser = function (req, res) {

};

proto.updateUser = function (req, res) {

};

proto.deleteUser = function (req, res) {

};

proto.init = function (app) {
    UsersController.super_.prototype.init.apply(this, arguments);
    
    app.get('/users/:id', this.getUser);
    app.get('/users', this.usersList);
    app.post('/users', this.createUser);
    app.put('/users', this.updateUser);
    app.delete('/users', this.deleteUser);
}

module.exports = UsersController;
