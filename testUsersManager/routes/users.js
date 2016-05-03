﻿var util = require('util');
var BaseController = require('../infrastructure/baseController.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/*
 * Users Controller
 */
var UsersController = function () {
    UsersController.super_.apply(this, arguments);
}
var proto = UsersController.prototype;
util.inherits(UsersController, BaseController);

proto.getUser = function (req, res) {
    if (!req.params.id) {
        return res.json(404, {  message: 'user not found' });
    }
    User.findOne({ _id: req.params.id}).exec(function (err, user) {
        if (err) {
            next(err);
        }
        else if (user) {
            res.json(user);
            return;
        }
        else {
            return res.json(404, { message: 'user not found' });
        }
    }); 
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
    if (!req.body.login) {
        return res.json(400, { isRegistred: false, message: 'login is required.' });
    }
    if (!req.body.password) {
        return res.json(400, { isRegistred: false, message: 'password is required.' });
    }
    if (!req.body.lang) {
        return res.json(400, { isRegistred: false, message: 'please select language.' });
    }
    
    User.findOne({ login: req.body.login }).exec(function (err, user) {
        if (err) {
            next(err);
        }
        else if (user) {
            res.json(400, { isRegistred: false, message: 'login already taken.' });
            return;
        }
        else {
            var newUser = new User({
                login: req.body.login,
                password: req.body.password,
                email: req.body.email,
                lang: req.body.lang
            });
            newUser.save(function (err) {
                if (err) {
                    next(err);
                } else {
                    this.loggers.logSecurity.info('User was created: %s', req.body.login);
                    res.json({ isRegistred: true });
                }
            });
        }
    }); 
};

proto.updateUser = function (req, res) {
    if (!req.body.login) {
        return res.json(400, { isRegistred: false, message: 'login is required.' });
    }
    if (!req.body.password) {
        return res.json(400, { isRegistred: false, message: 'password is required.' });
    }
    if (!req.body.lang) {
        return res.json(400, { isRegistred: false, message: 'please select language.' });
    }
    User.count({ $and: [{ login: req.body.login }, { _id: { $ne: req.body._id} }  ]}).exec(function (err, c) {
        if (err) {
            next(err);
        }
        else if (c > 0) {
            res.json(400, { message: 'login already taken.' });
            return;
        }
        else {
            User.findOne({ _id: req.body._id }).exec(function (err, updatedUser) {
                if (err) {
                    next(err);
                }
                else if (!updatedUser) {
                    return res.json(404, { message: 'user not found' });
                }
                updatedUser.login = req.body.login;
                updatedUser.password = req.body.password;
                updatedUser.email = req.body.email;
                updatedUser.lang = req.body.lang;
                
                updatedUser.save(function (err) {
                    if (err) {
                        next(err);
                    } else {
                        this.loggers.logSecurity.info('User was updated: %s', req.body.login);
                        res.json({});
                    }
                });
            });  
        }
    }); 
};

proto.deleteUser = function (req, res) {

};

proto.init = function (app) {
    UsersController.super_.prototype.init.apply(this, arguments);
    
    app.get('/users/:id', this.isAuthenticated,  this.getUser);
    app.get('/users', this.isAuthenticated,  this.usersList);
    app.post('/users', this.isAuthenticated, this.createUser);
    app.put('/users', this.isAuthenticated,  this.updateUser);
    app.delete('/users', this.isAuthenticated,  this.deleteUser);
}

module.exports = UsersController;
