var RememberMeStrategy = require('passport-remember-me').Strategy;
var tokenMgr = require('./token');

module.exports = function (passport) {
    
    passport.use(new RememberMeStrategy(
        function (token, done) {
            tokenMgr.consumeRememberMeToken(token, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
        },
        function (user, done) {
            var token = tokenMgr.generateToken(64);
            tokenMgr.saveRememberMeToken(token, user, function (err) {
                if (err) { return done(err); }
                return done(null, token);
            });
        }
    ));
}