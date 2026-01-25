// place.js — Abuja, Nigeria (metric units)

// -------------------------------
// Static demo values (adjustable)
// -------------------------------
const temperatureC = 30; // °C (typical warm day in Abuja)
const windSpeedKmh = 10; // km/h (light breeze)

// -------------------------------------------------------------
// Wind chill (Environment Canada, metric)
// Valid when temperature <= 10 °C and wind speed > 4.8 km/h
// -------------------------------------------------------------
const calculateWindChill = (t, v) =>
  13.12 +
  0.6215 * t -
  11.37 * Math.pow(v, 0.16) +
  0.3965 * t * Math.pow(v, 0.16);

const isWindChillApplicable = (t, v) => t <= 10 && v > 4.8;

// -------------------
// Footer date handler
// -------------------
function initFooterDates() {
  const yearEl = document.getElementById("year");
  const modEl = document.getElementById("lastModified");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (modEl) {
    // document.lastModified is a user-agent string; try to localize
    const parsed = new Date(document.lastModified);
    modEl.textContent = isNaN(parsed)
      ? document.lastModified
      : parsed.toLocaleString();
  }
}

// --------------------
// Weather UI rendering
// --------------------
function initWeather() {
  const tempEl = document.getElementById("temp");
  const windEl = document.getElementById("wind");
  const wcEl = document.getElementById("windchill");

  if (tempEl) tempEl.textContent = temperatureC.toString();
  if (windEl) windEl.textContent = windSpeedKmh.toString();

  if (wcEl) {
    if (isWindChillApplicable(temperatureC, windSpeedKmh)) {
      const wc = calculateWindChill(temperatureC, windSpeedKmh);
      wcEl.textContent = `${wc.toFixed(1)} °C`;
      wcEl.setAttribute(
        "aria-label",
        `Wind chill ${wc.toFixed(1)} degrees Celsius`,
      );
    } else {
      wcEl.textContent = "N/A";
      wcEl.setAttribute("aria-label", "Wind chill not applicable");
    }
  }
}

// -------------------------------------
// Initialize (script loaded with defer)
// -------------------------------------
initFooterDates();
initWeather();
