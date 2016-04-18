var tokenMgr = require('../passport/token');

/*
 * GET home page.
 */

exports.index = function (req, res, next) {
    var login = "";
    if (req.user) { login = req.user.login; }
    res.render('index', {
        title: 'Express',
        year: new Date().getFullYear(),
        userName: login
	});
};

exports.about = function (req, res) {
    var login = "";
    if (req.user) { login = req.user.login; }
    res.render('about', {
        title: 'About',
        year: new Date().getFullYear(),
        message: 'Your application description page',
        userName: login
    });
};

exports.contact = function (req, res) {
    var login = "";
    if (req.user) { login = req.user.login; }
    res.render('contact', {
        title: 'Contact',
        year: new Date().getFullYear(),
        message: 'Your contact page',
        userName: login
    });
};

exports.loginForm = function (req, res) {
    res.render('login', {
        login: req.flash('login'),
        message: req.flash('message')
    });
};


exports.loginPost = function (req, res, next) {
	// issue a remember me cookie if the option was checked
	if (!req.body.rememberMe) { return next(); }
	
	var token = tokenMgr.generateToken(64);
	tokenMgr.saveRememberMeToken(token, req.user, function (err) {
		if (err) { return done(err); }
		res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
		res.cookie('remember_me2', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
		return next();
	});
};

exports.logout = function (req, res) {
    req.logout();
    res.clearCookie("remember_me");
    res.redirect('/');
};
