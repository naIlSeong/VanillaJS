const LOCATION = "location";
const API_KEY = "4e78c6a084096e8f3403ceb7365b75d6";

const WEATHER = document.querySelector(".js-weather");

function askLocation() {
  navigator.geolocation.getCurrentPosition(handleLocation, handleError);
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const cityName = json.name;

      const statusIcon = json.weather[0].icon;
      const top = document.createElement("div");
      const bottom = document.createElement("div");
      const icon = document.createElement("img");

      top.innerText = `${temperature}℃`;
      bottom.innerText = `${cityName}`;
      icon.src = `http://openweathermap.org/img/wn/${statusIcon}@2x.png`;

      WEATHER.appendChild(top);
      WEATHER.appendChild(bottom);
      WEATHER.appendChild(icon);
    });
}

// Success Callback Function
function handleLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveLocation(coordsObj);
  getWeather(latitude, longitude);
}

// Error Callback Function
function handleError() {
  console.log("Can't get your location info.");
}

function saveLocation(coordsObj) {
  localStorage.setItem(LOCATION, JSON.stringify(coordsObj));
}

function loadLocation() {
  const loadedLocation = localStorage.getItem(LOCATION);
  if (loadedLocation === null) {
    askLocation();
  } else {
    const parsedLocation = JSON.parse(loadedLocation);
    getWeather(parsedLocation.latitude, parsedLocation.longitude);
  }
}

function init() {
  loadLocation();
}

init();
