var qs = require('querystring');

exports.add = function (db, req, res) {
	exports.parseReceivedData(req, function (data) {
		db.query(
			"INSERT INTO Users(id, username, password) " +
			" VALUES (?, ?)",
			[data.username, data.password],
			function (err) {
				throw err;
			}
		);
	});
};

exports.delete = function (db, req, res) {
	
};

exports.find = function (db, req, res, fn) {
	exports.parseReceivedData(req, function (data) {
		db.query(
			"SELECT * FROM Users where username='" + data.username + "'",
			function(err, rows) {
				if(err) {
					throw err;
				}
				fn(rows);
			}
		);
	});
};

exports.update = function (db, req, res) {
	
};

exports.parseReceivedData = function (req, fn) {
	var body = '';
	req.setEncoding('utf8');
	req.on('data', function (chunk) {
		body += chunk;
	});
	req.on('end', function () {
		var data = qs.parse(body);
		console.log(data);
		fn(data);
	});
};