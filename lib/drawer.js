
'use strict';

var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

var Drawer = function() {

};

Drawer.prototype.init = function(r) {
	this.dir = r;
	if(!fs.existsSync(this.dir+'/drawer')) {
		fs.mkdirSync(this.dir +'/drawer');
		fs.mkdirSync(this.dir + '/drawer/text');
		// fs.mkdirSync(this.dir + '/drawer/javascript');
		// fs.mkdirSync(this.dir + '/drawer/html');
		fs.mkdirSync(this.dir + '/drawer/json');
		console.log('set your drawer');
	}
	else {
		console.log('drawer already exists');
	};
};

Drawer.prototype.readURL = function(url,req,res) {
	var arrayURL = url.split('/');
	if(arrayURL[1] == 'read') {
		readFile(arrayURL[2], res);
	}
	else if(arrayURL[1] == 'write') {
		writeFile(arrayURL[2],req,res);
	}
};

var writeFile = function(filename,req,res){
	req.on('data', function(data) {
		var parsed = JSON.parse(data.toString());
		res.statusCode = 200;
		set_header(filename, res);
		res.write(JSON.stringify(parsed));
		fs.writeFileSync(file_route(filename), data);
		res.end();
	});
};

var readFile = function(filename,res) {
	console.log("from readFile:" + file_route(filename));
	fs.readFile(file_route(filename), function (err, data) {
  		if (err) {
    		console.log('no file exists');
    		return err;
  		}
  		if (data) {
  			res.statusCode = 200;
  			set_header(filename, res);
  			res.write(data);
  			res.end();
  		}
	});
};

function set_header(filename, res) { 
	if (path.extname(filename) == '.txt')
		res.setHeader("Content-Type", "text/plain");
	else if (path.extname(filename) == '.json')
		res.setHeader("Content-Type", "application/json");
	else if (path.extname(filename) == '.html')
		res.setHeader("Content-Type", "text/html");
}

function file_route(filename) { // return file route with filename
	var route = __dirname + '/drawer/';
	var file_extname = path.extname(filename);

	if(file_extname == '.txt') {route += 'text/'+ filename;}
	else if (file_extname == '.json') {route += 'json/' + filename;};
//	else if (file_extname == '.js') {route += 'javascript/'+ filename;} 
//	else if (file_extname == '.html') {route += 'html/' + filename;}
//	else route += 'etc/' + filename;
	return route;
};

module.exports = Drawer;