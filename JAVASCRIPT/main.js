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