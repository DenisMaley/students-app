var db = require('./db');

function ProjectCollection(collection) {
  this.collection = collection;
}

ProjectCollection.prototype.findProject = function(id) {
	if (!this.collection[id]){
		return new Error('No project matching '+ id);
	}
	return collection[id];
};

var collection={};

db.query('Select * From с_projects p, r_supervisors s Where p.supervisor_id = s.supervisor_id', function(err, rows) {
	if (err) {
		console.log(err);
	// Do something with this error...
	} else {
		for (var i = 0; i < rows.length; i++){
			var row = rows[i];
			collection[row.project_id] = row;
		}
	}
});

module.exports = new ProjectCollection(collection);