const chalk = require('chalk');
const log = require('./consoleLog');

function handleErrors(e) {
  console.error(e);
}

function handleMasterScriptErrors() {
  log(chalk.red('slm: Unrecognized or unsupplied argument'));
  log(chalk.cyan(`Try running one of the following:`));
  log('\n');
  log(chalk.blue(`slm install`) + chalk.whiteBright(': Create cron schedule'));
  log(chalk.blue('slm uninstall') + chalk.whiteBright(': Remove all associated cron jobs'));
  log(
    chalk.blue('slm set') +
      chalk.whiteBright(': Run the script to set your slack status based on your location')
  );

  process.exit(1);
}

module.exports = { handleErrors, handleMasterScriptErrors };
