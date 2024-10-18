function formatDate(date) {
  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }
 
  var year = date.getFullYear();
  var month = padZero(date.getMonth() + 1); // 月份是从0开始的
  var day = padZero(date.getDate());
 
  return year + '-' + month + '-' + day;
}

function formatTime(date) {
  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }
 
  var hours = padZero(date.getHours());
  var minutes = padZero(date.getMinutes());
 
  return hours + ':' + minutes;
}

function initDevice() {
	const fetchPromise = fetch(
	  "./data/devices.json",
	);
	
	fetchPromise
	  .then((response) => {
	    if (!response.ok) {
	      throw new Error(`error occur when get http request ：${response.status}`);
	    }
	    return response.json();
	  })
	  .then((json) => {
	    updateform(json);
	  })
	  //.catch((error) => {
	  //  console.error(`can not get data lists：${error}`);
	  //});
}

function updateform(objs) {
	const devcontainer = document.querySelector(".dev-container");
	while (devcontainer.firstChild) {
	  devcontainer.removeChild(devcontainer.firstChild);
	}
  const devices = objs.devices;
	var index = 1;
	for (const device of devices) {
		const li = document.createElement("li");
		
		const input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("id", `stove_dev_${index}`);
		input.setAttribute("name", `selected_dev`);
		input.setAttribute("value", `${device.dev_id}`);
		input.setAttribute("devname", `${device.name}`);
		if (index === 1) {
			input.setAttribute("checked", true);
		}
		li.appendChild(input);
		
		const lable = document.createElement("label");
		lable.setAttribute("for", `stove_dev_${index}`);
		lable.textContent = device.name;
		li.appendChild(lable);
		
		devcontainer.appendChild(li);
		index++;
	}
	
	updateDateAndType();
}

function updateDateAndType() {
	var datetime = new Date();
	const begindate = document.querySelector("#begin_date_1");
	const begintime = document.querySelector("#begin_time_1");
	const enddate = document.querySelector("#end_date_1");
	const endtime = document.querySelector("#end_time_1");
	enddate.value = formatDate(datetime);
	endtime.value = formatTime(datetime);
	var datetimebegin = new Date(datetime - 30*24*60*60*1000);
	begindate.value = formatDate(datetimebegin);
	begintime.value = formatTime(datetimebegin);
	
	var form = document.querySelector("form");
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		getCurveData(getCheckedRadioInput("selected_dev"), getCheckedRadioInputDevName(), getCheckedRadioInput("selected_type"), begindate.value, begintime.value, enddate.value, endtime.value);
	});
}

function getCheckedRadioInput(radioname) {
	const radiogroup = document.querySelectorAll(`input[name=${radioname}]`);
	for (var i = 0; i < radiogroup.length; i++) {
		if (radiogroup[i].checked) {
			return radiogroup[i].value;
		}
	}
}

function getCheckedRadioInputDevName() {
	const radiogroup = document.querySelectorAll(`input[name=selected_dev]`);
	for (var i = 0; i < radiogroup.length; i++) {
		if (radiogroup[i].checked) {
			return radiogroup[i].getAttribute("devname");
		}
	}
}

function isEmptyString(value) {
	if ((typeof(value) === "undefined")||(value === null)||(value.length === 0)) {
		return true;
	}
	return false;
}

function getCurveData(dev, devname, type, begindate, begintime, enddate, endtime) {
	console.log(dev);
	console.log(devname);
	console.log(type);
	console.log(begindate);
	console.log(begintime);
	console.log(enddate);
	console.log(endtime);
	
	if (isEmptyString(begindate)||isEmptyString(begintime)||isEmptyString(enddate)||isEmptyString(endtime)) {
		window.alert("未选择时间");
		return;
	}
	const begindatetime = new Date(`${begindate}T${begintime}`);
	const enddatetime = new Date(`${enddate}T${endtime}`);
	
	if (begindatetime >= enddatetime) {
		window.alert("开始时间要小于结束时间");
		return;
	}
	
	if (type === "report_data") {
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
				localStorage.setItem("devname", devname);
				localStorage.setItem("query-data", JSON.stringify(json));
				window.location.href = `./query-table.html`;
		  })
		  //.catch((error) => {
		  //  console.error(`can not get data lists：${error}`);
		  //});
	} else if (type === "warn_data") {
		const fetchPromise = fetch(
		  "./data/device-warn-list.json",
		);
		
		fetchPromise
		  .then((response) => {
		    if (!response.ok) {
		      throw new Error(`error occur when get http request ：${response.status}`);
		    }
		    return response.json();
		  })
		  .then((json) => {
				localStorage.setItem("devname", devname);
				localStorage.setItem("query-warn", JSON.stringify(json));
				window.location.href = `./query-warn.html`;
		  })
		  //.catch((error) => {
		  //  console.error(`can not get data lists：${error}`);
		  //});
	}
}

initDevice();

const dataspans = document.querySelectorAll(".menu-item");
dataspans[0].addEventListener("click", () => {
	window.location.href = "./index.html";
});
dataspans[1].addEventListener("click", () => {
	
});