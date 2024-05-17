const container = document.querySelector('.main-box');
const search = document.querySelector('.search-bar .button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = 'cc98a275b537ca749281d587cf488a3d';
    const city = document.querySelector('.search-bar input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(Response => Response.json()).then(json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');


        const image = document.querySelector('.weather-box img');
        const tempreture = document.querySelector('.weather-box .tempreture');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'clear':
                image.src = 'img/clear.png';
                break;

            case 'Rain':
                image.src = 'img/rain.png';
                break;

            case 'Snow':
                image.src = 'img/snow.png';
                break;

            case 'Clouds':
                image.src = 'img/cloud.png';
                break;

            case 'Mist':
                image.src = 'img/mist.png';
                break;


            case 'Haze':
                image.src = 'img/mist.png';
                break;

            default:
                image.src = 'img/cloud.png';

        }

        tempreture.innerHTML = `${parseInt(json.main.temp)}°C`;
        description.innerHTML = json.weather[0].description;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed} Km/h`;

        
    })
  
})
