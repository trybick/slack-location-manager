require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const calculateEmoji = require('./calculateEmoji');
const storage = require('node-persist');
const os = require('os');
const handleErrors = require('../util/handleErrors');

//
// This is the script that cron will call repeatedly
//

(async () => {
  // Get Emoji
  const emojiRegex = /:.*:/;
  const emoji = await calculateEmoji();
  if (!emoji || !emojiRegex.test(emoji)) {
    return;
  }

  // Get local Token
  const localName = os.userInfo().username;
  const directory = `/Users/${localName}/Documents/slack-status-scheduler`;

  await storage
    .init({
      dir: directory,
    })
    .catch(handleErrors);

  const token = await storage.getItem('token');
  console.log('token:', token)

  // Call Slack API
  const slack = new WebClient(token);
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
