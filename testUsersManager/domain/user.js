var translationsManager = require('../infrastructure/translationsManager');

var mongoose = require('mongoose'), 
	Schema = mongoose.Schema;

var userSchema = new Schema({
	login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    lang: { type: String, default: 'en-GB' },
	created_at: Date,
	updated_at: Date
},
	{ strict: true });

userSchema.pre('save', function (next) {
	//if (!model('User').validate(this)) {
	//	return; //<- check how to prevent saving properly
	//}
	var currentDate = new Date();
	this.updated_at = currentDate;
	if (!this.created_at) {
		this.created_at = currentDate;
	}
	next();
});


var User = mongoose.model('User', userSchema);
//static methods
userSchema.methods.getByID = function (id, cb) {
	var count = User.findOne({ _id: id }).exec(cb);
	return count > 0;
}
userSchema.methods.validate = function (user) {

}

userSchema.methods.checkLoginOccupied = function (login, id, cb) {
	if (!login) {
		return false;
	}
	var count = User.count({
		$and: [{ login: ogin }, { _id: { $ne: id } }]
	}).exec(cb);
	return count > 0;
}

module.exports = User;
