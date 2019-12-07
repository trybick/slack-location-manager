const promptUser = require('./promptUser');
const saveToDisk = require('./saveToDisk');
const createCronJob = require('./createCron');

//
// The install script
// promptUser --> saveToDisk --> createCron (then cron job calls recurring script)
//

(async function main() {
  const userData = await promptUser();
  const { schedule } = userData;

  saveToDisk(userData);
  createCronJob(schedule);
})();
