let caroussel = new Carousel("carousel");

let canvas = new Canvas;

let form = new Form;

let map = new Map;
//affiche les infos du formulaire
if (localStorage.getItem('name') !== null) {
	document.getElementById('name').value = localStorage.getItem('name');	
}
if (localStorage.getItem('first_name') !== null) {
	document.getElementById('first-name').value = localStorage.getItem('first_name');
}

if (sessionStorage.getItem('text_station') !== null) {
	document.getElementById('sign-infos').innerHTML = sessionStorage.getItem('text_station');
}