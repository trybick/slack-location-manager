#! /usr/bin/env node
const prompts = require('prompts');
const chalk = require('chalk');
const crontab = require('crontab');
const log = require('../util/consoleLog');
const storage = require('node-persist');
const { directory, initStorage } = require('../install/saveToDisk');

//
// Removes associated cron jobs and local token
//

const questions = [
  {
    name: 'uninstall',
    type: 'text',
    message:
      'Uninstalling will remove your local token and all associated cron jobs. Would you like to continue? (yes/no)',
  },
];

async function promptForUninstall() {
  const response = await prompts(questions);
  const { uninstall } = response;
  const isConfirmed = uninstall === 'yes' || uninstall === 'y';

  if (isConfirmed) {
    _removeCronJobs();
    _removeToken();
  } else {
    log('\n');
    log(chalk.red('Exited without changes'));
  }
}

function _removeCronJobs() {
  crontab.load(async function(err, cron) {
    const command = 'slm set';

    cron.remove({ command });
    cron.jobs().forEach(job => {
      if (job.toString().includes('slm')) {
        cron.remove(job);
      }
    });
    cron.save();
  });
}

async function _removeToken() {
  await initStorage();
  await storage.clear();

  log('\n');
  log(chalk.green((await `✔ Token removed: `) + chalk.green(`${directory}`)));
  log(chalk.green(await '✔ Cron jobs removed '));
}

module.exports = promptForUninstall;
