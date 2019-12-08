const crontab = require('crontab');

//
// Schedule a system cron job for the recurring script
//

async function createCronJob(time) {
  const formattedTime = time // Parse '8:45' into '45 8'
    .split(':')
    .reverse()
    .join(' ');

  const schedule = `${formattedTime} * * 1-5`;
  console.log(await 'Please click OK to create a cron job');

  await crontab.load(function(err, job) {
    job.create('ls -la', schedule);
    job.save();
  });

  console.log(await `Cron job created: ${time} Mon-Fri`);
}

module.exports = createCronJob;
