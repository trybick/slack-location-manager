const crontab = require('crontab');

//
// Schedule a system cron job
//

function createCronJob(time) {
  // Parse '8:45' into '45 8'
  const formattedTime = time
    .split(':')
    .reverse()
    .join(' ');

  const cronSchedule = `${formattedTime} * * 1-5`;

  crontab.load(function(err, crontab) {
    crontab.create('ls -la', cronSchedule); // Replace with slack script
    crontab.save();
  });
}

module.exports = createCronJob;
