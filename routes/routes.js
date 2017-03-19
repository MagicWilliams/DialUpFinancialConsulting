var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var data = require('../stocks.json');

router.get('/', function (req, res) {
  res.render('index',
    { title : 'Home',
      data: data 
    }
  )
});

router.get('/pull', function(req, res) {
  
  var MongoClient = mongodb.MongoClient; 
  var url = process.env.MONGO_URL;
  MongoClient.connect(url, function(err, db){
    if (err) {
      console.log('Cant connect to server. fix me!', err);
    } else {
      console.log("Connected to Mongo.");

      var collection = db.collection('madcastdb');
      var first = null;

      collection.find({"podcast":{$ne:null}}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else if (result.length){
          first = result;
        } else {
          res.send("No results yet!");
        }
      })

      collection.find({"podcast3":{$ne:null}}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else if (result.length){
          res.render("allfeedback.jade", {
            "feedback" : first,
            "morefeedback" : result,
            "count": first.length + result.length
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