var projects = require('../models/ProjectCollection');

module.exports = function (app) {
	
    app.get('/projects', function (req, res) {
        res.render('projects', {
            projects: projects.collection,
			user: req.user
        });
    });
	
	app.get('/projects/:id', function(req, res) {
		var id = req.params.id;
		res.render('project', {
			project: projects.findProject(id),
			user: req.user
		});
	});
};