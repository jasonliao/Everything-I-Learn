var querystring = require('querystring');


function start(response, postData) {
    console.log('Request handler "start" was called ');
    
   var body = '<html>' + 
       '<head>' + 
       '<meta charset="UTF-8">' + 
       '<title> form </title>' +
       '</head>' +
       '<body>' + 
       '<form action="/upload" method="post">' +
       '<textarea name="text" row="20" cols="60"></textarea>' +
       '<br />' +
       '<input type="submit" value="submit text" />' +
       '</form>' +
       '</body>' +
       '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log('Request handler "upload" was called');
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('you have sent: ' + querystring.parse(postData).text);
    response.end();
}

exports.start = start;
exports.upload = upload;