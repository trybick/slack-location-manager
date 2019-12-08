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
  const emojiRegex = /:.*:/;
  const emoji = await calculateEmoji();
  if (!emoji || !emojiRegex.test(emoji)) {
    return;
  }

  await initStorage();
  const token = await storage.getItem('token');

  const slack = new WebClient(token);
  const { userId } = await slack.auth.test();
  const expiration = Date.now() / 1000 + 36000; // in 10 hours

  await slack.users.profile
    .set({
      user: userId,
      profile: {
        status_text: '',
        status_emoji: emoji,
        status_expiration: expiration,
      },
    })
    .then(res => console.log('Response:', res))
    .catch(handleErrors);
})();
