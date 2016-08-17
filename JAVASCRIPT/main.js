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

var addressSearch = function() {
	event.preventDefault();
	var address = document.getElementById('address').elements['address'].value;

	var xhttp;
	if (window.XMLHttpRequest) {
		    xhttp = new XMLHttpRequest();
	    } else {
		    // code for IE6, IE5
		    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState == 4 && xhttp.status == 200) {
	    console.log(xhttp.responseText, wardMatch(JSON.parse(xhttp.responseText)));
	  }
	};

	xhttp.open("GET", "http://bluestlie.herokuapp.com/v1/address?a=" + encodeURIComponent(address), true);
	xhttp.send();
};
