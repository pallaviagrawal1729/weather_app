const geocode_callback = require('./utils/geocode_callback');
const forecast_callback = require('./utils/forecast_callback');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const getWeather = async (address) => {
    callbackFuncToGetWeatherInCelsius(address);
    await getWeatherInFahrenheit(address);
}

const callbackFuncToGetWeatherInCelsius = (address) => {
    geocode_callback(address, (error, { lat, lon, place } = {}) => {
        if (error)
            console.log('[ERROR] ' + error);
        else {
            forecast_callback(lat, lon, (error, forcastResponse) => {
                if (error)
                    console.log('[ERROR] ' + error);
                else
                    console.log(`For address ${place}\ncurrent weather is : ${renderCurrentWeather(forcastResponse, '\u00B0C')}`);
            });
        }
    });
}

const getWeatherInFahrenheit = async (address) => {
    try {
        const { lat, lon, place } = await geocode(address);
        const forecastResp = await forecast(lat, lon);
        console.log(`For address ${place}\ncurrent weather is : ${renderCurrentWeather(forecastResp, 'F')}`);
    } catch (err) {
        console.log(err);
    }
}

const renderCurrentWeather = (forecastResp, unit) => {
    const { weather_descriptions = [], temperature, feelslike } = forecastResp;
    return `${weather_descriptions[0]}, with temperature ${temperature}${unit} but feels like ${feelslike}${unit}`;
}

module.exports = getWeather;