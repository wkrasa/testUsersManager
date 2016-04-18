
var mongoose = require('mongoose'), 
	Schema = mongoose.Schema;

var userSchema = new Schema({
	login: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isAdmin: Boolean,
	created_at: Date,
	updated_at: Date
},
	{ strict: true });

userSchema.pre('save', function (next) {
	var currentDate = new Date();
	this.updated_at = currentDate;
	if (!this.created_at) {
		this.created_at = currentDate;
	}
	console.log('users data updated.');
	next();
});

module.exports = mongoose.model('User', userSchema);
