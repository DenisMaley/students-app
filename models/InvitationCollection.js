var getCollection = require('./GetCollection');
var ProjectCollection = require('./ProjectCollection');
var StudentCollection = require('./StudentCollection');
var objectFilter = require('./ObjectFilter');

var method = InvitationCollection.prototype;

function InvitationCollection(collection) {
	this.collection = collection;
}

method.getRequest = function(student) {
	if(student){
		var studentRequest = objectFilter(this.collection, function (el) {
			return el.student_id == student.student_id && 
				 el.invitation_adoption == 1;
		});
		if (!studentRequest){
			return new Error('No request matching for student'+ student_id);
		}
		return studentRequest[Object.keys(studentRequest)[0]]
	}
};

method.getInvitations = function(student) {
	if(student){
		var studentInvitations = objectFilter(this.collection, function (el) {
			return el.student_id == student.student_id && 
				   el.invitation_adoption == 0;
		});
		if (!studentInvitations){
			return new Error('No invitations matching for student'+ student_id);
		}
		return studentInvitations;
	}
};

var query = '\
	Select i.*, r.student_id inviter, r.request_conf \
	From r_invitations i, r_requests r \
	Where i.request_id = r.request_id \
';

var collection = getCollection(query, 'invitation_id', function(key, value) {
	if (key == 'request_conf') return ProjectCollection.getSubCollection(value);
	if (key == 'inviter') return StudentCollection.getStudent(value);
	return value;
});

module.exports = new InvitationCollection(collection);