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



//static methods
userSchema.statics.getByID = function (id, cb) {
	var count = User.findOne({ _id: id }).exec(cb);
	return count > 0;
}

userSchema.statics.checkLoginOccupied = function (login, id, cb) {
	if (!login) {
		return false;
	}
    if (id) {
        count = User.count({
            $and: [{ login: login }, { _id: { $ne: id } }]
        }).exec(function (err, count) {
            cb(err, count > 0)
        });
    }
    else {
         User.count({ login: login }).exec(function (err, count) {
            cb(err, count > 0)
        });
    }
}

var User = mongoose.model('User', userSchema);
module.exports = User;
