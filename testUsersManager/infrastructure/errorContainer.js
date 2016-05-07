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
	for (var prop in this.errors) {
		if (!this.errors.hasOwnProperty(prop)) continue;
		return true;
	}
	return false;
}

ErrorContainer.prototype.getErrors = function () {
    return this.errors;
}

module.exports = ErrorContainer;