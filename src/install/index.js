#! /usr/bin/env node

const promptUser = require('./promptUser');
const { saveToDisk } = require('./saveToDisk');
const createCronJob = require('./createCron');

//
// The install script
// prompt user --> save token --> create cron job
//

(async function install() {
  const userData = await promptUser();
  const { schedule, token } = userData;

  await saveToDisk(token);
  await createCronJob(schedule);
})();
