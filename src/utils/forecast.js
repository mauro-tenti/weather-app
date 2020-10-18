const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d8749e91249f36be9d23493449774ccb&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (response.body.error) {
      callback("Unable to find location");
    } else {
      const { current } = response.body;
      callback(undefined, {
        message: `At ${
          current.observation_time
        } the weather was ${current.weather_descriptions[0].toLowerCase()}, it was ${
          current.temperature
        }° and it felt like it was ${current.feelslike}°`,
        icon: current.weather_icons[0],
      });
    }
  });
};

module.exports = forecast;
