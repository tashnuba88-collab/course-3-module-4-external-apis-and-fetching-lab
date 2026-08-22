// index.js
const weatherApi = "https://api.weather.gov/alerts/active";

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const display = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

async function fetchWeatherAlerts(state) {
  try {
    const response = await fetch(`${weatherApi}?area=${state}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    displayAlerts(data);
  } catch (error) {
    console.log("Error fetching alerts:", error);
    showError(error.message);
  }
}

function displayAlerts(data) {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
  const count = data.features.length;
  const headlines = data.features
    .map((feature) => feature.properties.headline)
    .join(". ");
  display.textContent = `${data.title}: ${count}. ${headlines}`;
}

function showError(message) {
  display.textContent = "";
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

button.addEventListener("click", () => {
  const state = input.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
  input.value = "";
});
