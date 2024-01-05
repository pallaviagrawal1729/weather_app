require('dotenv').config();
const request = require('postman-request');

const geocode = (address) => {
    return new Promise((resolve, reject) => {
        // address is mandatory
        const geoUrl = process.env.GEOCODING_URL;
        const url = geoUrl.replace('address', address);
        request.get(url, { json: true }, (error, { body }) => {
            if (error)
                reject('Unable to connect to geocoding service!');
            else if (!body.length)
                reject('No address matched!');
            else
                resolve({
                    lat: body[0].lat,
                    lon: body[0].lon,
                    place: body[0].display_name
                });
        })
    })
}

module.exports = geocode;