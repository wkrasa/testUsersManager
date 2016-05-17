var log4js = require('log4js'); // include log4js
var fs = require('fs');
var path = require('path');

log4js.configure({
 // configure to use all types in different files.
    appenders: [
        {
            type: 'file',
            filename: "logs/error.log", // specify the path where u want logs folder error.log
            category: 'error',
            maxLogSize: 20480,
            backups: 10,
            layout: {
                type: 'pattern',
                pattern: "[%d %r] - %m"
            }
        },
        {
            type: "file",
            filename: "logs/security.log", // specify the path where u want logs folder info.log
            category: 'security',
            maxLogSize: 20480,
            backups: 10,
            layout: {
                type: 'pattern',
                pattern: "[%d %r] - %m"
            }
        },
        {
            type: 'file',
            filename: "logs/action.log", // specify the path where u want logs folder debug.log
            category: 'action',
            maxLogSize: 20480,
            backups: 10,
            layout: {
                type: 'pattern',
                pattern: "[%d %r] - %m"
            }
        },
        {
            type: 'file',
            filename: "logs/info.log", // specify the path where u want logs folder debug.log
            category: 'info',
            maxLogSize: 20480,
            backups: 10,
            layout: {
                type: 'pattern',
                pattern: "[%d %r] - %m"
            }
        }
    ]
});

var logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir);
}

var loggers = {
	logError: log4js.getLogger('error'),
	logSecurity: log4js.getLogger('security'),
	logAction: log4js.getLogger('action'),
	logInfo: log4js.getLogger('info')
}

module.exports = loggers;
