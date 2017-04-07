var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


router.get('/add', function(req, res) {
  res.render('addstock.jade');
});

router.get('/', function(req, res) {
  
  var MongoClient = mongodb.MongoClient; 
  var url = process.env.MONGO_URL;
  MongoClient.connect(url, function(err, db){
    if (err) {
      console.log('Cant connect to server. fix me!', err);
    } else {
      console.log("Connected to Mongo.");

      var collection = db.collection('dufc');

      collection.find({}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else if (result.length){
          res.render("index.jade", {
            "data" : result,
            "count" : result.length
          });
        } else {
          res.send("No results yet!");
        }
        db.close();
      })
    }
  })
});


router.get('/topstocks', function(req, res) {
  
  var MongoClient = mongodb.MongoClient; 
  var url = process.env.MONGO_URL;
  MongoClient.connect(url, function(err, db){
    if (err) {
      console.log('Cant connect to server. fix me!', err);
    } else {
      console.log("Connected to Mongo.");

      var collection = db.collection('dufc');

      collection.find({}).sort({value: -1}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else if (result.length){
          res.render("topstocks.jade", {
            "data" : result,
            "count" : result.length
          });
        } else {
          res.send("No results yet!");
        }
        db.close();
      })
    }
  })
});

/* if (document.getElementById('r1').checked) {
  rate_value = document.getElementById('r1').value;
}
*/

router.post('/add', function(req, res){
  var MongoClient = mongodb.MongoClient;
  var url = process.env.MONGO_URL;
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("something's wrong bro");
    } else {
      console.log("all good! HANNN");

      var name = req.body.name;
      name = name.toUpperCase();

      var stock = {name: name, value: req.body.value, color: req.body.color, abbreviation: req.body.abbreviation};

      var collection = db.collection('dufc');
      collection.insert([stock], function(err, result){
        if(err) {
          console.log(err);
        } else {
          console.log("First entry logged.");
          collection.find({}).toArray(function(err, result){
            res.render("index.jade", {
                "data" : result,
                "count" : result.length
              });
          })
        }
        db.close();
      });
  }})
});


module.exports = router;