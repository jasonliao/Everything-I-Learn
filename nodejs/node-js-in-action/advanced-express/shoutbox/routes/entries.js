var Entry = require('../models/Entry')

exports.list = function (req, res, next) {
	Entry.find({}, function (err, entries) {
		if(err) return next(err);
		res.render('entries', {
			title: 'Entries',
			entries: entries
		});
	});
};

exports.form = function (req, res) {
	res.render('post', {
		title: 'Post'
	});
};

exports.submit = function (req, res, next) {
	var title = req.body.title,
			body = req.body.body,
			username = res.locals.user.username;
	Entry.create({
		title: title,
		body: body,
		username: username
	}, function (err, entry) {
		if(err) return next(err);
		res.redirect('/');
	});
};