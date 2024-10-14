let urlParams;
let queryString;

function getUrlParams() {
	queryString = document.URL.split('?')[1];
	if (!queryString) {
		return {};
	}
	const queryParam = {};
	queryString.split('&').forEach(param => {
		const[key, value] = param.split('=');
		queryParam[key] = value;
	});
	return queryParam;
}

urlParams = getUrlParams();
if ((urlParams["dev_id"] === null)||(urlParams["dev_id"] === undefined)) {
	window.location.href = "./index.html";
}

const dataspans = document.querySelectorAll(".menu-item");
dataspans[0].addEventListener("click", () => {
	window.location.href = `./device-info.html?${queryString}`;
});
dataspans[1].addEventListener("click", () => {
	window.location.href = `./device-curve.html?${queryString}`;
});
dataspans[2].addEventListener("click", () => {
	window.location.href = `./device-warn.html?${queryString}`;
});

const homeimage = document.querySelector(".image-item");
homeimage.addEventListener("click", () => {
	window.location.href = "./index.html";
});

function getCurveData() {
	const fetchPromise = fetch(
	  "./data/device-curve.json",
	);
	
	fetchPromise
	  .then((response) => {
	    if (!response.ok) {
	      throw new Error(`error occur when get http request ：${response.status}`);
	    }
	    return response.json();
	  })
	  .then((json) => {
			showCurve(json);
	  })
	  //.catch((error) => {
	  //  console.error(`can not get data lists：${error}`);
	  //});

  //window.setTimeout(()=>{getDeviceData();}, 5000);
}

getCurveData();

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector("#main-curve"));

function showCurve(devdata) {
	// 指定图表的配置项和数据
	var option = {
	  title: {
	    text: `${decodeURI(urlParams["name"])}实时曲线`
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
