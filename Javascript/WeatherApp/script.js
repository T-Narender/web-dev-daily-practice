const weatherConfig = window.WEATHER_APP_CONFIG || {};
const API_KEY = weatherConfig.WEATHER_API_KEY;
const BASE_URL = weatherConfig.BASE_URL;

if (!API_KEY || !BASE_URL) {
  throw new Error("Missing weather configuration. Serve the app through server.js so it can read .env.");
}

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorEl = document.getElementById("error")
  const loaderEl = document.getElementById("loader")
  const card = document.getElementById("weatherCard")

  // reset UI
  errorEl.textContent = ""
  card.style.display = "none"

  if (!city) {
    errorEl.textContent = "Please enter a city name."
    return
  }

  loaderEl.style.display = "block" //here block is used to show the loader because by default it is set to none in css so when we set it to block it will be visible on the screen

  try {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("City not found")
    }
    const data = await response.json();

    loaderEl.style.display = "none";

    displayWeather(data);

  }
  catch (err) {
    errorEl.textContent = err.message
    loaderEl.style.display = "none"
  }

}
function displayWeather(data) {

  document.getElementById("cityName").textContent =
    `${data.name}, ${data.sys.country}`

  document.getElementById("temperature").textContent =
    `Temp: ${data.main.temp}°C`

  document.getElementById("description").textContent =
    data.weather[0].description

  document.getElementById("humidity").textContent =
    `Humidity: ${data.main.humidity}%`

  document.getElementById("wind").textContent =
    `Wind: ${data.wind.speed} m/s`

  document.getElementById("weatherCard").style.display = "block"
}

// Bonus: trigger search on Enter key
document.getElementById("cityInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather()
})