const promptUser = require('./promptUser');
const saveToDisk = require('./saveToDisk');
const createCronJob = require('./createCron');

//
// The install script runs in this order:
// promptUser --> saveToDisk --> createCron (then cron job calls recurring script)
//

(async function main() {
  const userData = await promptUser();

  saveToDisk(userData);

  createCronJob(userData.time);
})();
