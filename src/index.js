// to do later inside recurring cron script:
// import user info into slack script
// make slack API call

const promptUser = require('./lib/prompts');
const saveToDisk = require('./lib/store');
const createCronJob = require('./lib/cron');

(async function main() {
  // Prompt user for input
  const userData = await promptUser();

  // Persist user info
  saveToDisk(userData);

  // Schedule cron job
  createCronJob(userData.time);
})();
