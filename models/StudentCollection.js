var getCollection = require('./GetCollection');

var method = StudentCollection.prototype;

function StudentCollection(collection) {
  this.collection = collection;
}

method.getStudent = function(id) {
	if (!this.collection[id]){
		return new Error('No student matching '+ id);
	}
	return this.collection[id];
};

var collection = getCollection('Select * From r_students', 'student_id', null);

module.exports = new StudentCollection(collection);