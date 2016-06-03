var http = require('http');
var fs = require('fs');
var url = require('url');
var mime=require('mime');

this.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
this.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
 if (typeof this.ipaddress === "undefined") {
	console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
	this.ipaddress = "127.0.0.1";
};
console.log(this.ipaddress);
console.log(this.port);



// Create a server
http.createServer( function (request, response) {  
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
   
   // Read the requested js file content from file system
   fs.readFile("data/dynamic/"+pathname.substr(1)+'.js', function (err, data) {
      if (err) {



//Read orig. file
    fs.readFile("data/static/"+pathname.substr(1), function (err1, data) {
      if (err1) {
        fs.readFile("data/static/"+pathname.substr(1)+".html", function (err2, data) {
          if (err2) {
             console.log(err2);
             // HTTP Status: 404 : NOT FOUND
             // Content Type: text/plain
             response.writeHead(404, {});
          }else{	
             //orig. Page found	  
             // HTTP Status: 200 : OK
             // Content Type: text/plain
             response.writeHead(200, {'Content-Type':'text/html'});	
             
//console.log(data.toString());
             // Write the content of the file to response body
             response.write(data.toString());		
          }
          // Send the response body 
          response.end();
          });
      }else{	
         //orig. Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain
        var type=mime.lookup(pathname.substr(1));
         response.writeHead(200, {'Content-Type':type});	
         
         // Write the content of the file to response body
         response.write(data);
         response.end();
      }
      // Send the response body 
   });


      }else{	
//console.log(data.toString());
         //Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain	
         
         // Write the content of the file to response body
         eval(
'('+data.toString()+')(request,response);');	
      
      // Send the response body 
   }
   });   
}).listen(this.port,this.ipaddress);

// Console will print the message
console.log('Server running at http://127.0.0.1:8080/');