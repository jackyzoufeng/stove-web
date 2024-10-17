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

function buildTable(devname, json) {
	const maintable = document.querySelector("#main-table");
	while (maintable.firstChild) {
	  maintable.removeChild(maintable.firstChild);
	}
	
	const caption = document.createElement("caption");
	caption.textContent = devname;
	maintable.appendChild(caption);
	
	const thead = document.createElement("thead");
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
	maintable.appendChild(thead);
	
	const tbody = document.createElement("tbody");
	const length = json.xaxis.length;
	for (var i = 0; i < length; i++) {
		const btr = document.createElement("tr");
		const td1 = document.createElement("td");
		td1.textContent = `${i+1}`;
		btr.appendChild(td1);
		const td2 = document.createElement("td");
		td2.textContent = json.xaxis[i];
		btr.appendChild(td2);
		var seriescount = json.series.count;
		for (var j = 0; j < seriescount; j++) {
			const td = document.createElement("td");
			td.textContent = Number.parseFloat(json.series.datalist[j].data[i]).toFixed(2);
			btr.appendChild(td);
		}
		tbody.appendChild(btr);
	}
	maintable.appendChild(tbody);
}