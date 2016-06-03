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

	// ���� HTTP ͷ�� 
	// HTTP ״ֵ̬: 200 : OK
	// ��������: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// ������Ӧ���� "Hello World"
	response.end('Hello World\n');
}).listen(this.port,this.ipaddress);

