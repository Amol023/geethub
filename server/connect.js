var express = require('express');
var app = express();
var http = require('http');

app.use(express.static('../client'));
console.log(__dirname);
app.get('/', function(req, res) {
	res.sendFile('index.html');
});

app.listen(8080);