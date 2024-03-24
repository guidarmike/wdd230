// const temperature = parseFloat(document.getElementById('currentTemperature').textContent);
// const windSpeed = parseFloat(document.getElementById('currentWindSpeed').textContent);

// if (temperature <= 50 && windSpeed > 3.0) {
//     const windChill = 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));

//     document.getElementById('windChill').textContent = Math.round(windChill) + "°F";
// } else {
//     document.getElementById('windChill').textContent = "N/A";
// }

const currentTempElement = document.getElementById('current-temp');
const currentWindSpeedElement = document.getElementById('current-windspeed');
const windChillElement = document.getElementById('windChill');

async function fetchCurrentWeather() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=42.21&lon=12.73&units=imperial&appid=da779bd1d605128ae756b58e0713e368');
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function displayCurrentWeather() {
    const data = await fetchCurrentWeather();
    if (data) {
        const temperature = Math.round(data.main.temp);
        const windSpeed = Math.round(data.wind.speed);

        currentTempElement.textContent = `${temperature}°F`;
        currentWindSpeedElement.textContent = `${windSpeed} mph`;

        if (!isNaN(temperature) && !isNaN(windSpeed)) {
            const windChill = calculateWindChill(temperature, windSpeed);
            windChillElement.textContent = Math.round(windChill) + "°F";
        } else {
            windChillElement.textContent = "N/A";
        }
    }
}

function calculateWindChill(temperature, windSpeed) {
    const windChill = 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
    return windChill;
}

displayCurrentWeather();