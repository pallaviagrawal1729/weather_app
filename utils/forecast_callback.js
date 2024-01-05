// forecast the weather corresponding to lat,long passed.
require('dotenv').config();
const request = require('postman-request');

const forecast_callback = (lat, lon, callback) => {
    const weatherUrl = process.env.WEATHER_URL;
    const url = weatherUrl.replace('lat_lon', `${lat}, ${lon}`);
    request.get(`${url}`, { json: true }, (error, { body }) => {
        if (error)
            callback('Unable to connect to weather service!');
        else if (!body)
            callback('Weather could not be fetched for provided address!');
        else {
            callback(undefined, body.current);
        }

    })
}

module.exports = forecast_callback;