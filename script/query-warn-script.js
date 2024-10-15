const dataspans = document.querySelectorAll(".menu-item");
dataspans[0].addEventListener("click", () => {
	window.location.href = `./query-warn.html`;
});

const homeimage = document.querySelector(".image-item");
homeimage.addEventListener("click", () => {
	window.location.href = "./index.html";
});