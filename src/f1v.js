
const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');

dotenv.config();
const web = new WebClient(process.env.F1V_TOKEN);

(async () => {
  const res = await web.auth.test();
  // console.log('res:', res)

  // Get logs
  const logs = await web.team.accessLogs();
  console.log('Logs: ', logs);
})();
