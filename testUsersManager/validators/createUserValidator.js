var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (req, errContainer, next) {
	//validation
	if (req.body.login == null || req.body.login.length == 0) {
		errContainer.addError('login', 'm_errRequiredField');
	} else if (req.body.login.length > 20) {
		errContainer.addError('login', 'm_errValueTooLong');
	} else if (req.body.login.length < 3) {
		errContainer.addError('login', 'm_errValueTooShort');
	}
	
	if (req.body.password == null || req.body.login.length == 0) {
		errContainer.addError('password', 'm_errRequiredField');
	} else if (req.body.password.length > 20) {
		errContainer.addError('password', 'm_errValueTooLong');
	} else if (req.body.password.length < 3) {
		errContainer.addError('password', 'm_errValueTooShort');
	}
	
	if (req.body.email == null || req.body.login.length == 0) {
		errContainer.addError('email', 'm_errRequiredField');
	} else if (req.body.email.length > 30) {
		errContainer.addError('email', 'm_errValueTooLong');
	} else if (req.body.email.length < 5) {
		errContainer.addError('email', 'm_errValueTooShort');
	}
	
	if (req.body.lang == null) {
		errContainer.addError('lang', 'm_errRequiredField');
	}
	
	User.checkLoginOccupied(req.body.login, req.body._id, function (err, occupied) {
		if (err) {
			next(err);
		}
		else if (occupied) {
			errContainer.addError('lang', 'login already taken.');
			next();
        }
        else {
            next();
        }
	});
}