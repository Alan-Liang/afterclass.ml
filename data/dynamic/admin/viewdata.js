function(req,resp){
    var params = url.parse(req.url,true).query;
    if(params["p"]=="{{password}}"){
        resp.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
        var fileIn=fs.readFileSync("data/uploaded/filter.txt",{"encoding":"utf-8"});
        fileIn=fileIn.toString();
        var lines=fileIn.split('\n');
        for(i in lines){
            if(!(/^{/.test(lines[i])&&/}$/.test(lines[i]))){
                resp.write(lines[i]+"\n");
            }else{
                var dataObj=JSON.parse(lines[i]);
                var jian=dataObj.jian.split("\n");
                jian=jian.join("<br />");
                //var a={"name":"梁亚伦","cell":"15010235101","emil":"yalun_liang@sina.com","quxi":"海淀","schl":"清华大学附属中学上地学校","jian":"aaaaaaaaaa\n换行"}
                resp.write("<table border=2><tr><td>姓名</td><td>电话</td><td>邮箱</td><td>区县</td><td>学校</td><td>简历</td></tr>");
                resp.write("<tr>");
                resp.write("<td>"+dataObj.name+"</td>");
                resp.write("<td>"+dataObj.cell+"</td>");
                resp.write("<td>"+dataObj.emil+"</td>");
                resp.write("<td>"+dataObj.quxi+"</td>");
                resp.write("<td>"+dataObj.schl+"</td>");
                resp.write("<td>"+jian+"</td>");
                resp.write("</tr></table><hr />");
            }
        }
        resp.end();
    }
    else{
        resp.writeHead(200,{"Content-type":"text/html"});
        resp.end("<form action='' method=get>Password:<input name='p' /><input type=submit /></html>");
    }
}