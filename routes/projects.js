var ProjectCollection = require('../models/ProjectCollection');

module.exports = function (app) {
	
    app.get('/projects', function (req, res) {
        res.render('projects', {
            projects: ProjectCollection.collection,
			user: req.user
        });
    });
	
	app.get('/projects/:id', function(req, res) {
		var id = req.params.id;
		res.render('project', {
			project: ProjectCollection.getProject(id),
			user: req.user
		});
	});
};