const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');

dotenv.config();
const web = new WebClient(process.env.SLACK_TOKEN);

(async () => {
  const res = await web.auth.test();
  const userId = res.user_id;

  // Set custom status
  const newStatus = await web.users.profile.set({
    user: userId,
    profile: {
      status_text: 'riding a bus',
      status_emoji: ':mountain_railway:',
      status_expiration: 0
    }
  });
  console.log('New status set to:', newStatus.profile.status_text);
})();
