exports.requireEntryTitle = function (req, res, next) {
	var title = req.body.title;
	if(title) {
		next();
	} else {
		res.error("Title is required.");
		res.redirect('back');
	}
};

exports.requireEntryTitleLengthAbove = function (req, res, next) {
	var title = req.body.title;
	if(title.length > 4) {
		next();
	} else {
		res.error('Title must be longer than 4.');
		res.redirect('back');
	}
};