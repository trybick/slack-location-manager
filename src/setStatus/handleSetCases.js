const chalk = require('chalk');
const log = require('../util/consoleLog');

function handleSetExit() {
  log(chalk.cyan.bold('No status changed. You appear to be at F1V.'));
  log('\n');
  log(chalk.redBright.bold(`(╯°□°）╯︵ ┻━┻`));
  log(chalk.blueBright.bold(`        (╯°□°）╯︵ ┻━┻`));
  log(chalk.greenBright.bold(`                (╯°□°）╯︵ ┻━┻`));
}

function handleSetSuccess(res) {
  const { real_name: realName, status_emoji: statusEmoji, email } = res.profile;

  log(chalk.green.bold(`Status for ${realName || email} changed to ${statusEmoji}`));
  log(`\n
  ( •_•)
  ( •_•)>⌐■-■
  (⌐■_■)`);
}

module.exports = { handleSetExit, handleSetSuccess };
