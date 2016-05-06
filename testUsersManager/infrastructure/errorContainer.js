var ErrorContainer = function () {
	this.errors = {};
}

ErrorContainer.prototype.addError = function (name, message) {
	if (!this.errors[name]) {
		this.errors[name] = [];
	}
	this.errors[name].push(message);
}

ErrorContainer.prototype.hasErrors = function () {
	for (var prop in this) {
		if (!this.hasOwnProperty(prop)) continue;
		return true;
	}
	return false;
}

ErrorContainer.prototype.toJson = function () {
	return JSON.stringify(this.errors);
}

module.exports = ErrorContainer;