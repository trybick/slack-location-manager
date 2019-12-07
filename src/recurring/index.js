require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const calculateEmoji = require('./calculateEmoji');
const storage = require('node-persist');
const { initStorage } = require('../install/saveToDisk');
const handleErrors = require('../util/handleErrors');

//
// Script that cron will call repeatedly
// calculate emoji --> retrieve token --> call Slack API
//

(async () => {
  // Get Emoji
  const emojiRegex = /:.*:/;
  const emoji = await calculateEmoji();
  if (!emoji || !emojiRegex.test(emoji)) {
    return;
  }

  // Get local token
  await initStorage();
  const token = await storage.getItem('token');

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
    .catch(handleErrors);
})();
