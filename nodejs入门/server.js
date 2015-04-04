var http = require('http');
var url = require('url');

function start(route, handle) {
    
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log(pathname);
        
        response.writeHead(200, {'Content-Type': 'text/plain'});
        var content = route(handle, pathname);
        response.write(content);
        response.end();
    }).listen(8888);
    
}

exports.start = start;
/*
    回调
    当我们向服务器发送请求的时候
    createServer的参数,也就是那个函数
    就是我们完成请求之后的回调函数
*/

/*
    var url = request('url);
    var pathname = url.parse(request.url).pathname;
    就可以知道用户请求的路径
*/

/*
    requestHandler用来处理不同请求的的操作
    在requestHandler里写响应函数
    在server层把pathname和handle传给路由(从index传入)
    然后路由来处理
*/