var db = require('./db');

function StudentCollection(collection) {
  this.collection = collection;
}

var collection={};

db.query('Select * From r_students', function(err, rows) {
	if (err) {
		console.log(err);
	// Do something with this error...
	} else {
		for (var i = 0; i < rows.length; i++){
			var row = rows[i];
			collection[row.student_id] = row;
		}
	}
});

module.exports = new StudentCollection(collection);