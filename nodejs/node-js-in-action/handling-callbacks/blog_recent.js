var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
	getTitles(response);
}).listen(3000);

function handerError(err, response) {
	console.error(err);
	response.end('Server Error');
}

function getTitles(response) {
	fs.readFile('./titles.json', function(err, data) {
		if(err) {
			handerError(err,response);
		} else {
			gteTemplate(data, response)
		}
	});
}

function gteTemplate(data, response) {
	var titles = JSON.parse(data.toString());
	fs.readFile('./template.html', function(err, data) {
		if(err) {
			handerError(err,response);
		} else {
			formaHtml(titles, data, response);
		}
	});
}

function formaHtml(titles, data, response) {
	var tmpl = data.toString();
	var html = tmpl.replace('%', titles.join('</li><li>'));
	response.writeHead(200, {
		'Content-Type': 'text/html' 
	});
	response.end(html);
}
