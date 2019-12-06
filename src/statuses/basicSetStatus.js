const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');

dotenv.config();
const web = new WebClient(process.env.CELTIC_TOKEN); // my private slack workspace

(async () => {
  const res = await web.auth.test();
  const userId = res.user_id;

  // Set custom status (personal workspace)
  await web.users.profile
    .set({
      user: userId,
      profile: {
        status_text: 'boom',
        status_emoji: ':mountain_railway:',
        status_expiration: 0
      }
    })
    .then(res => console.log('Response:', res))
    .catch(err => console.log('Error:', err.data.error));
})();
