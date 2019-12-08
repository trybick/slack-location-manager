const storage = require('node-persist');
const handleErrors = require('../util/handleErrors');
const chalk = require('chalk');

//
// Store token locally
//

const directory = `/Applications/slack-status-scheduler`;

async function saveToDisk(token) {
  await initStorage();
  await storage.clear();
  storage.setItem(token);

  console.log(chalk.green.bold(await `Token saved to ${directory}`));
}

async function initStorage() {
  await storage
    .init({
      dir: directory,
    })
    .catch(handleErrors);
}

module.exports = { initStorage, saveToDisk };
