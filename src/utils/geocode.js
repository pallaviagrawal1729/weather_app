require('dotenv').config();
const request = require('postman-request');

const geocode = (address) => {
    return new Promise((resolve, reject) => {
        // address is mandatory
        const geoUrl = process.env.GEOCODING_URL;
        const url = geoUrl.replace('address', address);
        setTimeout(() => {
            request.get(`${url}&limit=1`, { json: true }, (error, { body }) => {
                if (error)
                    reject(new Error('Unable to connect to geocoding service!'));
                else if (!body.length)
                    reject(new Error('No address matched!'));
                else
                    resolve({
                        lat: body[0].lat,
                        lon: body[0].lon,
                        place: body[0].display_name
                    });
            })
        }, 1000);
        
    })
}

module.exports = geocode;