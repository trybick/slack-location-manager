#! /usr/bin/env node

const chalk = require('chalk');
const install = require('./install/index');
const setStatus = require('./setStatus/index');

const args = process.argv;
const option = args[2];

if (!option) {
  console.log(chalk.red.bold('Expected at least one argument'));
  console.log(chalk.cyan(`Try running 'slm install' or 'slm set'`));
  process.exit(1);
} else if (option === 'install' || option === '-i') {
  install();
} else if (option === 'set' || option === '-s') {
  setStatus();
}
