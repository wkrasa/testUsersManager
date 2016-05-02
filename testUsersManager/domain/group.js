
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    created_at: Date,
    updated_at: Date
},
	{ strict: true });

groupSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

module.exports = mongoose.model('Group', groupSchema);
