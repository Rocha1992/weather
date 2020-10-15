let currentTime = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formDate(currentTime);

function formDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[date.getMonth()];

  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getMilliseconds();

  return `${day}, ${month} ${date}, ${year}. ${hours}:${minutes}:${seconds}`;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

function searchCity(city) {
  let key = `0c9d950699fec8362223f7a0e10d4ecd`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 18;
}

function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 64;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  let description = document.querySelector("#temperature-description");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${response.data.name},`;
  tempElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = `0c9d950699fec8362223f7a0e10d4ecd`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentLocation(searchPosition);
}

let button = document.querySelector("button");
button.addEventListener("submit", getCurrentLocation);

searchCity("Vancouver");
