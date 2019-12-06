const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
const web = new WebClient(process.env.F1V_TOKEN);

// Import hard-coded data
const file = './logs/2019-11-24T00:43:21.915Z.json';
const data = JSON.parse(fs.readFileSync(file));

(async () => {
  const res = await web.auth.test();
  console.log('res:', res)
  const userId = res.user_id; // user ID associated with token

  // Set status of others
  await web.users.profile
    .set({
      user: 'UJSRE722U',
      profile: {
        status_text: 'riding a bus',
        status_emoji: ':mountain_railway:',
        status_expiration: 0
      }
    })
    .then(res => console.log('Response:', res))
    .catch(err => console.log('Error:', err.data.error));
})();
