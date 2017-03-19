var express = require('express');
var router  = express.Router();
var path = require('path');
var bodyParser   = require('body-parser');
var mongodb   = require('mongodb');
var app = express();
var routes = require(path.join(__dirname + '/routes/routes.js'));

app.use('/', routes);
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 2008));

app.listen(app.get("port"), function () {
		console.log('Listening on port ' + app.get("port") + '.');
});
