const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');

console.log('Getting started with Node Slack SDK');

const web = new WebClient(process.env.SLACK_TOKEN);
// The current date
const currentTime = new Date().toTimeString();

(async () => {
  // Use the `auth.test` method to find information about the installing user
  const res = await web.auth.test();
  console.log('res:', res);

  // Find your user id to know where to send messages to
  const userId = res.user_id;

  // Use the `chat.postMessage` method to send a message from this app
  await web.chat.postMessage({
    channel: userId,
    text: `The current time is ${currentTime}`
  });

  console.log('Message posted!');
})();
