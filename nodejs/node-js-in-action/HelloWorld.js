//var http = require('http');
//
//http.createServer(function(request, response) {
//    response.writeHead(200, {'Content-Type' : 'text/plain'});
//    response.end('Hello,World!');
//}).listen(3000);
//
//console.log('server running at http://localhost:3000');

/*

var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
    response.writeHead(200, {
        'Content-Type' : 'text/plain'
    });
    response.end('Hello,World!');
});

server.listen(3000);
console.log('server running at http://localhost:3000);

*/

var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type' : 'image/png'
    });
    fs.createReadStream('./image.png').pipe(response);
}).listen(3000);

console.log('Server running at http://localhost:3000');