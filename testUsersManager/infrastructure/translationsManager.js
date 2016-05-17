var fs = require('fs');
var path = require('path');
var loggers = loggers = require('./loggers');

var cache = {};
var currentCulture = 'en-GB';

module.exports = {
    getTranlations: function (culture) {
        culture = culture || currentCulture;
        if (cache[culture]) {
            return cache[culture];
        }
        else {
            var fileName = 'translations_' + culture + '.json';
            var filePath = path.join('./translations', fileName);
            try {
                var data = fs.readFileSync(filePath, 'utf8')
                cache[culture] = JSON.parse(data);
                return cache[culture];
           
            } catch (err) {
                loggers.logError.error('cannot find file: ' + filePath);
                return {};
            }
        }
    },

    setCulture: function (culture){
        currentCulture = culture;
    },
		
    translate: function (text){
        var translation = this.getTranlations()[text];
        if (!translation) {
            return text;
        }
        else {
            return translation;
        }
    }
}