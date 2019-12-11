# Slack Location Manager

[![npm version](https://badge.fury.io/js/slack-location-manager.svg)](https://www.npmjs.com/package/slack-location-manager)

A command-line tool that sets your slack status for you depending on your location. Run the wizard to create a daily cron job, and then forget about it.

## Purpose

The team at [F1V](http://f1v.co/) works in different offices depending on the day. We let our team know who is at which office by setting our slack status (e.g. use the 'house' emoji when we're working from home). Once you install this script, this process will be automated by a daily cron job.

This was created for an internal use at F1V. If you're not part of the team and want to use this, you will need to create a Slack app your workspace and get a token from it.

## How to Use

#### Globally install the package

```bash
npm install -g slack-location-manager
```

#### Run the install wizard

**Important**: A token will be required for first-time setup, see below [How to get a Token](https://github.com/trybick/slack-location-manager#how-to-get-a-token)

```bash
slm install
```

#### Test run the script

This is the command that cron will call daily. You can use this command to test setting your status.

```java
slm set
```

## Uninstall

This will remove the locally stored token and any related cron jobs from your machine

```bash
slm uninstall
```

## How it Works

#### Install wizard

- User is prompted for token and desired time of day to run script ([prompts](https://github.com/terkelg/prompts), [chalk](https://github.com/chalk/chalk))
- Token is saved locally ([node-persist](https://github.com/simonlast/node-persist))
- Cron job is created ([node-crontab](https://github.com/dachev/node-crontab))

#### Recurring script

- Status emoji is calculated based on IP address location ([ipinfo.io](https://ipinfo.io), [geolib](https://github.com/manuelbieh/geolib))
- Token is retrieved from local storage ([node-persist](https://github.com/simonlast/node-persist))
- API call is made to Slack ([node-slack-sdk](https://github.com/slackapi/node-slack-sdk), [Slack Web API](https://api.slack.com/methods/users.profile.set))

## How to Get a Token

Note: you should only have to do this once. Once completed, everything is automated.

Click **View App** in your Slackbot message that was sent to you or click on Location Manager [here](https://api.slack.com/apps) (might have to sign in):

<p align="center">
<img src="https://i.imgur.com/oQ6kJdr.png" alt="drawing" width="600"/>
</p>

Your token can be found in the **Install App** section of the app's settings:

<p align="center">
<img src="https://i.imgur.com/xffSGvC.png" alt="drawing" width="600"/>
</p>

## License

[ISC License](https://github.com/trybick/slack-location-manager/blob/master/LICENSE)
