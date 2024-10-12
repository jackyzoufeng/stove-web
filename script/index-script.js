const devidPrefix = "dev";
const devnameSuffix = "name";
const devdataPrefix = "data";

async function initDevice() {
  const requestURL = "./data/devices.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const devices = await response.json();

  addDevice(devices);
}

function addDevice(objs) {
  const container = document.querySelector(".container");
	while (container.firstChild) {
	  container.removeChild(container.firstChild);
	}
  const devices = objs.devices;

  for (const device of devices) {
    const divStove = document.createElement("div");
    divStove.setAttribute("class", "stove");
		divStove.setAttribute("id", `${devidPrefix}${device.dev_id}`);
		divStove.addEventListener("click", ()=>{
			window.location.href=`./device-info.html?dev_id=${device.dev_id}&name=${encodeURI(device.name)}`;
		});
    
    const divImg = document.createElement("div");
    divImg.setAttribute("class", "devinfo devimginfo");
    const devImg = document.createElement("img");
		if (device.type === 1) {
			devImg.setAttribute("src", "img/hhl.png");
		} else if (device.type === 2) {
			devImg.setAttribute("src", "img/stl.png");
		} else if (device.type === 3) {
			devImg.setAttribute("src", "img/hll.png");
		} else if (device.type === 4) {
			devImg.setAttribute("src", "img/zhc.png");
		} else if (device.type === 5) {
			devImg.setAttribute("src", "img/qxj.png");
		}
    divImg.appendChild(devImg);
    
    const divName = document.createElement("div");
    divName.setAttribute("class", "devinfo devtxtinfo");
    const spanName = document.createElement("span");
    spanName.textContent = device.name;
		divName.appendChild(spanName);
		const spanNameStatus = document.createElement("span");
		spanNameStatus.setAttribute("id", `${devnameSuffix}${device.dev_id}`);
		spanNameStatus.textContent = "";
		divName.appendChild(spanNameStatus);
    
    const divInfo = document.createElement("div");
    divInfo.setAttribute("class", "devinfo devtxtinfo");
		const spanTemp = document.createElement("span");
		spanTemp.setAttribute("id", `${devdataPrefix}${device.dev_id}`);
		if (device.type === 2) {
			spanTemp.textContent = "温度:--℃ 碳势:--%Cp";
		} else {
			spanTemp.textContent = "温度:--℃";
		}
		divInfo.appendChild(spanTemp);
    
    divStove.appendChild(divImg);
    divStove.appendChild(divName);
    divStove.appendChild(divInfo);
    container.appendChild(divStove);
  }
	getDeviceInfo();
}

function getDeviceInfo() {
	const fetchPromise = fetch(
	  "./data/device-data.json",
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

  window.setTimeout(()=>{getDeviceInfo();}, 5000);
}

function updateInfo(objs) {
  const devices = objs.devices;
  for (const device of devices) {
		const namespan = document.querySelector(`#${devnameSuffix}${device.dev_id}`);
		if (!device.online) {
			namespan.textContent = "(断线)";
			namespan.setAttribute("class", "devoffline");
		} else {
			namespan.textContent = "";
			namespan.removeAttribute("class");
		}
		const dataspan = document.querySelector(`#${devdataPrefix}${device.dev_id}`);
		if (device.type === 2) {
			dataspan.textContent = `温度:${device.temp}℃ 碳势:${device.cvalue}%Cp`;
		} else {
			dataspan.textContent = `温度:${device.temp}℃`;
		}
  }
}

initDevice();

const dataspans = document.querySelectorAll(".menu-item");
dataspans[0].addEventListener("click", () => {
	
});
dataspans[1].addEventListener("click", () => {
	window.location.href = "./query.html";
});