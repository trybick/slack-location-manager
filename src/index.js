#! /usr/bin/env node
const install = require('./install');
const uninstall = require('./uninstall');
const setStatus = require('./setStatus');
const { handleMasterScriptErrors } = require('./util/handleErrors');

//
// Top-level script ran with 'slm' command
//

const args = process.argv;
const option = args[2];

if (option === 'install' || option === '-i') {
  install();
} else if (option === 'set' || option === '-s') {
  setStatus();
} else if (option === 'uninstall' || option === '-u') {
  uninstall();
} else {
  handleMasterScriptErrors();
}
