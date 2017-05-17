var express = require('express');
var clone = require('clone');
var fs = require('fs');
var multer = require('multer');
var path = require('path');
var hasha = require('hasha');
var fileType = require('file-type');
var vt = require("node-virustotal");

var con = vt.MakePublicConnection();
con.setKey("xxxxxxxxx");
console.log(con.getKey());

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/main.html");;
});

app.post('/myFile', upload.single('malFile'), function(req, res) {
  console.log(new Date() + " SourceIP:" + req.ip + " FileName:" + req.file.originalname + " FileMIMEType:" + fileType(req.file.buffer).mime + " SHA256HASH:" + hasha(req.file.buffer,{algorithm: 'sha256'}));
  con.getFileReport(hasha(req.file.buffer,{algorithm: 'sha256'}), function(data){
    console.log(data);
  }, function(mistake){
    console.log(mistake);
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ timestamp : new Date(), requestIP: req.ip, sha256hash: hasha(req.file.buffer,{algorithm: 'sha256'}), MIMEtype: fileType(req.file.buffer).mime, fileName: req.file.originalname}));
  res.end();
});

app.listen(8080, '192.168.56.102', function() {
  console.log('server is listening on port 8080');
});
