var User = require('../models/User');

exports.save = function (req, res, next) {
	var username = req.body.username,
			password = req.body.password,
			age = req.body.age;
	User.create({
		username: username,
		password: password,
		age: age
	}, function (err) {
		if(err) {
			return next(err);
		}
	});
};

exports.update = function (req, res, next) {
	var password = req.body.password;
	User.update({
		password: password
	}, function (err) {
		if (err) {
			return next(err);
		}
	});
};

exports.findByName = function (req, res, next) {
	var username = req.body.username;
	User.find({
		username: username
	}, function (err) {
		if(err) {
			return next(err);
		}
	});
};