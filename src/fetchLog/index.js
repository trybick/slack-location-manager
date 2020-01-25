#! /usr/bin/env node
const log = require('../util/consoleLog');
const fs = require('file-system');
const chalk = require('chalk');

//
// Outputs the most recent log file created by the slm cron job
//

async function fetchLog() {
  const path = '/Applications/slack-location-manager/output.log';

  log(
    chalk.yellow(
      `Note: This log is only created by cron and doesn't get created from manual 'slm set' commands\n`
    )
  );

  fs.stat(path, function(err, stats) {
    if (err) {
      log(chalk.red('No log file from previous cron job calls found'));
      process.exit();
    }
    log(chalk.cyanBright.bold('Reading log file:'));
    log(chalk.whiteBright(path, '\n'));

    log(chalk.cyanBright.bold('The last cronjob for slm ran on:'));
    log(chalk.whiteBright(stats.mtime, '\n'));
  });

  fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      log(err);
      process.exit();
    }
    log(chalk.cyanBright.bold('The last cronjob output was:'));
    log(chalk.whiteBright(data));
  });
}

module.exports = fetchLog;
