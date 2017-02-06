var passport = require('passport');

module.exports = function (app) {

    app.get('/signin', function (req, res) {
	
        if (req.isAuthenticated()) {
            res.redirect('/');
            return;
        }

        res.render('signin', {
            error: req.flash('error')
        });
    });

    app.get('/sign-out', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/signin', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true })
    );
}