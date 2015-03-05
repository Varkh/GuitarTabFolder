var http = require('http');
var fs = require('fs');
var url = require("url");


http.createServer(function(request, response) {

    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    //response.writeHeader(200, {"Content-Type": "text/html"});
    fileReader(pathname, response);
}).listen(8000);


function fileReader(pathname, response) {
    var filePath = "." + (pathname != "/" ? pathname : "/index.html");
    console.log("looking for file: " + filePath);
    fs.readFile(filePath, function (err, html) {
        if (err) {
            response.end();
            return;
        }


        response.write(html);
        response.end();
    });
}