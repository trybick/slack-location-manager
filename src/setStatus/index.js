#! /usr/bin/env node
require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const calculateEmoji = require('./calculateEmoji');
const storage = require('node-persist');
const { initStorage } = require('../install/saveToDisk');
const { handleErrors, validateRetrievedToken } = require('../util/handleErrors');
const { handleSetExit, handleSetSuccess } = require('./handleSetCases');

//
// Script that cron will call to set users's status
// calculate emoji --> retrieve token --> call Slack API
//

async function setStatus() {
  const emojiRegex = /:.*:/;
  const emoji = await calculateEmoji();
  if (!emoji || !emojiRegex.test(emoji)) {
    handleSetExit();
    return;
  }

  await initStorage();
  const token = await storage
    .getItem('token')
    .then(validateRetrievedToken)
    .catch(handleErrors);

  const slack = new WebClient(token);
  const { userId } = await slack.auth.test();
  const midnight = new Date(new Date().setHours(23, 59, 0, 0)) / 1000;

  await slack.users.profile
    .set({
      user: userId,
      profile: {
        status_text: '',
        status_emoji: emoji,
        status_expiration: midnight,
      },
    })
    .then(handleSetSuccess)
    .catch(handleErrors);
}

module.exports = setStatus;
