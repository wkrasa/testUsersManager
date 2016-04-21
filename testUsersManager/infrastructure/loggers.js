var log4js = require('log4js'); // include log4js

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

module.exports.logError = log4js.getLogger('error'); 
module.exports.logSecurity = log4js.getLogger('security');
module.exports.logAction = log4js.getLogger('action');
module.exports.logInfo = log4js.getLogger('info');
