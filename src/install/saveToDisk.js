const storage = require('node-persist');
const handleErrors = require('../util/handleErrors');
const chalk = require('chalk');

//
// Store token locally
//

const { log } = console;
const directory = `/Applications/slack-location-manager`;

async function saveToDisk(token) {
  await initStorage();
  await storage.clear();
  storage.setItem('token', token);

  log(chalk.green.bold((await `✔ Token saved: `) + chalk.green(`${directory}`)));
}

async function initStorage() {
  await storage
    .init({
      dir: directory,
    })
    .catch(handleErrors);
}

module.exports = { initStorage, saveToDisk };
