function(req,resp){
   var postData="";
   req.setEncoding("utf8");
   req.addListener("data", function(postDataChunk) {
   postData += postDataChunk;
    //console.log("Received POST data chunk '"+ postDataChunk + "'.");
   });
   req.addListener("end", function() {
       resp.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
      console.log(postData);
      try{
         var objectOne = JSON.parse(postData);
         if(!(objectOne.email&&objectOne.phone)) resp.write("数据格式错误");
         else{
             var fileIn=fs.readFileSync("data/dynamic/webapi/afterreg.html",{"encoding":"utf-8"});
             fileIn=fileIn.replace("{{emailaddr}}",objectOne.email);
             fileIn=fileIn.replace("{{phone}}",objectOne.phone);
             resp.write(fileIn);
         }
         resp.end();
      }catch(e){
         console.log(e);
         resp.write("数据格式错误");
         resp.end();
      }
 });}