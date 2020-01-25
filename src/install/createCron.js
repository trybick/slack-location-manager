const crontab = require('crontab');
const chalk = require('chalk');
const sh = require('shelljs');
const log = require('../util/consoleLog');

//
// Schedule a cron job to call the set command
//

function createCronJob(time) {
  const formattedTime = time // parse '8:45' into '45 8'
    .split(':')
    .reverse()
    .join(' ');
  const schedule = `${formattedTime} * * 1-5`;

  crontab.load(async function(err, cron) {
    // Cron doesn't know how to run the command 'slm set' - cron runs in a different environment without normal PATH
    // Using the 'which' command to find location of the node and slm binaries
    const nodeBin = sh.which('node');
    const slmBin = sh.which('slm');
    const redirect = '>/Applications/slack-location-manager/output.log 2>&1';
    const command = `${nodeBin} ${slmBin} set ${redirect}`;

    // Remove old jobs three different ways (just to be sure)
    cron.remove({ command });
    cron.remove({ command: 'slm set' });
    cron.jobs().forEach(job => {
      if (job.toString().includes('slm')) {
        cron.remove(job);
      }
    });

    // Save job
    const job = cron.create(command, schedule);
    if (job === null) {
      log(chalk.red.bold('Failed to create cron job \n'));
      process.exit();
    }
    cron.save();

    log(chalk.green(await `✔ Cron job created: ${time} am Monday - Friday`));
  });
}

module.exports = createCronJob;
