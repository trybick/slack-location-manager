const chalk = require('chalk');

function handleSetSuccess(res) {
  const { real_name: realName, status_emoji: statusEmoji, email } = res.profile;

  console.log(chalk.green(`Status for ${realName || email} changed to ${statusEmoji}`));
}

module.exports = handleSetSuccess;
