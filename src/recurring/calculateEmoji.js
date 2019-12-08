const rp = require('request-promise');
const handleErrors = require('../util/handleErrors');

//
// Return emoji dependent on user's IP address
//

const emojiMap = {
  Waltham: null,
  Billerica: ':green_apple:',
  Concord: ':green_apple:',
  remote: ':earth_americas:',
};

async function calculateEmoji() {
  const city = await _getCity();

  return emojiMap[city] || emojiMap.remote;
}

function _getCity() {
  const api = 'https://ipinfo.io/json';

  return rp(api)
    .then(res => {
      const json = JSON.parse(res);

      return json.city;
    })
    .catch(handleErrors);
}

module.exports = calculateEmoji;
