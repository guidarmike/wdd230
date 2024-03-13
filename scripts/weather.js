const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather';

const latitude = '42.21';
const longitude = '12.73';

const apiKey = 'da779bd1d605128ae756b58e0713e368';

const queryString = `?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
const fullUrl = url + queryString;

async function apiFetch() {
  try {
    const response = await fetch(fullUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data); 
      displayResults(data); 
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;
}


function displayResults(data) {
    // Format temperature to show zero decimal points
    const temperature = Math.round(data.main.temp);
  
    // Capitalize each word of the weather description
    const capitalizeDescription = data.weather[0].description.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  
    currentTemp.innerHTML = `${temperature}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', capitalizeDescription);
    captionDesc.textContent = `${capitalizeDescription}`;
}
  