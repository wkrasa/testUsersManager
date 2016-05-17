var util = require('util');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var loggers = require('../infrastructure/loggers');
var validationSrv = require('../infrastructure/validationService');
var authModule = require('../infrastructure/authorization/authModule');

/*
 * Users Controller
 */
var UsersController = function () {
}

var proto = UsersController.prototype;

proto.getUser = function (req, res, next) {
    if (!req.params.id) {
        return res.json(404, {  message: 'user not found' });
    }
    User.getByID( req.params.id, function (err, user) {
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

proto.usersList = function (req, res, next) {
    User.find().exec(function (err, users) {
        if (err) {
            next(err);
        }
        else {
            return res.json(users);
        }
    });
};

proto.createUser = function (req, res, next) { 
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
            loggers.logSecurity.info('User was created: %s', req.body.login);
            res.json({ isRegistred: true });
        }
    });
        
};

proto.updateUser = function (req, res, next) {
    User.checkLoginOccupied(req.body.login, req.body._id, function (err, occupied) {
        if (err) {
            next(err);
        }
        else if (occupied) {
            res.json(400, { message: 'login already taken.' });
            return;
        }
        else {
            User.getByID(req.body._id, function (err, updatedUser) {
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
                        loggers.logSecurity.info('User was updated: %s', req.body.login);
                        res.json({});
                    }
                });
            });  
        }
    }); 
};

proto.deleteUser = function (req, res, next) {

};

proto.init = function (app) {
    app.get('/users/:id', authModule.isAuthenticated,  this.getUser);
    app.get('/users', authModule.isAuthenticated,  this.usersList);
    app.post('/users', authModule.isAuthenticated, validationSrv.validate('createUserValidator'), this.createUser);
    app.put('/users', authModule.isAuthenticated, validationSrv.validate('createUserValidator'),  this.updateUser);
    app.delete('/users', authModule.isAuthenticated,  this.deleteUser);
}

module.exports = UsersController;
