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
	  if (xhttp.readyState == 0){
	  	var loadingdiv = document.getElementById('loading');
		loadingdiv.style.display = "none";	
	  }
	  else if (xhttp.readyState > 0 && xhttp.readyState < 4) {
	  	var loadingdiv = document.getElementById('loading');
		loadingdiv.style.display = "block";
	  }
	  else if (xhttp.readyState == 4 ){
	  	var loadingdiv = document.getElementById('loading');
		loadingdiv.style.display = "none";
	  }
	};

	xhttp.open("GET", "https://bluestlie.herokuapp.com/v1/address?a=" + encodeURIComponent(address), true);
	xhttp.send();
	
};

var addressMobile = function() {
	event.preventDefault();
	var addressMob = document.getElementById('mob_address').elements['mob-input'].value;
	console.log(addressMob);

	var xhttp;
	if (window.XMLHttpRequest) {
		    xhttp = new XMLHttpRequest();
	    } else {
		    // code for IE6, IE5
		    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState < 4) {
	  	document.getElementById('mob-input').disabled=true;
	  	document.getElementById('mob-submit').disabled=true;
	  } else if (xhttp.readyState == 4) {
	  	document.getElementById('mob-input').disabled=false;
	  	document.getElementById('mob-submit').disabled=false;
	  }
	  if (xhttp.readyState == 4 && xhttp.status == 200) {
	    console.log(wardMatch(JSON.parse(xhttp.responseText)));
	    var ward = wardMatch(JSON.parse(xhttp.responseText));
	    document.getElementById('mob-address').innerHTML = ward.normAddress;
	    document.getElementById('mob-name').innerHTML = ward.ward.council_member;
	    document.getElementById('mob-phone').innerHTML = ward.ward.phone;
	    document.getElementById('mob-phone').setAttribute('href', 'tel:\/\/' + ward.ward.phone);
	    document.getElementById('mob-ward').innerHTML = ward.ward.ward;
	    document.getElementById('mob-profile').setAttribute('class', '');
	    document.getElementById('mob-err').setAttribute('class', 'hidden');
	  } else if (xhttp.readyState == 4 && xhttp.status >= 300){

	  	document.getElementById('mob-profile').setAttribute('class', 'hidden');
	  	document.getElementById('mob-err').setAttribute('class', '');
	  }
	  if (xhttp.readyState == 0){
	  	var loadingdiv = document.getElementById('mob_loading');
		loadingdiv.style.display = "none";	
	  }
	  else if (xhttp.readyState > 0 && xhttp.readyState < 4) {
	  	var loadingdiv = document.getElementById('mob_loading');
		loadingdiv.style.display = "block";
	  }
	  else if (xhttp.readyState == 4 ) {
	  	var loadingdiv = document.getElementById('mob_loading');
		loadingdiv.style.display = "none";
	  }
	};

	xhttp.open("GET", "https://bluestlie.herokuapp.com/v1/address?a=" + encodeURIComponent(addressMob), true);
	xhttp.send();

};

var windowScript_mob = document.getElementById("mob_in_box");
var getScript_mob = document.getElementById("mob_visible");
var windowScript = document.getElementById("in_box");
var getScript = document.getElementById("visible");

var remove = function() {
	windowScript_mob.style.display = "none";
	getScript_mob.style.display = "block";
	windowScript.style.display = "none";
	getScript.style.display = "block";
};

var appear = function() {
	windowScript_mob.style.display = "block";
	getScript_mob.style.display = "none";
	windowScript.style.display = "block";
	getScript.style.display = "none";
};
