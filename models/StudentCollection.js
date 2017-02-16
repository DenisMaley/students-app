var getCollection = require('./GetCollection');

function StudentCollection(collection) {
  this.collection = collection;
}

var collection = getCollection('Select * From r_students', 'student_id', null);

module.exports = new StudentCollection(collection);