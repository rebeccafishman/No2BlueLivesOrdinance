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
//Code with Class [0] and [1]
var addressSearch = function() {
	event.preventDefault();
	var address = document.getElementsByClassName[0]('address').elements['address-input'].value;

	var xhttp;
	if (window.XMLHttpRequest) {
		    xhttp = new XMLHttpRequest();
	    } else {
		    // code for IE6, IE5
		    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState < 4) {
	  	document.getElementsByClassName[0]('address-input').disabled=true;
	  	document.getElementsByClassName[0]('address-submit').disabled=true;
	  	document.getElementsByClassName[1]('address-input').disabled=true;
	  	document.getElementsByClassName[1]('address-submit').disabled=true;
	  } else if (xhttp.readyState == 4) {
	  	document.getElementsByClassName[0]('address-input').disabled=false;
	  	document.getElementsByClassName[0]('address-submit').disabled=false;
	  	document.getElementsByClassName[1]('address-input').disabled=false;
	  	document.getElementsByClassName[1]('address-submit').disabled=false;
	  }
	  if (xhttp.readyState == 4 && xhttp.status == 200) {
	    console.log(wardMatch(JSON.parse(xhttp.responseText)));
	    var ward = wardMatch(JSON.parse(xhttp.responseText));
	    document.getElementsByClassName[0]('formatted-address').innerHTML = ward.normAddress;
	    document.getElementsByClassName[0]('alderman-name').innerHTML = ward.ward.council_member;
	    document.getElementsByClassName[0]('alderman-phone').innerHTML = ward.ward.phone;
	    document.getElementsByClassName[0]('alderman-ward').innerHTML = ward.ward.ward;
	    document.getElementsByClassName[0]('alderman-profile').setAttribute('class', '');
	    document.getElementsByClassName[0]('alderman-err').setAttribute('class', 'hidden');
	    document.getElementsByClassName[1]('formatted-address').innerHTML = ward.normAddress;
	    document.getElementsByClassName[1]('alderman-name').innerHTML = ward.ward.council_member;
	    document.getElementsByClassName[1]('alderman-phone').innerHTML = ward.ward.phone;
	    document.getElementsByClassName[1]('alderman-ward').innerHTML = ward.ward.ward;
	    document.getElementsByClassName[1]('alderman-profile').setAttribute('class', '');
	    document.getElementsByClassName[1]('alderman-err').setAttribute('class', 'hidden');
	  } else if (xhttp.readyState == 4 && xhttp.status >= 300){

	  	document.getElementsByClassName[0]('alderman-profile').setAttribute('class', 'hidden');
	  	document.getElementsByClassName[0]('alderman-err').setAttribute('class', '');
	  	document.getElementsByClassName[1]('alderman-profile').setAttribute('class', 'hidden');
	  	document.getElementsByClassName[1]('alderman-err').setAttribute('class', '');
	  }
	};

	xhttp.open("GET", "https://bluestlie.herokuapp.com/v1/address?a=" + encodeURIComponent(address), true);
	xhttp.send();
};

/* Code with Id
var addressSearch = function() {
	event.preventDefault();
	var address = document.getElementById('address').elements['address-input'].value;

	var xhttp;
	if (window.XMLHttpRequest) {
		    xhttp = new XMLHttpRequest();
	    } else {
		    // code for IE6, IE5
		    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState < 4) {
	  	document.getElementById('address-input').disabled=true;
	  	document.getElementById('address-submit').disabled=true;
	  } else if (xhttp.readyState == 4) {
	  	document.getElementById('address-input').disabled=false;
	  	document.getElementById('address-submit').disabled=false;
	  }
	  if (xhttp.readyState == 4 && xhttp.status == 200) {
	    console.log(wardMatch(JSON.parse(xhttp.responseText)));
	    var ward = wardMatch(JSON.parse(xhttp.responseText));
	    document.getElementById('formatted-address').innerHTML = ward.normAddress;
	    document.getElementById('alderman-name').innerHTML = ward.ward.council_member;
	    document.getElementById('alderman-phone').innerHTML = ward.ward.phone;
	    document.getElementById('alderman-ward').innerHTML = ward.ward.ward;
	    document.getElementById('alderman-profile').setAttribute('class', '');
	    document.getElementById('alderman-err').setAttribute('class', 'hidden');
	  } else if (xhttp.readyState == 4 && xhttp.status >= 300){

	  	document.getElementById('alderman-profile').setAttribute('class', 'hidden');
	  	document.getElementById('alderman-err').setAttribute('class', '');
	  }
	};

	xhttp.open("GET", "https://bluestlie.herokuapp.com/v1/address?a=" + encodeURIComponent(address), true);
	xhttp.send();
};
/*
