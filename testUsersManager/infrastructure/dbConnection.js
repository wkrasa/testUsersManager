// Bring Mongoose into the app 
var mongoose = require('mongoose');
var loggers = require('./loggers');

var dbInit = function (connectionString) {

    // Create the database connection 
    mongoose.connect(connectionString);
    
    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {
        loggers.logInfo.info('Mongoose default connection open to ' + connectionString);
    });
    
    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        loggers.logInfo.info('Mongoose default connection error: ' + err);
    });
    
    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        loggers.logInfo.info('Mongoose default connection disconnected');
    });
    
    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            loggers.logInfo.info('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}

module.exports.dbInit = dbInit;