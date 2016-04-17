

/*
 * GET home page.
 */

exports.index = function (req, res) {
    console.log(req.session);
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

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
