var mongoose = require('mongoose');

(function(){
	module.exports = {
		addressSearch: mongoose.model('addressSearch', {
			request: {
				addr: Object
			},
			response: {
			  lat: Number,
			  lng: Number,
			  formatted: String
			}
		})
	}
}).call(this);