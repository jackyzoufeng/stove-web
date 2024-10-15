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

if (localStorage.getItem("query-data")) {
	var json = JSON.parse(localStorage.getItem("query-data"));
	var devname = localStorage.getItem("devname");
	console.log(json);
	console.log(devname);
}