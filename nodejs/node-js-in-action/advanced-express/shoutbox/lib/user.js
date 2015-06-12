var User = require('../models/User');

module.exports = function (req, res, next) {
	var uid = req.session.uid;
	if(!uid) return next();
	User.findById(uid, function (err, user) {
		if(err) return next(err);
		req.user = res.locals.user = user;
		next();
	});
};