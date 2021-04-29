const api = {
    key: "0bba8829ccd1b378418ce9bd98cd0de6",
    base: "https://api.openweathermap.org/data/2.5/"
}

const btn = document.querySelector("button");

let holder;

const successCb = (position) => {
	console.log(position);
}

const errorCb = (error) => {
    console.log(error);
}

btn.addEventListener("click", ()=>{
  navigator.geolocation.getCurrentPosition(successCb);
});
