const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');

dotenv.config();

const web = new WebClient(process.env.SLACK_TOKEN);

const currentTime = new Date().toTimeString();

(async () => {
  // Use the `auth.test` method to find information about the installing user
  const res = await web.auth.test();
  console.log('res:', res);

  const userId = res.user_id;

  await web.chat.postMessage({
    channel: userId,
    text: `The current time is ${currentTime}`
  });

  console.log('Message posted!');
})();
