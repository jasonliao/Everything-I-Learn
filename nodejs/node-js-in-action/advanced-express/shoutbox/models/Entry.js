var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: String,
	body: String,
	username: String
});

module.exports = mongoose.model('Entry', schema);