/* Set data for non-livestream charts and tables
	Edit keys and values in this object to change the bar chart */

var topSectionData = {
	'Beyond the Walls': 30000,
	'A-Horror': 22300,
	'Alien Intruder': 27100,
	'Animal Planet': 18800
};

// Content for 'Top Content' Table
// Modify headers by changing first internal array's strings
// Modify data by changing the subsequent arrays
var topContentData = [
	['Content Title', 'Total Time Watched', 'Unique Views'],
	['The Workshop', '500h 30m', '230,400'],
	['Crawlspace', '450h 5m', '222,900'],
	['Catnip', '423h 22m', '215,651'],
	['Touching the Void', '401h 33m', '209,255'],
	['Toad Road', '300h 49m', '201,857'],
	['Citadel', '210h 2m', '194,101'],
	['Carved', '150h 14m', '188,540'],
	['A Horrible Way to Die', '50h 57m', '181,253'],
];

// To change content share types, change the names of the keys here (up to 4 names max)
var contentShareData = {
	'Facebook': {

	},
	'Twitter': {

	},
	'Email': {

	},
	'Tumblr': {

	}
};


// **** Can ignore everything below - it just styles and loads the charts ****
// ---------------------------------------------------------------------------

function generateWeekData() {
	var contentShareTypes = Object.keys(contentShareData);

	// Determines which values content shares fluctuate around
	var contentBaselines = [25000, 21000, 19000, 14000];

	for (var i = 0; i < contentShareTypes.length; i++) {
		var currentContent = contentShareTypes[i];
		var randomValue = Math.floor(Math.random() * 2200 + contentBaselines[i]);

		var today = moment();
		contentShareData[currentContent][today.format('YYYY[-]MM[-]DD')] = randomValue;

		for (var k = 0; k < 7; k++) {
			var subtractedDay = today.subtract(1, 'days');
			randomValue = Math.floor(Math.random() * 2200 + contentBaselines[i]);

			contentShareData[currentContent][subtractedDay.format('YYYY[-]MM[-]DD')] = randomValue;
		}
	}
}

function populateContentTable() {
	var headers = topContentData[0];
	var headerRow = document.createElement('tr');

	// Append headers to table
	for (var i = 0; i < headers.length; i++) {
		var headerText = headers[i];
		var headerElement = document.createElement('th');
		headerElement.className = "mp-table-header-item";
		headerElement.innerHTML = headerText;

		headerRow.appendChild(headerElement);
	}

	$('#content-table-body').append(headerRow);

	// Append data to table
	for (var i = 1; i < topContentData.length; i++) {
		var dataRow = topContentData[i];
		var dataRowElement = document.createElement('tr');

		for (var k = 0; k < dataRow.length; k++) {
			var data = dataRow[k];
			var dataElement = document.createElement('td');
			dataElement.className = "mp-table-row-item";

			dataElement.innerHTML = data;
			dataRowElement.appendChild(dataElement);
		}

		$('#content-table-body').append(dataRowElement);
	}
}

// Set highcharts styles for graph axes
function drawAxisBackgrounds() {
	var chartOptions = this.options.chart;
	var cornerRadius = 0;

	var yWidth = this.chartWidth - this.plotWidth - (chartOptions.spacingLeft || (chartOptions.spacing && chartOptions.spacing[3]) || 0);
	var xHeight = this.plotHeight + (chartOptions.spacingTop || (chartOptions.spacing && chartOptions.spacing[0]) || 0);

	// Use highchart renderer rect() method to draw a colored background rectangle in plot
	this.renderer.rect(0, this.plotTop, this.chartWidth, this.plotHeight, cornerRadius)
		.attr(
			{
				'stroke-width': 0,
				'fill': '#fbfcfd',
				'zIndex': 0
			}
		).add();

	// Draw a rectangle on the Y-Axis background
	this.renderer.rect(0, this.plotTop, yWidth - 10, this.plotHeight, cornerRadius)
		.attr(
			{
				'stroke-width': 0,
				'fill': '#fbfcfd',
				'zIndex': 0
			}
		).add();
}


// Render a JQL query as a styled MP Chart
// PARAMS:
//	elementSelector - ID or classes needed to target element for .MPChart() call
//	data - Data returned from JQL query to populate chart
function renderChart(elementSelector, data, chartType) {
	var axisFontStyle = {
		fontSize: '1em',
		fontWeight: '600',
		fontFamily: 'Source Sans Pro'
	}

	var options = {
		chart: {
			marginTop: 10,
			marginBottom: 30,
			events: {
				load: drawAxisBackgrounds
			}
		},
		plotOptions: {
			series: {
				pointWidth: 25
			}
		},
		xAxis: {
			labels: {
				style: axisFontStyle
			},
			tickWidth: 0
		},
		yAxis: {
			gridLineColor: '#dfe2ec', //'#E6E8EB',
			gridLineDashStyle: 'ShortDash',
			gridLineWidth: 1,
			labels: {
				style: axisFontStyle
			}
		}
	}

	var barChart = $(elementSelector).MPChart({
		chartType: chartType,	// Default setting is bar, can be changed to line/pie
		highchartsOptions: options
	});

	barChart.MPChart('setData', data);
}

// Run all functions defined above once document has loaded
$(document).ready(function() {
    renderChart('.top-sections-chart', topSectionData, 'bar');

    generateWeekData();
    console.table(contentShareData);
    $('.content-shares-chart').MPChart({
    	chartType: 'line',
    	data: contentShareData
    });

    populateContentTable();
});
