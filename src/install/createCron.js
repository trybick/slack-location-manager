const crontab = require('crontab');
const chalk = require('chalk');
const log = require('../util/consoleLog');

//
// Schedule a cron job for the recurring script
//

function createCronJob(time) {
  const formattedTime = time // parse '8:45' into '45 8'
    .split(':')
    .reverse()
    .join(' ');
  const schedule = `${formattedTime} * * 1-5`;

  crontab.load(async function(err, cron) {
    const slmCommand = 'slm set';
    const redirect = ' >/dev/null 2>&1';

    cron.remove({ command: slmCommand }); // remove old jobs
    cron.create(slmCommand + redirect, schedule);
    cron.save();

    log(chalk.green(await `✔ Cron job created: ${time} am Monday - Friday`));
    log('\n');
    log(chalk.cyan.italic.bold(await `Please click OK for write access if prompted`));
  });
}

module.exports = createCronJob;
