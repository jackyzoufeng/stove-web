let urlParams;

function getUrlParams() {
	const queryString = document.URL.split('?')[1];
	if (!queryString) {
		return {};
	}
	const queryParam = {};
	queryString.split('?').forEach(param => {
		const[key, value] = param.split('=');
		queryParam[key] = value;
	});
	return queryParam;
}

urlParams = getUrlParams();

const dataspans = document.querySelectorAll(".menu-item");
dataspans[0].addEventListener("click", () => {
	window.location.href = `./device-info.html?dev_id=${urlParams['dev_id']}`;
});
dataspans[1].addEventListener("click", () => {
	window.location.href = `./device-curve.html?dev_id=${urlParams['dev_id']}`;
});
dataspans[2].addEventListener("click", () => {
	window.location.href = `./device-warn.html?dev_id=${urlParams['dev_id']}`;
});
dataspans[3].addEventListener("click", () => {
	window.location.href = "./index.html";
});

function getDeviceData() {
	const fetchPromise = fetch(
	  "./data/device-warn.json",
	);
	
	fetchPromise
	  .then((response) => {
	    if (!response.ok) {
	      throw new Error(`error occur when get http request ：${response.status}`);
	    }
	    return response.json();
	  })
	  .then((json) => {
	    updateInfo(json);
	  })
	  //.catch((error) => {
	  //  console.error(`can not get data lists：${error}`);
	  //});

  //window.setTimeout(()=>{getDeviceData();}, 5000);
}

function updateInfo(objs) {
	const warnTable = document.querySelector(".warn-table");
	while (warnTable.firstChild) {
	  warnTable.removeChild(warnTable.firstChild);
	}
	
	const warnlist = objs.warnlist;
	for (const warn of warnlist) {
		const tr = document.createElement("tr");
		const tdn = document.createElement("td");
		tdn.textContent = warn.name;
		tr.appendChild(tdn);
		
		const tdv = document.createElement("td");
		const spanv = document.createElement("span");
		spanv.setAttribute("class", "status-on");
		tdv.appendChild(spanv);
		tr.appendChild(tdv);
		
		const tdc = document.createElement("td");
		const btnc = document.createElement("button");
		btnc.textContent = "关闭";
		btnc.setAttribute("class", "warn-item");
		btnc.addEventListener("click", () => {
			spanv.setAttribute("class", "status-off");
		});
		const btnd = document.createElement("button");
		btnd.textContent = "删除";
		btnd.setAttribute("class", "warn-item");
		btnd.addEventListener("click", () => {
			warnTable.removeChild(tr);
		});
		tdc.appendChild(btnc);
		tdc.appendChild(btnd);
		tr.appendChild(tdc);
		
		warnTable.appendChild(tr);
	}
}

getDeviceData();