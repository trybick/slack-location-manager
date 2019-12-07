const request = require('request');
const handleErrors = require('../util/handleErrors');

let ip;
let location;

async function getIp() {
  await request('https://ipinfo.io/ip', function(error, response, body) {
    if (error) {
      handleErrors(error);
    }

    ip = body;
  });

  await request(`https://ipvigilante.com/72.74.165.59/city_name`, function(error, response, body) {
    if (error) {
      handleErrors(error);
    }

    console.log('body', body);
  });
}

getIp();
