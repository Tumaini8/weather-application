function search(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let searchEngine = document.querySelector("#search-engine");
  let submitElement = document.querySelector("#input-search");
  let searchElement = "searchEngine.value";
  h1.innerHTML = `${searchEngine.value}`;
  let city = `${searchEngine.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let apiKey = "12467fda41908ef87e1dd41e5c89d6d2";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;

  let currentDate = document.querySelector("#current-day");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  let weatherElement = document.querySelector("#description");
  weatherElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  let humidValue = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidValue}%`;

  let windElement = document.querySelector("#wind");
  let speed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${speed}KM/hr`;

  let tempElement = document.querySelector("#temperature");
  let currentTemperature = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${currentTemperature}`;

  let weatherIcon = document.querySelector("#icon");

  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
