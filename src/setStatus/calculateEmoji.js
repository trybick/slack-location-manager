/* eslint-disable no-restricted-syntax */
const rp = require('request-promise');
const handleErrors = require('../util/handleErrors');
const wifi = require('node-wifi');

//
// Return emoji dependent on user's location
//

const emojiMap = {
  remote: ':house_with_garden:',
  billerica: ':yoop-jazz-hands:',
  concord: ':yoop-jazz-hands:',
};

async function calculateEmoji() {
  if (await _calcIsAtF1v()) {
    return null;
  }

  const { city } = await _getIpInfo();

  return emojiMap[city] || emojiMap.remote;
}

// Can't rely on IP address location at F1V (sometimes it comes back as 'Boston')
// Instead, look for a match in the wifi SSIDs
function _calcIsAtF1v() {
  wifi.init({
    iface: null,
  });

  return wifi
    .scan()
    .then(networks => {
      let isAtF1v = false;

      for (const network of networks) {
        if (network.ssid.includes('Divide_By_Zero') || network.ssid.includes('Novatio')) {
          isAtF1v = true;
          break;
        }
      }

      return isAtF1v;
    })
    .catch(handleErrors);
}

function _getIpInfo() {
  const api = 'https://ipinfo.io/json';

  return rp(api)
    .then(res => {
      const json = JSON.parse(res);
      const { loc: gps } = json;
      const city = json.city.toLowerCase();

      return { city, gps };
    })
    .catch(handleErrors);
}

module.exports = calculateEmoji;
