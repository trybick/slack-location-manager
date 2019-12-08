const crontab = require('crontab');

//
// Schedule a system cron job for the recurring script
//

function createCronJob(time) {
  const formattedTime = time // Parse '8:45' into '45 8'
    .split(':')
    .reverse()
    .join(' ');

  const schedule = `${formattedTime} * * 1-5`;

  crontab.load(async function(err, job) {
    job.create('ls -la', schedule);
    job.save();

    console.log(await `Cron job created for ${time} Monday - Friday.`);
    console.log(await `Please click OK for write access if prompted.`);
  });
}

module.exports = createCronJob;
