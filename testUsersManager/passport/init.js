//https://github.com/tutsplus/passport-mongo/blob/master/passport/signup.js

var login = require('./login');
var signup = require('./signup');
var rememberMe = require('./rememberMe');

module.exports = function (passport) {
    
    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function (user, done) {
        console.log('serializing user: '); console.log(user);
        done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
        console.log('deserializing user:', user);
        done(null, user);
    });
    
    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
    rememberMe(passport);
}