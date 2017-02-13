var projects = require('../models/ProjectCollection');
var students = require('../models/StudentCollection');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            students: students.collection,
            projects: projects.collection,
			user: req.user
        });
    });
};