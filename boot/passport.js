var config = require("nconf");
var passport = require('passport');
var AuthLocalStrategy = require('passport-local').Strategy;
var db = require('../models/db');

passport.use('local-login', new AuthLocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
	function(req, email, password, done) { // callback with email and password from our form
        
		db.query("Select * From r_students Where student_email = '" + email + "'", function(err,rows){
			if (err)
                return done(err);
			if (!rows.length) {
                return done(null, false, {
					message: 'No user found.'
				});
			} 
			
			// if the user is found but the password is wrong
            if (!( rows[0].student_password == password))
                return done(null, false, {
					message: 'Oops! Wrong password.'
				}); 
			
            // all is well, return successful user
            return done(null, rows[0]);			
		
		});
    }
));

passport.serializeUser(function (user, done) {
	done(null, user.student_id);
});


passport.deserializeUser(function (id, done) {
	db.query("Select * From r_students Where student_id = "+id,function(err,rows){	
		done(err, rows[0]);
	});
});

module.exports = function (app) {
};