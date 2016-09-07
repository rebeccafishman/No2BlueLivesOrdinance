var Geocodio = require('geocodio');
var CONFIG = require('config').BASE;

var geocodio = new Geocodio(CONFIG.geocodio);

var parser = require('parse-address');


var mongoose = require('mongoose');
var models = require('../../../models');
var db = mongoose.connect(CONFIG.mongo.uri);

(function() {
    module.exports = {
       address: function ( req, res ) {
			var address = parser.parseLocation(req.query.a);
			var log = new models.addressSearch();
			log.request.addr = address;

			if (address.number) {
				var geocodioAddress = address.number;
				address.city = 'Chicago';
				address.state = 'IL';
				if (address.prefix) geocodioAddress += ' ' + address.prefix;
				if (address.street) geocodioAddress += ' ' + address.street;
				if (address.type) geocodioAddress += ' ' + address.type;
				if (address.city) geocodioAddress += ' ' + 'Chicago';
				if (address.state) geocodioAddress += ' ' + 'IL';
				if (address.zip) geocodioAddress += ' ' + address.zip;
				
				geocodio.get('geocode', {q: geocodioAddress}, function(err, response){
				    if (err) {
				    	res.sendStatus(400, err);
				    } else {
					    var result = JSON.parse(response).results[0];
				    	var responsePayload = {
				       		lat:result.location.lat,
				       		lng:result.location.lng,
				       		formatted:result.formatted_address
				       	}

				       	log.response = responsePayload;
				       	console.log(log);
				       	log.save(function(err, record){
				       		console.log(err, record);
				       	})
				       	res.send(responsePayload);
				    }
				});

			} else {
				res.sendStatus(400, 'need street address');
			}




       }
    }
}).call(this);