const express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	config = require('./config/DB.js'),
	coin = require('./routes/coin');

	mongoose.Promise = global.Promise;
	mongoose.connect(config.DB).then(
		() => {console.log('database is connected...!!!') },
		err => { console.log('Can not connect to the database..!!'+ err)}
	);

	const app = express();
	app.use(bodyParser.json());
	app.use(cors());
	const port = process.env.PORT || 4000;


	app.use('/coins', coin);

	const server = app.listen(port, function(){
		console.log('Listening On Port' + port);
	});

