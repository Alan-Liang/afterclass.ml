function(req,resp){
   var postData="";
   req.setEncoding("utf8");
   req.addListener("data", function(postDataChunk) {
   postData += postDataChunk;
    //console.log("Received POST data chunk '"+ postDataChunk + "'.");
   });
   function pending(obj){
      var regexps={"name":/[^\s]{2,}/,"cell":/^[0-9]{11}$/,"emil":/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,"quxi":/[^\s]{2,}/,"schl":/[^\s]{2,}/};
      if(!(obj.name&&obj.cell&&obj.emil&&obj.quxi&&obj.schl))return false;
      for(i in regexps){
         if(!regexps[i].test(obj[i])) return false;
      }
      return true;
   }
   req.addListener("end", function() {
      resp.writeHead(200,{'Content-Type': 'text/html','Charset':'utf-8'});
      console.log(postData);
      try{
         var objectone = JSON.parse(postData);
         if(pending(objectone)){
             resp.write(postData);
             fs.appendFile("data/uploaded/filter.txt", postData+"\n","",function(err){});
         }
         else resp.write("数据格式错误");
         resp.end();
      }catch(e){
         console.log(e);
         resp.write("数据格式错误");
         resp.end();
      }
 });}