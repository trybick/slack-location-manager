const chalk = require('chalk');
const log = require('../util/consoleLog');

function handleSetSuccess(res) {
  const { real_name: realName, status_emoji: statusEmoji, email } = res.profile;

  log('\n');
  log(chalk.green(`✔ Status for ${realName || email} changed to ${statusEmoji}`));
}

module.exports = handleSetSuccess;
