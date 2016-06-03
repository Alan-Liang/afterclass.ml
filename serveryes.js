#!/bin/env node
//  OpenShift sample Node application
var http = require('http');
var fs      = require('fs');
//var mongodb	= require('./node_modules/mongodb/index.js');

this.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
this.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
 if (typeof this.ipaddress === "undefined") {
	console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
	this.ipaddress = "127.0.0.1";
};
console.log(this.ipaddress);
console.log(this.port);

http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello World"
	response.end('Hello World\n');
}).listen(this.port,this.ipaddress);

