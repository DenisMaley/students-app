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
	
	app.post('/handle-request', function(req, res){
		var obj = {message: 'ok'};
		console.log('body: ' + JSON.stringify(req.body));
		res.send(obj);
	});
};