function formatDateTime(date) {
  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }
 
  var year = date.getFullYear();
  var month = padZero(date.getMonth() + 1); // 月份是从0开始的
  var day = padZero(date.getDate());
  var hours = padZero(date.getHours());
  var minutes = padZero(date.getMinutes());
 
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
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
	const enddate = document.querySelector("#end_date_1");
	enddate.value = formatDateTime(datetime);
	var datetimebegin = new Date(datetime - 30*24*60*60*1000);
	begindate.value = formatDateTime(datetimebegin);
	
	var form = document.querySelector("form");
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		console.log(getCheckedRadioInput("selected_dev"));
		console.log(getCheckedRadioInput("selected_type"));
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

initDevice();

const dataspans = document.querySelectorAll(".menu-item");
dataspans[0].addEventListener("click", () => {
	window.location.href = "./index.html";
});
dataspans[1].addEventListener("click", () => {
	
});