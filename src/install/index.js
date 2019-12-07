const promptUser = require('./promptUser');
const { saveToDisk } = require('./saveToDisk');
const createCronJob = require('./createCron');

//
// The install script
// promptUser --> saveToDisk --> createCron
//

(async function install() {
  const userData = await promptUser();
  const { schedule, token } = userData;

  await saveToDisk(token);
  await createCronJob(schedule);
})();
