const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');
const getCity = require('./getCity');

//
// This is the script that cron will call repeatedly
//

// dotenv.config();
// const slack = new WebClient(process.env.CELTIC_USER_2_TOKEN); // Token determines the user

(async () => {
  const city = await getCity();
  console.log('city:', city)

  // const userId = await slack.auth.test().userId;

  // await slack.users.profile
  //   .set({
  //     user: userId,
  //     profile: {
  //       status_text: 'boom',
  //       status_emoji: ':mountain_railway:',
  //       status_expiration: 0,
  //     },
  //   })
  //   .then(res => console.log('Response:', res))
  //   .catch(err => console.log('Error:', err.data.error));
})();
