#! /usr/bin/env node
const fetchLog = require('./fetchLog');
const install = require('./install');
const uninstall = require('./uninstall');
const setStatus = require('./setStatus');
const { handleMasterScriptErrors } = require('./util/handleErrors');

//
// Top-level script ran with 'slm' command
//

const args = process.argv;
const option = args[2];

switch (option) {
  case 'install':
  case '-i':
    install();
    break;
  case 'set':
  case '-s':
    setStatus();
    break;
  case 'log':
  case '-l':
    fetchLog();
    break;
  case 'uninstall':
  case '-u':
    uninstall();
    break;
  default:
    handleMasterScriptErrors();
}
