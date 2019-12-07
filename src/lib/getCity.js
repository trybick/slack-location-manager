const rp = require('request-promise');
const handleErrors = require('../util/handleErrors');

function getCity() {
  return rp('https://ipinfo.io/json')
    .then(res => {
      const json = JSON.parse(res);

      return json.city;
    })
    .catch(handleErrors);
}

module.exports = getCity;
