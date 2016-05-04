
var mongoose = require('mongoose'), 
	Schema = mongoose.Schema;

var userSchema = new Schema({
	login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    lang: { type: String, default: 'en' },
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
	next();
});

//validation
userSchema.path('login').validate(function (value) {
    return value != null && value.length > 0;
}, '');
module.exports = mongoose.model('User', userSchema);
