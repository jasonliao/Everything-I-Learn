var user = require('./userLogic.js');

exports.isExist = function (db, req, res) {
	user.find(db, req, res, function (user) {
		if (user.length == 0) {
			console.log("username worked");
		} else {
			console.log("username esist");
		}
//		userlist.forEach(function (user) {
//			console.log(user.username);
//		});
	});
};