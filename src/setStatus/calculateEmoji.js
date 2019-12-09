const rp = require('request-promise');
const handleErrors = require('../util/handleErrors');

//
// Return emoji dependent on user's IP address
//

const emojiMap = {
  waltham: null,
  billerica: ':green_apple:',
  concord: ':green_apple:',
  remote: ':house_with_garden:',
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

      return json.city.toLowerCase();
    })
    .catch(handleErrors);
}

module.exports = calculateEmoji;
