const storage = require('node-persist');
const handleErrors = require('../util/handleErrors');
const chalk = require('chalk');
const log = require('../util/consoleLog');

//
// Store token locally
//

const directory = `/Applications/slack-location-manager/token`;
const legacyDir = `/Applications/slack-location-manager`;

async function saveToDisk(token) {
  await deleteLegacyToken();

  await initStorage();
  await storage.clear();
  storage.setItem('token', token);

  log('\n');
  log(chalk.green((await `✔ Token saved: `) + chalk.green(`${directory}`)));
}

// Delete the token stored in the old location
async function deleteLegacyToken() {
  await storage
    .init({
      dir: legacyDir,
    })
    .catch(handleErrors);
  await storage.removeItem('token');
}

async function initStorage() {
  await storage
    .init({
      dir: directory,
    })
    .catch(handleErrors);
}

module.exports = { initStorage, saveToDisk, directory };
