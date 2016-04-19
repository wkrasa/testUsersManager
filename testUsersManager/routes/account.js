

//exports.login = function (req, res) {
//    res.render('login', {
//        login: req.flash('login'),
//        message: req.flash('message')
//    });
//};

//exports.loginPost = function (req, res, next) {
//	// issue a remember me cookie if the option was checked
//	if (!req.body.rememberMe) { return next(); }
	
//	var token = tokenMgr.generateToken(64);
//	tokenMgr.saveRememberMeToken(token, req.user, function (err) {
//		if (err) { return done(err); }
//		res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
//		res.cookie('remember_me2', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
//		return next();
//	});
//};

//exports.logout = function (req, res) {
//    req.logout();
//    res.clearCookie("remember_me");
//    res.redirect('/');
//};

////todo: register