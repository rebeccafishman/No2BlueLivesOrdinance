var Geocodio = require('geocodio');
var CONFIG = require('config').BASE;

var geocodio = new Geocodio(CONFIG.geocodio);

var parser = require('parse-address');

(function() {
    module.exports = {
       address: function ( req, res ) {
		var address = parser.parseLocation(req.query.a);
		address.city = 'Chicago';
		address.state = 'IL';

		var geocodioAddress = address.number;
		if (address.prefix) geocodioAddress += ' ' + address.prefix;
		if (address.street) geocodioAddress += ' ' + address.street;
		if (address.type) geocodioAddress += ' ' + address.type;
		if (address.city) geocodioAddress += ' ' + address.city;
		if (address.state) geocodioAddress += ' ' + address.state;
		if (address.zip) geocodioAddress += ' ' + address.zip;

	  console.log(geocodioAddress);

		geocodio.get('geocode', {q: geocodioAddress}, function(err, response){
		    if (err) {
		    	console.log(err);
		    	res.sendStatus(400, err);
		    } else {
			    var result = JSON.parse(response).results[0];
			    console.log(result);
		       	res.send({
		       		lat:result.location.lat,
		       		lng:result.location.lng,
		       		formatted:result.formatted_address
		       	});
		    }
		});
       }
    }
}).call(this);