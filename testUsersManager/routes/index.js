
/*
 * GET home page.
 */

exports.index = function (req, res) {
	console.log(req.session);
    res.render('index', {
        title: 'Express',
        year: new Date().getFullYear(),
        isLoggedIn: req.session.isLoggedIn
    });
};

exports.about = function (req, res) {
    req.session.isLoggedIn = false;
    res.render('about', {
        title: 'About',
        year: new Date().getFullYear(),
        message: 'Your application description page',
        isLoggedIn: req.session.isLoggedIn
    });
};

exports.contact = function (req, res) {
    req.session.isLoggedIn = true;
    res.render('contact', {
        title: 'Contact',
        year: new Date().getFullYear(),
        message: 'Your contact page',
        isLoggedIn: req.session.isLoggedIn
    });
};
