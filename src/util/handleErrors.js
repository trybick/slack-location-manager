const chalk = require('chalk');
const log = require('./consoleLog');

function handleErrors(e) {
  console.error(e);
}

function handleMasterScriptErrors() {
  log(chalk.redBright('slm: Unrecognized or unsupplied argument'));
  log(chalk.cyanBright(`Try running one of the following:`));
  log('\n');
  log(
    chalk.cyanBright.bold(`slm install`) + chalk.whiteBright(': Setup your token and cron schedule')
  );
  log(
    chalk.cyanBright.bold('slm uninstall') +
      chalk.whiteBright(': Remove token all associated cron jobs')
  );
  log(
    chalk.cyanBright.bold('slm set') +
      chalk.whiteBright(': Run the script to set your slack status')
  );

  process.exit(1);
}

function validateRetrievedToken(token) {
  const regex = /^[0-9A-Za-z\s-]+$/; // letters, numbers, dashes
  const isValid = token && token.length > 50 && regex.test(token);

  if (!isValid) {
    log(chalk.redBright('slm: Could not validate token'));
    log(
      chalk.cyanBright('Try running ') +
        chalk.cyanBright.bold('slm install ') +
        chalk.cyanBright('with your token')
    );
    process.exit(1);
  }

  return token;
}

module.exports = { handleErrors, handleMasterScriptErrors, validateRetrievedToken };
