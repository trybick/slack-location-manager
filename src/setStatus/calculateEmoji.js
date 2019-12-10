const rp = require('request-promise');
const handleErrors = require('../util/handleErrors');

//
// Return emoji dependent on user's IP address location
//

const emojiMap = {
  waltham: null,
  billerica: ':yoop_jazz_hands:',
  concord: ':yoop_jazz_hands:',
  remote: ':house_with_garden:',
};

async function calculateEmoji() {
  const { city, org } = await _getIpInfo();
  // console.log('org:', org)

  // Make it work for remote Waltham users
  if (city === 'waltham') {
    // console.log('org');
    // if org = F1V, return null
    // else return remote
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

calculateEmoji();

module.exports = calculateEmoji;
