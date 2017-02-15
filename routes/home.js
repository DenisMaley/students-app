var ProjectCollection = require('../models/ProjectCollection');
var StudentCollection = require('../models/StudentCollection');
var RequestHandler = require('../models/RequestHandler');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            students: StudentCollection.collection,
            projects: ProjectCollection.collection,
			user: req.user
        });
    });
	
	app.post('/handle-request', function(req, res){
		var handler = new RequestHandler(req.body);
		var response = handler.insertData();
		
		console.log(req.body);
		res.json(response);
	});
};