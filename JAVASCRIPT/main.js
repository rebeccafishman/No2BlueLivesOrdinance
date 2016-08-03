var wardMatch = function(lng, lat, addr) {
	var results = leafletPip.pointInLayer([lng, lat], districts);
	if (results.length > 0) {
		return {
			ward: results[0].feature.properties,
			normAddress: addr
		};
	} else {
		return false;
	}
}