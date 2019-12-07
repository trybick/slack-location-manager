const storage = require('node-persist');
const os = require('os');
const handleErrors = require('../util/handleErrors');

//
// Persist user data to disk
//

const localName = os.userInfo().username;

async function saveToDisk(userData) {
  await storage
    .init({
      dir: `/Users/${localName}/Documents/slack-status-scheduler`,
    })
    .catch(handleErrors);

  await storage.clear();

  Object.keys(userData).forEach(key => {
    storage.setItem(key, userData[key]).catch(handleErrors);
  });
}

module.exports = saveToDisk;
