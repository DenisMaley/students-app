var getCollection = require('./GetCollection');
var objectFilter = require('./ObjectFilter');

var method = ProjectCollection.prototype;

function ProjectCollection(collection) {
  this.collection = collection;
}

method.getProject = function(id) {
	if (!this.collection[id]){
		return new Error('No project matching '+ id);
	}
	return this.collection[id];
};

method.getSubCollection = function(conf) {
	
	/*
	 * We store request configuration in JSON in our DB
	 * Elements are strings and we need to
	 * turn them to integers, because el.project_id is integer
	 */
	var conf_arr = JSON.parse(conf).map(function(id) {
		return +id;
	});
	var subCollection = [];
	for(var i = 0, len = conf_arr.length; i < len; i++){
		subCollection.push(this.getProject(conf_arr[i]));
	}
	/*
	 * We do not use objectFilter, because order is important
	 */
	return subCollection;
};

var query = '\
	Select * \
	From с_projects p, r_supervisors s \
	Where p.supervisor_id = s.supervisor_id \
';

var collection = getCollection(query, 'project_id', null);

module.exports = new ProjectCollection(collection);