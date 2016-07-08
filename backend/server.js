var express = require('express');
var qs = require('querystring');
var url = require("url");
var path = require("path");
var fs = require("fs");
var server = express();

server.use('/', express.static(path.join(__dirname, "../frontend")));

server.listen(8000, function() {
    console.log("server started at port 8000");
});

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
