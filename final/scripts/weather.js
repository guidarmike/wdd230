const currentTemp = document.querySelector('#current-temp');
const currentHumidity = document.querySelector('#current-humidity');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#figcaption');
const forecastContainer = document.querySelector('#forecast-container');
const banner = document.querySelector('#banner');
const closeButton = document.querySelector('#close-button'); 

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

const latitude = '20.46';
const longitude = '-86.91';

const apiKey = 'da779bd1d605128ae756b58e0713e368';

const weatherQueryString = `?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
const forecastQueryString = `?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

const weatherFullUrl = weatherUrl + weatherQueryString;
const forecastFullUrl = forecastUrl + forecastQueryString;

async function apiFetch(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

async function displayWeather() {
  try {
    const [weatherData, forecastData] = await Promise.all([apiFetch(weatherFullUrl), apiFetch(forecastFullUrl)]);
    displayCurrentWeather(weatherData);
    displayForecast(forecastData);
    displayHighTemperatureMessage(weatherData);
  } catch (error) {
    console.log(error);
  }
}

function displayCurrentWeather(data) {
  const temperature = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const capitalizeDescription = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

  currentTemp.textContent = `Current Temperature: ${temperature}°C`;
  currentHumidity.textContent = `Current Humidity: ${humidity}%`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', capitalizeDescription);
  captionDesc.textContent = `${capitalizeDescription}`;
}

async function displayForecast(data) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(15, 0, 0, 0);

  const forecastTemperature = data.list.find(forecast => {
    const forecastDate = new Date(forecast.dt * 1000);
    return forecastDate >= tomorrow;
  });

  if (forecastTemperature) {
    const temperatureAt15PM = Math.round(forecastTemperature.main.temp);
    forecastContainer.textContent = `Tomorrow's Forecasted Temperature at 3:00 PM: ${temperatureAt15PM}°C`;
  } else {
    forecastContainer.textContent = 'Forecast data not available.';
  }
}

async function displayHighTemperatureMessage(data) {
    const maxTemperatureToday = Math.round(data.main.temp_max);
    banner.innerHTML = `Today's Maximum Temperature: ${maxTemperatureToday}°C <button id="close-button">Close</button>`;
    
    const closeButton = document.querySelector('#close-button');
    closeButton.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}

displayWeather();