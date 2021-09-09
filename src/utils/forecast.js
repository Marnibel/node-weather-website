const request = require('request');
const chalk = require('chalk');

const forecast = (latitude, longitude, callback) => { 
    const url = 'http://api.weatherstack.com/current?access_key=78d53aa5a786e349c52593cf9209c224&query=0' + latitude + ',' + longitude + '&units=m'

    request({ url: url, json : true }, ( error, {body} ) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to connect!', undefined)
        }
        else {
            callback(undefined, body.location.localtime + '. ' + 'Humidity is '+ body.current.humidity + ' .' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. But it feels like '+ body.current.feelslike + ' degrees outside.')
        }
    })
}
module.exports = forecast