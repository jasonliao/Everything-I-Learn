var Photo = require('../models/Photo');
var path = require('path');
//var fs = require('fs');
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
		console.log(img.path);
		console.log(path);
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