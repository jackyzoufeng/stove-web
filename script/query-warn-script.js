const dataspans = document.querySelectorAll(".menu-item");
dataspans[0].addEventListener("click", () => {
	window.location.href = `./query-warn.html`;
});

const homeimage = document.querySelector(".image-item");
homeimage.addEventListener("click", () => {
	window.location.href = "./index.html";
});

if (localStorage.getItem("query-warn")) {
	var json = JSON.parse(localStorage.getItem("query-warn"));
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
	const th3 = document.createElement("th");
	th3.textContent = "内容";
	htr.appendChild(th3);
	thead.appendChild(htr);
	maintable.appendChild(thead);
	
	const tbody = document.createElement("tbody");
	const length = json.warnlist.length;
	for (var i = 0; i < length; i++) {
		const btr = document.createElement("tr");
		const td1 = document.createElement("td");
		td1.textContent = `${i+1}`;
		btr.appendChild(td1);
		const td2 = document.createElement("td");
		td2.textContent = json.warnlist[i].time;
		btr.appendChild(td2);
		const td3 = document.createElement("td");
		td3.textContent = json.warnlist[i].name;
		btr.appendChild(td3);
		tbody.appendChild(btr);
	}
	maintable.appendChild(tbody);
}