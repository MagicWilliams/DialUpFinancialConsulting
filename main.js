var express = require('express');
var path = require('path');
var bodyParser   = require('body-parser');
var mongodb   = require('mongodb');

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
});

app.listen(process.env.PORT || 2008, function () {
	if (process.env.PORT){
		console.log('Example app listening on port ' + process.env.PORT + '!');
	} else {
		console.log('Example app listening on port 2008!');
	}
});
