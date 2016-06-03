var httpsModule = require('https');
var http=require('http');
var fs = require('fs');

http.createServer(function(req,resp){
    resp.writeHead(200);
    resp.end("<script>location.href=\"https://ixsh.rdfz15.tk/\"</script>\n");}).listen(8080);

var https = httpsModule.Server({
     key: fs.readFileSync('/cert.key'),
     cert: fs.readFileSync('/cert.cer')
}, function(req, res){
    res.writeHead(200);
    res.end("hello world\n");
});

//https默认de监听端口时443，启动1000以下的端口时需要sudo权限
https.listen(443, function(err){  
     console.log("https listening on port: 443");
});