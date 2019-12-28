const rp = require('request-promise');
const handleErrors = require('../util/handleErrors');
const geolib = require('geolib');

//
// Return emoji dependent on user's IP address location
//

const emojiMap = {
  f1v: null,
  remote: ':house_with_garden:',
  billerica: ':yoop-jazz-hands:',
  concord: ':yoop-jazz-hands:',
};

async function calculateEmoji() {
  const { city, gps } = await _getIpInfo();
  const isPossiblyAtF1V = city === 'waltham' || city === 'watertown';

  if (isPossiblyAtF1V && _checkGPSCoords(gps) < 1) {
    return emojiMap.f1v;
  }

  return emojiMap[city] || emojiMap.remote;
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

function _checkGPSCoords(gps) {
  const coords = gps.split(',');
  const F1V = {
    lat: '42.366716',
    long: '-71.218910',
  };

  const dist = geolib.getDistance(
    { latitude: coords[0], longitude: coords[1] },
    { latitude: F1V.lat, longitude: F1V.long }
  );
  const distInMiles = dist / 1609;

  return distInMiles;
}

module.exports = calculateEmoji;
