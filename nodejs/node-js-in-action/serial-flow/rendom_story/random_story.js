//Serial flow control implemented in a simple application

var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

function checkForRSSFile() {
	fs.exists(configFilename, function(exists) {
		if(!exists) {
			return next(new Error('Missing RSS file: ' + configFilename));
		}
		next(null, configFilename);
	});
}

function readRSSFile(configFilename) {
	fs.readFile(configFilename, function(err, feedList) {
		if(err) {
			return next(err);
		}
		feedList = feedList
								.toString()
//								.replace(/^\s+|\s+$/g, '');
								.split(' ');
		console.log(feedList);
		var random = Math.floor(Math.random() * feedList.length);
		console.log(feedList[random]);
		next(null, feedList[random]);
	});
}

function downloadRSSFeed(feedUrl) {
	request({
		url : feedUrl
	}, function(err, res, body) {
		if(err) {
			return next(err);
		}
		if(res.statusCode != 200) {
			return next(new Error('Abnormal response status code'));
		}
		next(null, body);
	});
}

function parseRSSFeed(rss) {
	var handler = new htmlparser.RssHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);
	console.log(handler.dom);
	if(!handler.dom.length) {
		return next(new Error('No RSS items found'));
	}
	var item = handler.dom.shift();
	console.log(item.data);
	console.log(item.type);
}

var tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed];
function next(err, result) {
	if(err) {
		throw err;
	}
	var currentTask = tasks.shift();
	if(currentTask) {
		currentTask(result);
	}
}

next();