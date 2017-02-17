var db = require('./db');

var method = RequestHandler.prototype;

function RequestHandler(data) {
  this.data = data;
}

method.insertRequest = function() {
	
	var requestObj = this.data.request;
	var groupObj = this.data.group;
	
	db.query('Insert Into r_requests Set ?', requestObj, function (error, results, fields) {
		if (error) throw error;
		var insertId = results.insertId;
		
		groupObj.forEach(function(id) {
			var invitationObj = {
				student_id: id,
				request_id: insertId,
				invitation_adoption: +(id == requestObj.student_id)
			};
			db.query('Insert Into r_invitations SET ?', invitationObj);
		});
		
	});
	
	return {success : "Updated Successfully", status : 200};
};

method.updateInvitation = function() {
	
	var data = this.data;
	
	db.query('Update r_invitations Set invitation_adoption = ? Where invitation_id = ?', [data.invitation_adoption, data.invitation_id], function (error, results, fields) {
		if (error) throw error;
		console.log('changed ' + results.changedRows + ' rows');
	});
	
	return {success : "Updated Successfully", status : 200};
};

module.exports = RequestHandler;