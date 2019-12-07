const rp = require('request-promise');
const handleErrors = require('../util/handleErrors');

function _getCity() {
  return rp('https://ipinfo.io/json')
    .then(res => {
      const json = JSON.parse(res);

      return json.city;
    })
    .catch(handleErrors);
}

async function calculateEmoji() {
  let emoji;
  const city = await _getCity();

  if (city === 'Waltham') {
    emoji = null;
  } else if (city === 'Billerica' || city === 'Concord') {
    emoji = 'green_apple';
  } else {
    emoji = ':earth_americas:';
  }

  return emoji;
}

module.exports = calculateEmoji;
