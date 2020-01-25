#! /usr/bin/env node
const log = require('../util/consoleLog');
const fs = require('file-system');
const chalk = require('chalk');

//
// Outputs the most recent log file created by the slm cron job
//

async function fetchLog() {
  const filePath = '/Applications/slack-location-manager/output.log';

  fs.stat(filePath, function(err, stats) {
    if (err) {
      log(chalk.red('No log file from previous cron job calls found'));
      process.exit();
    }
    log(chalk.cyanBright('Reading log file:'));
    log(chalk.whiteBright(filePath, '\n'));

    log(chalk.cyanBright('The last cronjob for slm ran on:'));
    log(chalk.whiteBright(stats.mtime, '\n'));
  });

  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      log(err);
      process.exit();
    }
    log(chalk.cyanBright('The last cronjob output was:'));
    log(chalk.whiteBright(data));
  });
}

module.exports = fetchLog;
