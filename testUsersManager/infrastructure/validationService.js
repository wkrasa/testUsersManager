var fs = require('fs');
var path = require('path');

var ErrorContainer = require('./errorContainer');

var validators = {};

var service = {
	registerValidator: function (name, validator) {
		validators[name] = validator;
	},
	registerValidatorsFolder: function (folder) {
		var self = this;
		fs.readdirSync(folder).forEach(function (file) {
			var validator = require(path.join(folder, file));
			var validatorName = file.replace('.js', '');
			self.registerValidator(validatorName, validator);
		});

	},
	validate: function (name) {
		var validator = validators[name];
		if (validator) {
			return function (req, res, next) {
				var errContainer = new ErrorContainer();
				
				var cb = function (err) {
					if (err) {
						return next(err);
					}
					else if (errContainer.hasErrors()) {
						return res.json(401, errContainer.toJson())
					}
					else {
						return next();
					}
				}

				validator(req, errContainer, cb);				
			}
		}
		else {
			return function (req, res, next) {
				next();
			}
		}
	}
}

module.exports = service;

//---------------

var exampleValidator = function (req, errContainer, next) {
	if (!req.body.name) {
		errContainer.addError('name', 'name is required');
	}
	else if(req.body.name.length < 3){
		errContainer.addError('name', 'name is to short');
	}
	next(null);
}

service.registerValidator("exampleValidator", exampleValidator);