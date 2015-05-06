var server = require('./lib/server.js');
var mysql = require('mysql');

var db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '123123',
	database: 'todo'
});

db.query (
	"CREATE TABLE IF NOT EXISTS Users("
	+ "id int primary key, "
	+ "username varchar(10), "
	+ "password varchar(15)"
	+ ")",
	function(err) {
		if(err) {
			throw err;
		}
		server.listen(3000);
		console.log('Server started at 3000');
	}
);