const prompts = require('prompts');

//
// Prompt user for information
//

const questions = [
  {
    name: 'token',
    type: 'text',
    validate: _validateToken,
    message:
      "Your slack token is needed to determine which user's status to change. Please paste your token:",
  },
  {
    type: 'select',
    name: 'time',
    message: 'What time do you want the script to run?',
    choices: [
      { title: '8:45 am', value: '8:45' },
      { title: '8:55 am', value: '8:55' },
      { title: '9:05 am', value: '9:05' },
      { title: '9:15 am', value: '9:15' },
    ],
    initial: 0,
  },
];

async function promptUser() {
  const data = await prompts(questions);
  console.log('data:', data);

  return data;
}

promptUser();

function _validateToken(token) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^[0-9A-Za-z\s\-]+$/; // Letters, numbers, and dashes
  const isValid = token.length > 5 && regex.test(token);

  return isValid ? true : 'Token invalid';
}

module.exports = promptUser;
