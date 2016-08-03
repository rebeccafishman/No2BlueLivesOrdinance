var wardMatch = function(location) {
	var results = leafletPip.pointInLayer([location.lng, location.lat], districts);
	if (results.length > 0) {
		return {
			ward: results[0].feature.properties,
			normAddress: location.formatted
		};
	} else {
		return false;
	}
}

console.log(wardMatch({
  "lat": 41.962087,
  "lng": -87.670701,
  "formatted": "4417 N Paulina St, Chicago, IL 60640"
}));