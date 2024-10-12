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
