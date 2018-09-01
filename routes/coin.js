var express = require('express');
var app = express();
var coin = express.Router();

var CoinModel = require('../models/Coin');

// Defined store route
coin.route('/add').post(function (req, res) {
   var coin = new CoinModel(req.body);
   coin.save()
    .then(item => {
    	res.status(200).json({'coin': 'Coin added successfully'});
    })
    .catch(err => {
    	res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
coin.route('/').get(function (req, res) {
   CoinModel.find(function (err, coins){
    if(err){
      console.log(err);
    }
    else {
      res.json(coins);
    }
  });
});

// Defined edit route
coin.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  CoinModel.findById(id, function (err, coin){
      res.json(coin);
  });
});


//  Defined update route
coin.route('/update/:id').post(function (req, res) {
   CoinModel.findById(req.params.id, function(err, coin) {
    if (!coin)
      return next(new Error('Could not load Document'));
    else {
      coin.name = req.body.name;
      coin.price = req.body.price;

      coin.save().then(coin => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// To delete coins.
coin.route('/delete/:id').get(function (req, res) {
   CoinModel.findByIdAndRemove({_id: req.params.id}, function(err, coin){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = coin;


