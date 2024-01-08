// forecast the weather corresponding to lat,long passed.
require('dotenv').config();
const request = require('postman-request');

const forecast = (lat, lon) => {
    return new Promise((resolve, reject) => {
        const weatherUrl = process.env.WEATHER_URL;
        const url = weatherUrl.replace('lat_lon', `${lat}, ${lon}`);
        request.get(`${url}&units=f`, { json: true }, (error, { body }) => {
            if (error)
                reject(new Error('Unable to connect to weather service!'));
            else if (!body)
                reject(new Error('Weather could not be fetched for provided address!'));
            else
                resolve(body.current);
        })
    });
}

module.exports = forecast;