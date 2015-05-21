var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shoutbox_app');

var schema = new mongoose.Schema({
	username: String,
	password: String,
});

module.exports = mongoose.model('User', schema);