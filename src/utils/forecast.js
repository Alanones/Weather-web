const request = require("postman-request");
const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${encodeURIComponent(
    process.env.WEATHER_STACK_KEY
  )}&query=${lat},${lon}`;
  request(url, (error, response, body) => {
    if (error) {
      callback("Unable to access weather services", undefined);
    } else if (JSON.parse(body).error) {
      console.log(JSON.parse(body));
      callback("Unable to find the location.", undefined);
    } else {
      const {
        weather_descriptions: desc,
        temperature,
        feelslike,
      } = JSON.parse(body).current;
      callback(
        undefined,
        `${desc[0]}. Current temperature is ${temperature} degrees celcius.
        Feels like ${feelslike} degrees celicus.`
      );
    }
  });
};
module.exports = forecast;
