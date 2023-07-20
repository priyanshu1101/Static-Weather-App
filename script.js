document.querySelector(".search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.querySelector("#cityName").value;
    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    const apiKey = "7a5f07b9155910978ac982a93820bf70"; // Replace with your actual API key
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    console.log(weatherUrl);

    fetch(weatherUrl)
        .then((response) => response.json())
        .then((weatherData) => {
            if (weatherData.cod !== 200) {
                displayError(`Error: ${weatherData.message}`);
            } else {
                displayWeatherInfo(weatherData);
            }
        })
        .catch((error) => {
            displayError("Error fetching weather data");
        });
}

function displayError(errorMessage) {
    document.querySelector("#weatherInfo").innerHTML = `<h1>${errorMessage}</h1>`;
}

function displayWeatherInfo(weatherData) {
    const cityName = weatherData.name;
    const description = weatherData.weather[0].description;
    const temperature = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    const minTemp = weatherData.main.temp_min;
    const maxTemp = weatherData.main.temp_max;
    const pressure = weatherData.main.pressure;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const icon = weatherData.weather[0].icon;

    const weatherHtml = `
            <div style="display: flex; align-items: center;">
                <i class="fas fa-${getWeatherIcon(icon)}" style="font-size: 36px; color: #007bff;"></i>
                <div style="margin-left: 10px;">
                    <h2 style="margin: 0; color: #007bff;">${cityName}</h2>
                    <br/>
                    <h3 style="margin: 0; color: #666;">${description}</h3>
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <i class="fas fa-thermometer-half" style="font-size: 24px; color: #ff6347;"></i>
                <div style="margin-left: 10px;">
                    <h2 style="margin: 0; color: #ff6347;">Feels Like:</h2>
                    <br/>
                    <p style="margin: 0; color: #666;">${feelsLike} °C</p>
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <i class="fas fa-temperature-low" style="font-size: 24px; color: #20c997;"></i>
                <div style="margin-left: 10px;">
                    <h2 style="margin: 0; color: #20c997;">Min Temperature</h2>
                    <br/>
                    <p style="margin: 0; color: #666;">${minTemp} °C</p>
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <i class="fas fa-temperature-high" style="font-size: 24px; color: #fd7e14;"></i>
                <div style="margin-left: 10px;">
                    <h2 style="margin: 0; color: #fd7e14;">Max Temperature</h2>
                    <br/>
                    <p style="margin: 0; color: #666;">${maxTemp} °C</p>
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <i class="fas fa-tachometer-alt" style="font-size: 24px; color: #6c757d;"></i>
                <div style="margin-left: 10px;">
                    <h2 style="margin: 0; color: #6c757d;">Pressure</h2>
                    <br/>
                    <p style="margin: 0; color: #666;">${pressure} hPa</p>
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <i class="fa fa-tint fa-lg" style="font-size: 24px; color: #17a2b8;"></i>
                <div style="margin-left: 10px;">
                    <h2 style="margin: 0; color: #17a2b8;">Humidity</h2>
                    <br/>
                    <p style="margin: 0; color: #666;">${humidity}%</p>
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <i class="fas fa-wind" style="font-size: 24px; color: #ffc107;"></i>
                <div style="margin-left: 10px;">
                    <h2 style="margin: 0; color: #ffc107;">Wind Speed</h2>
                    <br/>
                    <p style="margin: 0; color: #666;">${windSpeed} m/s</p>
                </div>
            </div>
    `;

    document.querySelector("#weatherInfo").innerHTML = weatherHtml;
}

function getWeatherIcon(iconCode) {
    switch (iconCode) {
        case "01d":
            return "sun";
        case "01n":
            return "moon";
        case "02d":
        case "02n":
        case "03d":
        case "03n":
            return "cloud";
        case "04d":
        case "04n":
            return "cloud-showers-heavy";
        case "09d":
        case "09n":
        case "10d":
        case "10n":
            return "cloud-rain";
        case "11d":
        case "11n":
            return "bolt";
        case "13d":
        case "13n":
            return "snowflake";
        case "50d":
        case "50n":
            return "smog";
        default:
            return "question";
    }
}
