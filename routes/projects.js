
var projects = [
	{
		project_name: 'qwe'
	},
	{
		project_name: 'asd'
	}
];

module.exports = function (app) {
    app.get('/projects', function (req, res) {
        res.render('projects', {
            projects: projects
        });
    });
};