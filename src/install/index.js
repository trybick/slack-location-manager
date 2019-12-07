// to do later inside recurring cron script:
// import user info into slack script
// make slack API call

const promptUser = require('./promptUser');
const saveToken = require('./saveToken');
const createCronJob = require('./createCron');

(async function main() {
  // Prompt user for input
  const userData = await promptUser();

  // Persist user info
  saveToken(userData);

  // Schedule cron job
  createCronJob(userData.time);
})();
