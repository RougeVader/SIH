document.addEventListener('DOMContentLoaded', () => {
    const feedbackContent = document.getElementById('feedback-content');
    const urlParams = new URLSearchParams(window.location.search);
    const crop = urlParams.get('crop');
    const city = urlParams.get('city');

    // IMPORTANT: Replace "YOUR_API_KEY" with your actual OpenWeatherMap API key
    const apiKey = "4fe2178b56af6cfe166e09ed346d46dd";

    if (crop && city) {
        if (apiKey === "YOUR_API_KEY") {
            feedbackContent.innerHTML = `
                <div class="advice-header">
                    <h2>Configuration Needed</h2>
                </div>
                <div class="advice-body">
                    <p style="color: red; font-weight: bold;">Please replace "YOUR_API_KEY" in advice.js with your actual OpenWeatherMap API key.</p>
                </div>
            `;
            return;
        }

        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        // Function to fetch and display weather
        const fetchWeather = async () => {
            try {
                const [weatherResponse, forecastResponse] = await Promise.all([
                    fetch(weatherApiUrl),
                    fetch(forecastApiUrl)
                ]);

                if (!weatherResponse.ok || !forecastResponse.ok) {
                    throw new Error('Weather data not found. Please check the city name or wait a few minutes for the new API key to activate.');
                }

                const weatherData = await weatherResponse.json();
                const forecastData = await forecastResponse.json();

                // Process and display data
                displayWeatherData(weatherData, forecastData);

            } catch (error) {
                feedbackContent.innerHTML = `
                    <div class="advice-header">
                        <h2>Error</h2>
                    </div>
                    <div class="advice-body">
                        <p>${error.message}</p>
                    </div>
                `;
            }
        };

        const displayWeatherData = (weather, forecast) => {
            const currentTemp = `${Math.round(weather.main.temp)}°C`;
            const currentCondition = weather.weather[0].main;
            const weatherIcon = getWeatherIcon(weather.weather[0].main);

            const forecastHtml = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 3).map(item => {
                const day = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
                const temp = `${Math.round(item.main.temp)}°C`;
                const condition = item.weather[0].main;
                return `<li><strong>${day}:</strong> ${condition}, ${temp}</li>`;
            }).join('');

            // Placeholder for recommendation logic
            const recommendation = `Based on the forecast, consider watering your ${crop} in the evenings on sunny days.`;

            feedbackContent.innerHTML = `
                <div class="advice-header">
                    <h2>Advice for <strong>${crop}</strong> in <strong>${city}</strong></h2>
                </div>
                <div class="advice-body">
                    <div class="weather-section">
                        <h3><span class="icon">${weatherIcon}</span> Current Weather</h3>
                        <p class="weather-data">${currentCondition}, ${currentTemp}</p>
                    </div>
                    <div class="forecast-section">
                        <h3><span class="icon">📈</span> 3-Day Forecast</h3>
                        <ul class="forecast-list">
                            ${forecastHtml}
                        </ul>
                    </div>
                    <div class="recommendation-section">
                        <h3><span class="icon">💡</span> Recommendations</h3>
                        <p>${recommendation}</p>
                    </div>
                </div>
            `;
        };

        const getWeatherIcon = (condition) => {
            switch (condition) {
                case 'Clear': return '☀️';
                case 'Clouds': return '☁️';
                case 'Rain': return '🌧️';
                case 'Drizzle': return '🌦️';
                case 'Thunderstorm': return '⛈️';
                case 'Snow': return '❄️';
                default: return '🌫️';
            }
        };

        fetchWeather();

    } else {
        feedbackContent.innerHTML = `
            <div class="advice-header">
                <h2>Error</h2>
            </div>
            <div class="advice-body">
                <p>No crop or city information provided. Please go back and make a selection.</p>
            </div>
        `;
    }
});