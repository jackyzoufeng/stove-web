const dataspans = document.querySelectorAll(".menu-item");
dataspans[0].addEventListener("click", () => {
	window.location.href = `./query-table.html`;
});
dataspans[1].addEventListener("click", () => {
	window.location.href = `./query-curve.html`;
});

const homeimage = document.querySelector(".image-item");
homeimage.addEventListener("click", () => {
	window.location.href = "./index.html";
});

var myChart = echarts.init(document.querySelector("#main-curve"));

if (localStorage.getItem("query-data")) {
	var json = JSON.parse(localStorage.getItem("query-data"));
	var devname = localStorage.getItem("devname");
	console.log(json);
	console.log(devname);
	showCurve(json, devname);
}

function showCurve(devdata, devname) {
	// 指定图表的配置项和数据
	var option = {
	  title: {
	    text: `${devname}历史曲线`
	  },
	  tooltip: {},
	  legend: {
	  },
	  xAxis: {},
	  yAxis: [],
	  series: []
	};
	option.xAxis.data = devdata.xaxis;
	var yasixcount = devdata.yaxis.count;
	for (var i = 0; i < yasixcount; i++) {
		var yaxis = {};
		yaxis.type = "value";
		yaxis.name = devdata.yaxis.datalist[i].name;
		yaxis.alignTicks = true;
		yaxis.axisLabel = {};
		yaxis.axisLabel.formatter = "\{value\}";
		option.yAxis[i] = yaxis;
	}
	var seriescount = devdata.series.count;
	for (var i = 0; i < seriescount; i++) {
		var series = {};
		series.name = devdata.series.datalist[i].name;
		series.type = "line";
		series.yAxisIndex = devdata.series.datalist[i].yindex;
		series.data = devdata.series.datalist[i].data;
		series.colorBy = "data";
		option.series[i] = series;
	}
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}
