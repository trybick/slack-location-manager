const rp = require('request-promise');
const handleErrors = require('../util/handleErrors');

//
// Return emoji dependent on user's IP address location
//

const emojiMap = {
  f1v: null,
  billerica: ':yoop_jazz_hands:',
  concord: ':yoop_jazz_hands:',
  remote: ':house_with_garden:',
};

async function calculateEmoji() {
  const { city, org } = await _getIpInfo();
  const isAtF1V = (city === 'waltham' || city === 'watertown') && org.contains('Verizon Business');

  if (isAtF1V) {
    return emojiMap.f1v;
  }

  return emojiMap[city] || emojiMap.remote;
}

function _getIpInfo() {
  const api = 'https://ipinfo.io/json';

  return rp(api)
    .then(res => {
      const json = JSON.parse(res);
      const { org } = json;
      const city = json.city.toLowerCase();

      return { org, city };
    })
    .catch(handleErrors);
}

module.exports = calculateEmoji;
