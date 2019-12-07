const prompts = require('prompts');

//
// Prompt user for information
//

// RegExp validation in progress
// const reg = new RegExp('/^[a-zA-Z\s\-]+$/')

const questions = [
  {
    name: 'username',
    type: 'text',
    message: 'What is your Slack username?',
    // validate: input => reg.test(input) ? 'Username must be only letters and numbers' : true
  },
  {
    name: 'token',
    type: 'text',
    message: 'What is your Slack token?',
  },
  {
    type: 'select',
    name: 'time',
    message: 'What time do you want the script to run?',
    choices: [
      { title: '8:45 am', value: '8:45' },
      { title: '8:55 am', value: '8:55' },
      { title: '9:05 am', value: '9:05' },
      { title: '9:10 am', value: '9:10' },
      { title: '9:15 am', value: '9:15' },
    ],
    initial: 0,
  },
];

async function promptUser() {
  const data = await prompts(questions);

  return data;
}

promptUser();

module.exports = promptUser;
