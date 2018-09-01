var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoinModel = new Schema({
		name: {
			type: String,
		},
		price: {
			type: Number
		}	
	}, {
		collection: 'coins',
	}); 

module.exports = mongoose.model('CoinModel', CoinModel);