const geocode_callback = require('./deprecated/geocode_callback');
const forecast_callback = require('./deprecated/forecast_callback');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const getWeather = async (address) => {
    callbackFuncToGetWeatherInCelsius(address);
    await getWeatherInFahrenheit(address);
}

const getWeatherForSite = async (address) => {
    try {
        const { lat, lon, place } = await geocode(address);
        const forecastResp = await forecast(lat, lon);
        const { weather_descriptions = [], temperature = '', feelslike = '' } = forecastResp || {}; 
        return {weather_descriptions, temperature, feelslike, place};
    } catch (err) {
        throw new Error(err.message);
    }
}

const callbackFuncToGetWeatherInCelsius = (address) => {
    geocode_callback(address, (error, { lat, lon, place } = {}) => {
        if (error)
            console.error( error);
        else {
            forecast_callback(lat, lon, (error, forcastResponse) => {
                if (error)
                    console.error( error);
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
        console.error(err);
    }
}

const renderCurrentWeather = (forecastResp, unit) => {
    const { weather_descriptions = [], temperature, feelslike } = forecastResp || {};
    return `${weather_descriptions[0]}, with temperature ${temperature}${unit} but feels like ${feelslike}${unit}`;
}

module.exports = {getWeather, getWeatherForSite};