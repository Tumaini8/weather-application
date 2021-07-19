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
  showForecast(response.data.coord);
}

function showForecast(coordinates) {
  let apiKey = "12467fda41908ef87e1dd41e5c89d6d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}

function formatDay(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-temp");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div>
              ${formatDay(forecastDay.dt)}
              <div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png "
                 
                />
              </div>
              <div>
                <span class="max-temp">${Math.round(
                  forecastDay.temp.max
                )}°C</span>
                  <span class="min-temp">${Math.round(
                    forecastDay.temp.min
                  )}°C</span>
              </div>
            </div>
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
