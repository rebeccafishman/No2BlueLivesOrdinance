var Geocodio = require('geocodio');
var CONFIG = require('config').BASE;

var geocodio = new Geocodio(CONFIG.geocodio);

var parser = require('parse-address');

(function() {
    module.exports = {
       address: function ( req, res ) {
			var address = parser.parseLocation(req.query.a);

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

				       	res.send({
				       		lat:result.location.lat,
				       		lng:result.location.lng,
				       		formatted:result.formatted_address
				       	});
				    }
				});

			} else {
				res.sendStatus(400, 'need street address');
			}




       }
    }
}).call(this);