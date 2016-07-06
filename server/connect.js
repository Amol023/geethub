var express = require('express');
var app = express();
var http = require('http');

app.use(express.static('../client'));
app.get('/', function(req, res) {
	res.sendFile('index.html');
});


app.listen(8080);