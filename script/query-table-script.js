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

document.addEventListener('DOMContentLoaded', function() {
  var table = document.querySelector("#main-table");

  //todo:this event can not be deployed, why?
	table.addEventListener('scroll', function() {
		console.log(table.scrollTop);
    if(table.scrollTop > 0) { // 根据需要设置滚动的阈值
      table.classList.add('scrolling');
    } else {
      table.classList.remove('scrolling');
    }
  });
});

if (localStorage.getItem("query-data")) {
	var json = JSON.parse(localStorage.getItem("query-data"));
	var devname = localStorage.getItem("devname");
	buildTable(devname, json);
}

var currentpage;
var totalpage;
var rowcountperpage;
var totalcount;

function buildTable(devname, json) {
	rowcountperpage = 26;
	totalcount = json.xaxis.length;
	totalpage = Math.ceil(totalcount/rowcountperpage);
	currentpage = 0;
	
	const caption = document.querySelector("#main-table>caption");
	caption.textContent = devname;
	
	const thead = document.querySelector("#main-table>thead");
	while (thead.firstChild) {
	  thead.removeChild(thead.firstChild);
	}
	const htr = document.createElement("tr");
	const th1 = document.createElement("th");
	th1.textContent = "序号";
	htr.appendChild(th1);
	const th2 = document.createElement("th");
	th2.textContent = "时间";
	htr.appendChild(th2);
	var seriescount = json.series.count;
	for (var i = 0; i < seriescount; i++) {
		const th2 = document.createElement("th");
		th2.textContent = json.series.datalist[i].name;
		htr.appendChild(th2);
	}
	thead.appendChild(htr);
	
	const exportxlsx = document.querySelector("#export-to-excel");
	exportxlsx.addEventListener("click", () => {
		exporttoexcel(devname, json);
	});
	const prevbtn = document.querySelector("#prev-page");
	prevbtn.disabled = true;
	const nextbtn = document.querySelector("#next-page");
	prevbtn.addEventListener("click", () => {
		if (currentpage === 0) {
			return;
		}
		currentpage--;
		buildTableBody();
		if (currentpage === 0) {
			prevbtn.disabled = true;
		}
		nextbtn.disabled = false;
	});
	nextbtn.addEventListener("click", () => {
		if (currentpage === totalpage-1) {
			return;
		}
		currentpage++;
		buildTableBody();
		if (currentpage === totalpage-1) {
			nextbtn.disabled = true;
		}
		prevbtn.disabled = false;
	});
	const totalspan = document.querySelector("#total-page");
	totalspan.textContent = `共${totalpage}页`;
	buildTableBody();
	
	const tfoottr = document.querySelector("#main-table>tfoot td");
	tfoottr.setAttribute("colspan", `${seriescount+2}`)
}

function buildTableBody() {
	const currentspan = document.querySelector("#current-page");
	currentspan.textContent = `第${currentpage+1}页`;
	const tbody = document.querySelector("#main-table>tbody");
	while (tbody.firstChild) {
	  tbody.removeChild(tbody.firstChild);
	}
	const length = (currentpage<totalpage-1)?rowcountperpage:(totalcount%rowcountperpage);
	for (var i = 0; i < length; i++) {
		const btr = document.createElement("tr");
		const td1 = document.createElement("td");
		td1.textContent = `${i+1}`;
		btr.appendChild(td1);
		const td2 = document.createElement("td");
		td2.textContent = json.xaxis[currentpage*rowcountperpage+i];
		btr.appendChild(td2);
		var seriescount = json.series.count;
		for (var j = 0; j < seriescount; j++) {
			const td = document.createElement("td");
			td.textContent = Number.parseFloat(json.series.datalist[j].data[currentpage*rowcountperpage+i]).toFixed(2);
			btr.appendChild(td);
		}
		tbody.appendChild(btr);
	}
}

function exporttoexcel(devname, json) {
	var datalist = [];
	var length = json.xaxis.length;
	for (var i = 0; i < length; i++) {
		var data = {};
		data["time"] = json.xaxis[i];
		var col = json.series.count;
		for (var j = 0; j < col; j++) {
			data[`${json.series.datalist[j].name}`] = json.series.datalist[j].data[i];
		}
		datalist.push(data);
	}
	const new_sheet = XLSX.utils.json_to_sheet(datalist);
	const new_book = XLSX.utils.book_new()
	// 将 sheet 添加到 book 中
	XLSX.utils.book_append_sheet(new_book, new_sheet, devname);
	// 导出excel文件
	XLSX.writeFile(new_book, '报表数据.xlsx')
}