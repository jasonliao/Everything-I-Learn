var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var verification = require('./verification.js');

exports.db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '123123',
	database: 'todo'
});

exports.server = http.createServer(function (req, res) {
	switch(req.url) {
		case '/':
			var html = fs.readFileSync('./index.html');
			res.setHeader('Content-Type', 'text/html');
			res.end(html);
			break;
		case '/login':
			//TODO
			break;
		case '/register':
			verification.isExist(exports.db, req, res);
			break;
	}
	loadCssJs(req, res);
});

function loadCssJs(req, res) {
	var path = req.url;
	var type = path.split('.');
	if (/[js][css]/.test(path)) {
		var data = fs.readFileSync('.' + path);
		res.setHeader('Content-Type', 'text/' + type[1]);
		res.end(data);
	}
}