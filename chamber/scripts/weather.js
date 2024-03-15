const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastContainer = document.querySelector('#forecast-container');
const banner = document.querySelector('#banner');
const closeButton = document.querySelector('#close-button');

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

const latitude = '42.21';
const longitude = '12.73';

const apiKey = 'da779bd1d605128ae756b58e0713e368';

const weatherQueryString = `?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
const forecastQueryString = `?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

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
  const weatherData = await apiFetch(weatherFullUrl);
  const forecastData = await apiFetch(forecastFullUrl);

  displayCurrentWeather(weatherData);
  displayForecast(forecastData);
}

function displayCurrentWeather(data) {
  const temperature = Math.round(data.main.temp);
  const capitalizeDescription = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

  currentTemp.innerHTML = `${temperature}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', capitalizeDescription);
  captionDesc.textContent = `${capitalizeDescription}`;
}


async function displayForecast(data) {
  forecastContainer.innerHTML = ''; 

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const forecastData = data.list.filter(forecast => {
    const date = new Date(forecast.dt * 1000);
    date.setHours(0, 0, 0, 0); 
    const timeDifference = date.getTime() - today.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference >= 1 && daysDifference <= 3;
  });

  const forecastMap = new Map();
  forecastData.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });

    if (!forecastMap.has(day)) {
      forecastMap.set(day, {
        temperatures: [],
        icons: []
      });
    }

    forecastMap.get(day).temperatures.push(Math.round(forecast.main.temp));
    forecastMap.get(day).icons.push(forecast.weather[0].icon);
  });

  forecastMap.forEach((forecastData, day) => {
    const averageTemperature = Math.round(forecastData.temperatures.reduce((acc, temp) => acc + temp, 0) / forecastData.temperatures.length);
    const mostCommonIcon = mode(forecastData.icons);

    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
    forecastItem.innerHTML = `
      <p>${day}</p>
      <img src="https://openweathermap.org/img/w/${mostCommonIcon}.png" alt="Weather Icon">
     <p>${averageTemperature}&deg;F</p>
    `;

    forecastContainer.appendChild(forecastItem);
  });
}

function mode(arr) {
  return arr.reduce((a, b, i, arr) =>
    (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), null);
}


displayWeather();

const today = new Date().getDay();
if (today >= 1 && today <= 3) {
  banner.style.display = 'block';
}

closeButton.addEventListener('click', () => {
  banner.style.display = 'none';
});
