//document.write("Hey,hey"); //Test line

var yrAlder = function () {
	var reply = document.getElementById("us_ward");
	var userIn = document.getElementsByClassName("input")[3];

	var wardOne = document.createElement("p");
	var warText = document.createTextNode("Joe");
	wardOne.appendChild(warText);
	//reply.appendChild(wardOne);

	if (userIn.value === "one" || userIn.value === "ward one") {
		reply.appendChild(wardOne);
	}
	else {
		alert("Enter your ward");
	}
	
};
		