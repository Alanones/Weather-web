const request = require("postman-request");

const geocode = (address, callback) => {
  const po_url = `http://api.positionstack.com/v1/forward?access_key=${
    process.env.POSITION_STACK_KEY
  }&query=${encodeURIComponent(address)}&limit=1`;

  request(po_url, (error, response, body) => {
    if (error) {
      callback("Unable to connect to geocode services.", undefined);
    } else if (JSON.parse(body).data.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const { latitude, longitude, label: location } = JSON.parse(body).data[0];
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
