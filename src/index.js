#! /usr/bin/env node

const chalk = require('chalk');
const install = require('./install/index');
const setStatus = require('./setStatus/index');

//
// Top-level master script
//

const args = process.argv;
const option = args[2];
const { log } = console;

if (!option) {
  log(chalk.red('Expected at least one argument'));
  log(chalk.cyan(`Try running 'slm install' or 'slm set'`));
  process.exit(1);
} else if (option === 'install' || option === '-i') {
  install();
} else if (option === 'set' || option === '-s') {
  setStatus();
}
