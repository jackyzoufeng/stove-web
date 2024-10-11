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

const homeimage = document.querySelector(".image-item");
homeimage.addEventListener("click", () => {
	window.location.href = "./index.html";
});

function getDeviceData() {
	const fetchPromise = fetch(
	  "./data/device-info.json",
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

  window.setTimeout(()=>{getDeviceData();}, 5000);
}

function updateInfo(objs) {
	const infoTable = document.querySelector(".info-table");
	while (infoTable.firstChild) {
	  infoTable.removeChild(infoTable.firstChild);
	}
	
	const switchTable = document.querySelector(".switch-table");
	while (switchTable.firstChild) {
	  switchTable.removeChild(switchTable.firstChild);
	}
	
  const datalist = objs.datalist;
  for (const data of datalist) {
		const tr = document.createElement("tr");
		const tdn = document.createElement("td");
		tdn.textContent = data.name;
		tr.appendChild(tdn);
		
		if (typeof(data.value) === "boolean") {
			const tdv = document.createElement("td");
			if (data.value) {
				tdv.innerHTML = `<span class="status-on"></span>`;
			} else {
				tdv.innerHTML = `<span class="status-off"></span>`;
			}
			tr.appendChild(tdv);
			switchTable.appendChild(tr);
		} else {
			const tdv = document.createElement("td");
			tdv.innerHTML = `${data.value} <span class="unit-color">${data.unit}</span>`;
			tr.appendChild(tdv);
			infoTable.appendChild(tr);
		}
  }
}

getDeviceData();