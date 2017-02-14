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
	
	app.get('/api/user_data', function(req, res) {
		if (req.user === undefined) {
			// The user is not logged in
			res.json({});
		} else {
			res.json({
				user: req.user
			});
		}
	});
	
    app.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/signin', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true })
    );
}