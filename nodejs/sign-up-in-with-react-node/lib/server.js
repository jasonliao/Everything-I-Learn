var http = require('http');
var fs = require('fs');

module.exports = http.createServer(function (req, res) {
	if (req.url == '/') {
		var html = fs.readFileSync('./index.html');
		res.setHeader('Content-Type', 'text/html');
		res.end(html);
	} else if (req.url == '/login') {
		//TODO
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