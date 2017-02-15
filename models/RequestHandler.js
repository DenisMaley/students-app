var db = require('./db');

var method = RequestHandler.prototype;

function RequestHandler(data) {
  this.data = data;
}

method.insertData = function() {
	
	var requestObj = this.data.request;
	var groupObj = this.data.group;
	
	db.query('Insert Into r_requests SET ?', requestObj, function (error, results, fields) {
		if (error) throw error;
		var insertId = results.insertId;
		
		groupObj.forEach(function(item) {
			var invitationObj = {
				student_id: item,
				request_id: insertId,
				invitation_adoption: +(item == requestObj.student_id)
			};
			db.query('Insert Into r_invitations SET ?', invitationObj);
		});
		
	});
	
	return {success : "Updated Successfully", status : 200};
};

module.exports = RequestHandler;