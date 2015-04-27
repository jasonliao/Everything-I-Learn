var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

http.createServer(function(req, res) {
	var url = parse(req.url);
	var path = join(root, url.pathname);
//	var stream = fs.createReadStream(path);
//	var copyText = fs.createWriteStream('./copytext.txt')
//	stream.pipe(res);
//	stream.on('error', function(err) {
//		res.statusCode = 500;
//		res.end('Internal Server Error');
//	});
//	res.end();
	fs.stat(path, function(err, stat) {
		if(err) {
			if('ENOENT' == err.code) {
				res.statusCode = 404;
				res.end('File Not Found');
			} else {
				res.statusCode = 500;
				res.end('Internal Server Error');
			}
		} else {
			res.setHeader('Content-Length',stat.size);
			var stream = fs.createReadStream(path);
			stream.pipe(res);
			stream.on('error', function(err) {
				res.statusCode = 500;
				res.end('Internal Server Error');
			});
		}
	});
}).listen(3000);