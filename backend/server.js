var express = require('express');
var qs = require('querystring');
var path = require('path');
var mysql = require('mysql');

var connection;
function createConnection2(database) {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "amogh",
        database: database
    });
    connection.connect();
}

function createConnection() {
    createConnection2("feedbackform");
}

var server = express();

server.use('/', express.static(path.join(__dirname, "../frontend")));
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.listen(8000);

server.post("/students", function (req, res) {
    var body = "";
    req.on('data', function(data) {
        body += data;
    });
    req.on('end',  function() {
        var jsonBody = qs.parse(body);
        createConnection2(jsonBody.courseNumber);
        connection.query("SELECT * FROM Students", function(err, rows, fields) {
            if (err) {
                console.log("error in query");
                res.sendStatus(500);
                return;
            }

            var studentData = "[";
            for (var i = 0; i < rows.length; ++i) {
                studentData += "{\"pgpid\": \"" + rows[i].pgpid + "\", ";
                studentData += "\"responded\": " + rows[i].responded + "},";
            }
            studentData = studentData.substring(0, studentData.length - 1);
            studentData += "]";
            res.send(studentData);
        });
        connection.end();
    });
});

server.post("/response", function(req, res) {
    var body = "";
    req.on('data', function(data) {
        body += data;
    });
    req.on('end',  function() {
        var jsonBody = qs.parse(body);
        createConnection2(jsonBody.courseNumber);
        connection.query("SELECT * FROM Response", function(err, rows, fields) {
            if (err) {
                console.log("error in query");
                res.sendStatus(500);
                return;
            }

            var responseData = "[";
            for (var i = 0; i < rows.length; ++i) {
                responseData += "{\"qno\": " + rows[i].qno;
                responseData += ", \"poor\": " + rows[i].poor;
                responseData += ", \"fair\": " + rows[i].fair;
                responseData += ", \"good\": " + rows[i].good;
                responseData += ", \"verygood\": " + rows[i].verygood;
                responseData += ", \"excellent\": " + rows[i].excellent + "},";
            }
            responseData = responseData.substring(0, responseData.length - 1);
            responseData += "]";
            res.send(responseData);
        });
        connection.end();
    });
});

server.post("/record", function (req, res) {
    var body = "";
    req.on('data', function(data) {
        body += data;
    });
    req.on('end',  function() {
        var jsonBody = qs.parse(body);
        createConnection2(jsonBody.courseNumber);
        connection.query("SELECT responded FROM Students WHERE pgpid=\"" + jsonBody.id + "\"",
                function(err, rows, fields) {
            if (err) {
                console.log("error in query");
                res.sendStatus(500);
                connection.end();
                return;
            }

            if (rows[0] == undefined || rows[0].responded != '0') {
                res.sendStatus(200);
                connection.end();
                return;
            }

            connection.query("UPDATE Students SET responded=TRUE WHERE pgpid=\"" + jsonBody.id + "\"");
            connection.query("UPDATE Response SET " + jsonBody.q0 + "=" + jsonBody.q0 + " + 1 WHERE qno=0");
            connection.query("UPDATE Response SET " + jsonBody.q1 + "=" + jsonBody.q1 + " + 1 WHERE qno=1");
            connection.query("UPDATE Response SET " + jsonBody.q2 + "=" + jsonBody.q2 + " + 1 WHERE qno=2");
            connection.query("UPDATE Response SET " + jsonBody.q3 + "=" + jsonBody.q3 + " + 1 WHERE qno=3");
            connection.query("UPDATE Response SET " + jsonBody.q4 + "=" + jsonBody.q4 + " + 1 WHERE qno=4");
            connection.query("UPDATE Response SET " + jsonBody.q5 + "=" + jsonBody.q5 + " + 1 WHERE qno=5");
            connection.query("UPDATE Response SET " + jsonBody.q6 + "=" + jsonBody.q6 + " + 1 WHERE qno=6");
            connection.query("UPDATE Response SET " + jsonBody.q7 + "=" + jsonBody.q7 + " + 1 WHERE qno=7");
            connection.query("UPDATE Response SET " + jsonBody.q8 + "=" + jsonBody.q8 + " + 1 WHERE qno=8");
            connection.query("UPDATE Response SET " + jsonBody.q9 + "=" + jsonBody.q9 + " + 1 WHERE qno=9");
            res.sendStatus(200);
            connection.end();
        });
    });
});
