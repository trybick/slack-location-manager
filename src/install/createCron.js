const crontab = require('crontab');
const chalk = require('chalk');

//
// Schedule a system cron job for the recurring script
//

const { log } = console;

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

    log(
      chalk.green.bold((await '✔ Cron job created: ') + chalk.green(`${time}am Monday - Friday`))
    );
    log(chalk.cyan.italic.bold(await `Please click OK for write access if prompted`));
  });
}

module.exports = createCronJob;
