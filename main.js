var express = require('express');
var router  = express.Router();
var path = require('path');
var bodyParser   = require('body-parser');
var mongodb   = require('mongodb');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 2008));
app.set('mongo_url', (process.env.MONGO_URL || "mongodb://localhost:27017/madcastdb"));

var routes = require(path.join(__dirname + '/routes/routes.js'));
app.use('/', routes);

app.listen(80), function () {
		console.log('Listening on port ' + app.get("port") + '.');
};

// You might have to run 'export MONGO_URL=mongodb://localhost:27017/dufc' in your terminal my G