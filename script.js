const API_KEY = "33ea3003fa7a293689a1c782549141d0"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

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