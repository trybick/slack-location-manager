require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const calculateEmoji = require('./calculateEmoji');

//
// This is the script that cron will call repeatedly
//

(async () => {
  // Get local Token

  // Get Emoji
  const emoji = await calculateEmoji();

  // Slack API
  const slack = new WebClient(process.env.CELTIC_USER_2_TOKEN);
  const { userId } = await slack.auth.test();

  await slack.users.profile
    .set({
      user: userId,
      profile: {
        status_text: '',
        status_emoji: emoji,
        status_expiration: 36000, // 10 hours
      },
    })
    .then(res => console.log('Response:', res))
    .catch(err => console.log('Error:', err.data.error));
})();
