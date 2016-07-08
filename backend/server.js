var express = require('express');
var qs = require('querystring');
var path = require("path");

var server = express();

server.use('/', express.static(path.join(__dirname, "../frontend")));
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.listen(8000);

server.get("/data", function (req, res) {
    console.log("get");
    res.send("get data");
});

server.post("/data", function (req, res) {
    console.log("post");
    var body = "";
    req.on('data', function(data) {
        body += data;
    });
    req.on('end',  function() {
        console.log(qs.parse(body));
        res.send("post complete");
    });
});
