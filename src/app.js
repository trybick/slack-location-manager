const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');

dotenv.config();
const web = new WebClient(process.env.SLACK_TOKEN);

(async () => {
  const res = await web.auth.test();
  console.log('res:', res);
  const userId = res.user_id;

  // Post a message test
  // await web.chat.postMessage({
  //   channel: userId,
  //   text: `The current time is ${currentTime}`
  // });

  // Get current status
  // const currentStatus = await web.users.profile.get({});
  // console.log('current status:', currentStatus);

  console.log('Done!');
})();
