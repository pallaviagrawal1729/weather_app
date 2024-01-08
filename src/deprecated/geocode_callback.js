// forward geocoding - provides lat, long for a place
require('dotenv').config();
const request = require('postman-request');

const geocode_callback = (address, callback) => {
    // address is mandatory
    const geoUrl = process.env.GEOCODING_URL;
    const url = geoUrl.replace('address', address);
    setTimeout(() => {
        request.get(`${url}&limit=1`, { json: true }, (error, { body }) => {
            if (error)
                callback('Unable to connect to geocoding service!');
            else if (!body.length)
                callback('No address matched!');
            else
                callback(undefined, {
                    lat: body[0].lat,
                    lon: body[0].lon,
                    place: body[0].display_name
                });
        });
    }, 3000);

}

module.exports = geocode_callback;