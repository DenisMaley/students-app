var db = require('../models/db');


function fetchCollection(callback) {
	db.query('Select * From с_projects p, r_supervisors s Where p.supervisor_id = s.supervisor_id', function(err, rows) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, rows);
		}
	});
}

var projects={};

fetchCollection(function(err, rows) {
	if (err) {
		console.log(err);
		res.send(err);  
	// Do something with this error...
	} else {
		for (var i = 0; i < rows.length; i++){
			var row = rows[i];
			projects[row.project_id] = row;
		}
	}
});

function findProject(id, callback) {
  if (!projects[id])
    return callback(new Error(
      'No project matching '
       + id
      )
    );
  return callback(null, projects[id]);
};


module.exports = function (app) {
	
    app.get('/projects', function (req, res) {
        res.render('projects', {
            projects: projects,
			user: req.user
        });
    });
	
	app.get('/projects/:id', function(req, res, next) {
		var id = req.params.id;
		findProject(id, function(error, project) {
			if (error) return next(error);
			return res.render('project', {
				project: project,
				user: req.user
			});
		});
	});
};