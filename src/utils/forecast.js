const request = require('request');

getWeather = (latitude, longitude, callback) => {


    const url = 'http://api.weatherstack.com/current?access_key=87fe69ac7f1569f6c824b4885127d5a2&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({ url, json: true }, (error, { body } = {}) => {
        // with request we only ever have an error OR a response :-)
        if (error) {
            callback('Unable to reach the weather service.');
        } else if (body.success === false) {
            error = {
                code: body.error.code,
                type: body.error.type,
                info: body.error.info
            }
            callback(error);
        } else {
            const forecast = `Current temperature is ${body.current.temperature}° and there is a ${body.current.precip}% chance of rain. \
                Wind speed is ${body.current.wind_speed} in the ${body.current.wind_dir} direction.`;
            callback(undefined, forecast);
        }
    })
};

module.exports = getWeather;