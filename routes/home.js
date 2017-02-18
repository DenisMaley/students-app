var ProjectCollection = require('../models/ProjectCollection');
var StudentCollection = require('../models/StudentCollection');
var InvitationCollection = require('../models/InvitationCollection');
var RequestHandler = require('../models/RequestHandler');

module.exports = function (app) {
	app.get('/', function (req, res) {
		
        res.render('index', {
            students: StudentCollection.collection,
            projects: ProjectCollection.collection,
            request: InvitationCollection.getRequest(req.user),
            invitations: InvitationCollection.getInvitations(req.user),
			user: req.user
        });
		
    });
	
	app.post('/handle-request', function(req, res){
		
		var handler = new RequestHandler(req.body);
		var response = handler.insertRequest();
		
		if(response.status == 200){
            res.json(response);
        }
	});
	
	app.post('/handle-invitation', function(req, res){
		
		var handler = new RequestHandler(req.body);
		var response = handler.updateInvitation();
		
		if(response.status == 200){
            res.json(response);
        }
	});
};