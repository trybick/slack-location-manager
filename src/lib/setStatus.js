const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');

//
// This is the script that cron will call repeatedly
//


// Todo:
// Add IP address conditions for status

dotenv.config();
const web = new WebClient(process.env.CELTIC_USER_2_TOKEN); // Token determines the user

// Import token from local storage
const ip=$(curl -s https://ipinfo.io/ip)
const city=$(curl -s https://ipvigilante.com/${ip} | /usr/local/bin/jq ".data.city_name")

(async () => {
  const res = await web.auth.test();
  const userId = res.user_id;

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
