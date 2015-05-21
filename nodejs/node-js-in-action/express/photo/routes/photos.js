var Photo = require('../models/Photo');
var path = require('path');
var mv = require('mv');
var join = path.join;

exports.list = function (req, res, next) {
	Photo.find({}, function (err, photos) {
		if(err) {
			return next(err);
		}
		res.render('photos', {
			title : 'Photos',
			photos: photos	
		});
	});
};

exports.form = function (req, res) {
	res.render('photos/upload', {
		title : 'Photo Upload'
	});
};

exports.submit = function (dir) {
	return function (req, res, next) {
		var img = req.files.imgPath;
		var name = req.body.imgName || img.name;
		var path = join(dir, img.name);
		mv(img.path, path, function (err) {
			if(err) {
				return next(err);
			}
			Photo.create({
				name: name,
				path: img.name
			}, function (err) {
				if(err) {
					return next(err);
				}
				res.redirect('/');
			});
		});
	};
};

exports.download = function (dir) {
	return function (req, res, next) {
		var id = req.params.id;
		Photo.findById(id, function (err, photo) {
			if(err) {
				return next(err);
			}
			var path = join(dir, photo.path);
			res.download(path);
		});
	};
};