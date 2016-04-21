var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var _user = { _id: '123', login: 'test', password: 'test' };

module.exports = function (passport) {
    
    passport.use('login', new LocalStrategy({
        usernameField : 'login',
        passwordField : 'password',
        passReqToCallback : true
    },
    function (req, username, password, done) {
            if (username != _user.login) {
                console.log('User Not Found with username ' + username);
                return done(null, false, req.flash('message', 'User Not found.'));
            }
            
            if (_user.password != password) {
                console.log('Invalid Password');
                return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
            }
            // User and password both match, return user from done method
            // which will be treated like success
            return done(null, _user);
        })
    );
    
    
    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }
    
}