var Geocodio = require('geocodio');
var CONFIG = require('config').BASE;

var geocodio = new Geocodio(CONFIG.geocodio);

(function() {
    module.exports = {
       address: function ( req, res ) {
		var address = req.query.a;

		geocodio.get('geocode', {q: address}, function(err, response){
		    if (err) {
		    	res.sendStatus(400);
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