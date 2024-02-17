const temperature = parseFloat(document.getElementById('currentTemperature').textContent);
const windSpeed = parseFloat(document.getElementById('currentWindSpeed').textContent);

if (temperature <= 50 && windSpeed > 3.0) {
    const windChill = 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));

    document.getElementById('windChill').textContent = Math.round(windChill) + "°F";
} else {
    document.getElementById('windChill').textContent = "N/A";
}
