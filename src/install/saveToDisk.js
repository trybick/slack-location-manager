const storage = require('node-persist');
const os = require('os');
const handleErrors = require('../util/handleErrors');
const _ = require('lodash');

//
// Persist user data to disk
//

async function saveToDisk(userData) {
  const localName = os.userInfo().username;
  const directory = `/Users/${localName}/Documents/slack-status-scheduler`;

  await storage
    .init({
      dir: directory,
    })
    .catch(handleErrors);

  await storage.clear();

  await Object.keys(userData).forEach(key => {
    storage.setItem(key, userData[key]);
    console.log(`${_.upperFirst(key)} saved to ${directory}`);
  });

  console.log(await 'Please click OK if in order to create cron job');
}

module.exports = saveToDisk;
