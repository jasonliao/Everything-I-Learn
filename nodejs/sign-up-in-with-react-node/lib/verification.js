var user = require('./userLogic.js');

exports.isExist = function (db, req, res) {
	user.find(db, req, res, function (user) {
		if (user.length == 0) {
			res.end("username worked");
		} else {
			res.end("username esist");
		}
	});
};