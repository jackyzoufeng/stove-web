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

var currentpage;
var totalpage;
var rowcountperpage;
var totalcount;

function buildTable(devname, json) {
	rowcountperpage = 26;
	totalcount = json.warnlist.length;
	totalpage = Math.ceil(totalcount/rowcountperpage);
	currentpage = 0;
	
	const caption = document.querySelector("#main-table>caption");
	caption.textContent = devname;
	
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
		td2.textContent = json.warnlist[currentpage*rowcountperpage+i].time;
		btr.appendChild(td2);
		const td3 = document.createElement("td");
		td3.textContent = json.warnlist[currentpage*rowcountperpage+i].name;
		btr.appendChild(td3);
		tbody.appendChild(btr);
	}
}

function exporttoexcel(devname, json) {
	const new_sheet = XLSX.utils.json_to_sheet(json.warnlist);
	const new_book = XLSX.utils.book_new()
	// 将 sheet 添加到 book 中
	XLSX.utils.book_append_sheet(new_book, new_sheet, devname);
	// 导出excel文件
	XLSX.writeFile(new_book, '报警数据.xlsx')
}