var User = require('../models/User');

exports.form = function (req, res) {
	res.render('login', {
		title: 'Login'
	});
};

exports.submit = function (req, res, next) {
	var username = req.body.username,
			password = req.body.password;
	User.find({
		username: username
	}, function (err, user) {
		if(err) {
			return next(err);
		}
		if(user.length != 0 && user[0].password == password) {
			req.session.uid = user[0]._id;
			res.redirect('/');
		} else {
			res.error('Sorry! invalid credentials.');
			res.redirect('back');
		}
	});
};

exports.logout = function (req, res) {
	req.session.destroy(function (err) {
		if(err) throw err;
		res.redirect('/');
	});
};