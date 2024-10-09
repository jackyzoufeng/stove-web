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
