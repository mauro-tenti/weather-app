const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWF1cm90ZW50aSIsImEiOiJja2ZwdHkzcGMwN3pmMnFvZjFrY2wwcmx2In0.x_CtUvrzDWkzhPX_ZF6_qA&limit=1`;
  request({ url, json: true }, (error, response) => {
    const { features } = response.body;
    if (error) {
      callback('Unable to connect to location services!');
    } else if (!features.length) {
      callback('Unable to find location try another search');
    } else {
      const [longitude, latitude] = features[0].center;
      callback(undefined, {
        latitude,
        longitude,
        location: features[0].place_name,
      });
    }
  });
}

module.exports = geocode;