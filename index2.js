
class WeatherDataAdapter {
    constructor(apiKey) {
      this.apiKey = apiKey;
    }
  
    fetchWeather(city) {
      return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then(response => response.json())
        .then(json => {
          return this.standardizeData(json);
        });
    }
  
    standardizeData(data) {
      if (data.cod === '404') {
        return {
          error: 'City not found',
        };
      }
  
      return {
        temperature: `${parseInt(data.main.temp)}°C`,
        description: data.weather[0].description,
        humidity: `${data.main.humidity}%`,
        wind: `${parseInt(data.wind.speed)}Km/h`,
        image: this.getWeatherImage(data.weather[0].main),
      };
    }
  
    getWeatherImage(weatherType) {
      switch (weatherType) {
        case 'Clear':
          return 'images/clear.png';
        case 'Rain':
          return 'images/rain.png';
        case 'Snow':
          return 'images/snow.png';
        case 'Clouds':
          return 'images/cloud.png';
        case 'Mist':
            return 'images/mist.png';
        case 'Haze':
          return 'images/mist.png';
        case 'Drizzle':
          return 'images/rain.png';
        default:
          return '';
      }
    }
  }
  
  const openWeatherAdapter = new WeatherDataAdapter('write your API code'); // for example: is this side have free api https://home.openweathermap.org/
  const container = document.querySelector('.container');
  const search = document.querySelector('.search-box button');
  const weatherBox = document.querySelector('.weather-box');
  const weatherDetails = document.querySelector('.weather-details');
  const error404 = document.querySelector('.not-found');
  
  search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;
  
    if (city === '') return;
  
    openWeatherAdapter.fetchWeather(city)
      .then(data => {
        if (data.error) {
          container.style.height = '400px';
          weatherBox.style.display = 'none';
          weatherDetails.style.display = 'none';
          error404.style.display = 'block';
          error404.classList.add('fadeIn');
        } else {
          error404.style.display = 'none';
          error404.classList.remove('fadeIn');
  
          const image = document.querySelector('.weather-box img');
          const temperature = document.querySelector('.weather-box .temperature');
          const description = document.querySelector('.weather-box .description');
          const humidity = document.querySelector('.weather-details .humidity span');
          const wind = document.querySelector('.weather-details .wind span');
  
          image.src = data.image;
          temperature.innerHTML = data.temperature;
          description.innerHTML = data.description;
          humidity.innerHTML = data.humidity;
          wind.innerHTML = data.wind;
  
          weatherBox.style.display = '';
          weatherDetails.style.display = '';
          weatherBox.classList.add('fadeIn');
          weatherDetails.classList.add('fadeIn');
          container.style.height = '590px';
        }
      });
  });
  