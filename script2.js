const api = {
    key: "0bba8829ccd1b378418ce9bd98cd0de6",
    base: "https://api.openweathermap.org/data/2.5/"
}


const searchbox = document.querySelector(".search-box");

searchbox.addEventListener("keypress", setQuery);

function setQuery(event){
    if(event.keyCode == 13) {
        getResults(searchbox.value);
    }
}

const successCb = (position) => {
    console.log(position);
}

const errorCb = (error) => {
    console.log(error);
}

window.addEventListener("load", ()=>{
    navigator.geolocation.getCurrentPosition(successCb, errorCb);
});


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