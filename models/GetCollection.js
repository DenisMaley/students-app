var db = require('./db');
var ProjectCollection = require('./ProjectCollection');


var getCollection = function(sql_query, row_id, parser) {
	
	var collection={};
	var asd = [];
	db.query(sql_query, function(err, rows) {
		if (err) {
			console.log(err);
		// Do something with this error...
		} else { 
			/* Turning array of RowDataPackets to object 
			 * (we need to modify some information, e.g. request_conf)
			 * RowDataPacket does not allow to modify itself
			 */
			
			/* This structure was created in order to turn 
			 * RowDataPacket(returned from the database) into objects
			 */
			obj = JSON.parse(JSON.stringify(rows), parser);
			for(var i = 0, len = obj.length; i < len; i++){
				var row = obj[i];
				collection[row[row_id]] = row;
			}
		}
	});
	
	return collection;
};
module.exports = getCollection;