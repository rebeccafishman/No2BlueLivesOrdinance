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
	  	document.getElementsByClassName('address-input')[0].disabled=true;
	  	document.getElementsByClassName('address-submit')[0].disabled=true;
	  	document.getElementsByClassName('address-input')[1].disabled=true;
	  	document.getElementsByClassName('address-submit')[1].disabled=true;
	  } else if (xhttp.readyState == 4) {
	  	document.getElementsByClassName('address-input')[0].disabled=false;
	  	document.getElementsByClassName('address-submit')[0].disabled=false;
	  	document.getElementsByClassName('address-input')[1].disabled=false;
	  	document.getElementsByClassName('address-submit')[1].disabled=false;
	  }
	  if (xhttp.readyState == 4 && xhttp.status == 200) {
	    console.log(wardMatch(JSON.parse(xhttp.responseText)));
	    var ward = wardMatch(JSON.parse(xhttp.responseText));
	    document.getElementsByClassName('formatted-address')[0].innerHTML = ward.normAddress;
	    document.getElementsByClassName('alderman-name')[0].innerHTML = ward.ward.council_member;
	    document.getElementsByClassName('alderman-phone')[0].innerHTML = ward.ward.phone;
	    document.getElementsByClassName('alderman-ward')[0].innerHTML = ward.ward.ward;
	    document.getElementsByClassName('alderman-profile')[0].setAttribute('class', '');
	    document.getElementsByClassName('alderman-err')[0].setAttribute('class', 'hidden');
	    document.getElementsByClassName('formatted-address')[1].innerHTML = ward.normAddress;
	    document.getElementsByClassName('alderman-name')[1].innerHTML = ward.ward.council_member;
	    document.getElementsByClassName('alderman-phone')[1].innerHTML = ward.ward.phone;
	    document.getElementsByClassName('alderman-ward')[1].innerHTML = ward.ward.ward;
	    document.getElementsByClassName('alderman-profile')[1].setAttribute('class', '');
	    document.getElementsByClassName('alderman-err')[1].setAttribute('class', 'hidden');
	  } else if (xhttp.readyState == 4 && xhttp.status >= 300){

	  	document.getElementsByClassName('alderman-profile')[0].setAttribute('class', 'hidden');
	  	document.getElementsByClassName('alderman-err')[0].setAttribute('class', '');
	  	document.getElementsByClassName('alderman-profile')[1].setAttribute('class', 'hidden');
	  	document.getElementsByClassName('alderman-err')[1].setAttribute('class', '');
	  }
	};

	xhttp.open("GET", "https://bluestlie.herokuapp.com/v1/address?a=" + encodeURIComponent(address), true);
	xhttp.send();
};

