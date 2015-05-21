var User = require('../models/User');

exports.form = function (req, res) {
	res.render('register', {
		title: 'Register'
	});
};

exports.submit = function (req, res,next) {
	var username = req.body.username,
			password = req.body.password;
	User.find({
		username: username
	}, function (err, user) {
		if(err) {
			return next(err);
		}
		if(user.id) {
			res.error('Username already taken!');
			res.redirect('back');
		} else {
			User.create({
				username: username,
				password: password,
			}, function (err, user) {
				if(err) {
					return next(err);
				}
				req.session.uid = user.id;
				req.redirect('/');
			});
		}
	});
};
