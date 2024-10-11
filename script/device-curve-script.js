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

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector("#main-curve"));
// 指定图表的配置项和数据
var option = {
  title: {
    text: `${urlParams["name"]}实时曲线`
  },
  tooltip: {},
  legend: {
  },
  xAxis: {
    data: [6,7,8,9,10,11]
  },
  yAxis: {
		type: 'value',
		name: '销量(件)',
		alignTicks: true,
		axisLabel: {
		  formatter: '{value}'
		}
	},
  series: [
    {
      name: '销量',
      type: 'line',
      data: [5, 20, 100, 10, 10, 20],
			colorBy: 'data'
    }
  ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);