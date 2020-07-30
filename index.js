//date and time
function formatDate(now) {
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = weekDay[now.getDay()];
  let date = now.getDate();
  let month = monthName[now.getMonth()];
  let year = now.getFullYear();
  let hours = now.getHours() % 12 || 12;
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;
}
let now = new Date();
let timeStamp = document.querySelector("#date-slot");
timeStamp.innerHTML = formatDate(now);

//Search the city

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = `${city.value}`;
  getCityWeather(city.value);
}
let resultCity = document.querySelector("#city-search-form");
resultCity.addEventListener("submit", searchCity);

function getCityWeather(city) {
  let apiKey = `56d8f4bda7bcbae201a9840821d6e647`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getLocationWeather);
}

//get the weather by lat/long
function getLocationWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let feels = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let location = response.data.name;
  let town = document.querySelector("#current-city");
  let description = document.querySelector("#break-down");
  let temp = document.querySelector("#temperature");
  town.innerHTML = `${location}`;
  temp.innerHTML = `${temperature}`;
  description.innerHTML = ` It feels like ${feels}° with a relative humidity of ${humidity}%`;
}

function searchLocation(position) {
  let apiKey = `cc6d8e11abe1ba92a21e5d0fa54e759e`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getLocationWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let myCityButton = document.querySelector("#city-button");
myCityButton.addEventListener("click", getCurrentLocation);

let city = document.querySelector("#search-text-input");
let cityValue = `${city.value}`;
