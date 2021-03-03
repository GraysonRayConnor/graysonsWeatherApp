const api = {
	key: "ce306793ccf6f758211d4b3bdb7f4212",
	base: "https://api.openweathermap.org/data/2.5/"
	}



const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(event){
	if(event.keyCode == 13){
		getResults(searchbox.value);
	}
}

let lat;
let long;

window.addEventListener("load", () => {
	getUsersPos();
});


function getUsersPos(weather){
if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(position => {
	 lat = position.coords.latitude;
	 long = position.coords.longitude;
	 fetch(`${api.base}weather?lat=${lat}&lon=${long}&units=imperial&appid=${api.key}`)
	 .then(response => response.json())
	 .then(data => {
		 displayResults(data)
		});
	})
}else{
	alert("Enable location services to use app...");
}
};




function getResults(query){
	fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
	.then(weather => {
		return weather.json();
	}).then(displayResults);
}

function displayResults(weather){
	console.log(weather);
	let city = document.querySelector(".location .city");
	city.innerText = `${weather.name}, ${weather.sys.country}`;

	let now = new Date();
	let date = document.querySelector(".location .date");
	date.innerText = dateBuilder(now);

	let temp = document.querySelector(".current .temp");
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

	let weather_el = document.querySelector(".current .weather");
	weather_el.innerText = weather.weather[0].main;

	let hilow = document.querySelector(".hi-low");
	hilow.innerText = `${Math.round(weather.main.temp_min)}°f / ${Math.round(weather.main.temp_max)}°f`;
}

function dateBuilder(d){
	let months = ["JANUARY", "FEBUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
	let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}