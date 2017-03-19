var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


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

module.exports = router;