const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');

dotenv.config();
const web = new WebClient(process.env.SLACK_TOKEN);

(async () => {
  const res = await web.auth.test();
  const userId = res.user_id;

  // Set custom status
  const custom = await web.users.profile.set({
    profile: {
      status_text: 'riding a train',
      status_emoji: ':mountain_railway:',
      status_expiration: 0
    }
  });
  console.log('custom:', custom);

  console.log('Done!');
})();

// Post a message test
// await web.chat.postMessage({
//   channel: userId,
//   text: `The current time is ${currentTime}`
// });

// Get current status
// const currentStatus = await web.users.profile.get({});
// console.log('current status:', currentStatus);
