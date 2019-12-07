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

  crontab.load(function(err, job) {
    job.create('ls -la', schedule);
    job.save();
  });
}

module.exports = createCronJob;
