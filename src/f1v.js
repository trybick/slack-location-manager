const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
const web = new WebClient(process.env.F1V_TOKEN);

const saveDataToFile = data => {
  const path = `./logs/${new Date().toJSON()}.json`;
  fs.writeFile(path, data, err => {
    if (err) throw err;
    console.log('The file was saved to:', path);
  });
};

(async () => {
  // Get logs
  await web.team
    .accessLogs()
    .then(res => {
      saveDataToFile(JSON.stringify(res, null, 2));
    })
    .catch(err => console.log('Error:', err));
})();
