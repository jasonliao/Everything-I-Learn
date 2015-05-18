var photos = [];

var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

photos.push({
	name : 'Node.js Logo',
	path : 'nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
	name : 'Ryan Speaking',
	path : 'nodejs.org/images/ryan-speaker.jpg'
});

exports.list = function (req, res) {
	res.render('photos', {
		title : 'Photos',
		photos: photos	
	});
};

exports.form = function (req, res) {
	res.render('photos/upload', {
		title : 'Photo Upload'
	});
};

exports.submit = function (dir) {
	return function (req, res, next) {
		console.log(req);
		var img = req.files.image;
		var name = req.body.name || img.name;
		var path = join(dir, img.name);
//		
//		fs.rename(img.path, path, function (err) {
//			if(err) {
//				return next(err);
//			}
//			Photo.create({
//				name: name,
//				path: img.name
//			}, function (err) {
//				if(err) {
//					return next(err);
//				}
//				res.redirect('/');
//			});
//		});
	};
};