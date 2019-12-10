const prompts = require('prompts');

//
// Prompt user for Slack token and desired time to run script
//

const questions = [
  {
    name: 'token',
    type: 'text',
    style: 'password',
    validate: _validateToken,
    message:
      "Your slack token is needed to determine which user's status to change. Please paste your token:",
  },
  {
    type: 'select',
    name: 'schedule',
    message: 'What time should the status updater script run (Mon - Fri)?',
    choices: [
      { title: '8:45 am', value: '8:45' },
      { title: '8:55 am', value: '8:55' },
      { title: '9:05 am', value: '9:05' },
      { title: '9:15 am', value: '9:15' },
      { title: '9:25 am', value: '9:15' },
    ],
    initial: 2,
  },
];

async function promptUser() {
  const data = await prompts(questions);

  return data;
}

function _validateToken(token) {
  const regex = /^[0-9A-Za-z\s-]+$/; // letters, numbers, dashes
  const isValid = token.length > 5 && regex.test(token);

  return isValid ? true : 'Token invalid';
}

module.exports = promptUser;
