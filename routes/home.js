var projects = require('../models/ProjectCollection');
console.log(projects);
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            projects: projects.collection,
			user: req.user
        });
    });
};