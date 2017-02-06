var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '429847',
	database : 'uu_psy'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;