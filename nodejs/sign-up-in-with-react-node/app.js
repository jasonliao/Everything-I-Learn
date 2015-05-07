var app = require('./lib/server.js');

app.db.query (
	"CREATE TABLE IF NOT EXISTS Users("
	+ "id int primary key, "
	+ "username varchar(10), "
	+ "password varchar(15)"
	+ ")",
	function(err) {
		if(err) {
			throw err;
		}
		app.server.listen(3000);
		console.log('Server started at 3000');
	}
);