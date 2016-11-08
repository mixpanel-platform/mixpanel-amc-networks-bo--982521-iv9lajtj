var monthMapping = {
	0: "January",
	1: "February",
	2: "March",
	3: "April",
	4: "May",
	5: "June",
	6: "July",
	7: "August",
	8: "September",
	9: "October",
	10: "November",
	11: "December"
}

var daySuffix = {
	0: "th",
	1: "st",
	2: "nd",
	3: "rd",
	4: "th",
	5: "th",
	6: "th",
	7: "th",
	8: "th",
	9: "th",
}

var writeDate = function() {
	var dateString = "";
	var date = new Date();

	var day = date.getDate().toString();
	var dayLastDigit = day[day.length - 1];
	var month = date.getMonth();
	var year = date.getFullYear();

	dateString += monthMapping[month] + " ";
	dateString += date.getDate();
	dateString += daySuffix[dayLastDigit] + ", ";
	dateString += year;

	$('.report-header-date')[0].innerHTML = dateString;
}

writeDate();
