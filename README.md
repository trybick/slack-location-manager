# Slack Location Manager

[![npm version](https://badge.fury.io/js/slack-location-manager.svg)](https://www.npmjs.com/package/slack-location-manager)

A command-line tool that sets your slack status for you depending on your location. Run the wizard to create a daily cron job, automating the process for the future.

# Purpose

The team at [F1V](http://f1v.co/) works in different offices depending on the day. We let our team know who is at which office by setting our slack status (e.g. use the 'house' emoji when we're working from home). Once you install this tool, this process will be automated by a daily cron job.

If you're not part of our team and are considering using this, you can create a Slack app in your workspace and get a token from it.

# Install

#### Globally install the package

```bash
npm install -g slack-location-manager
```

#### Setup the cron job

**Important**: A token will be required for first-time setup, see below section [How to get a Token](https://github.com/trybick/slack-location-manager#how-to-get-a-token)

```bash
slm install
```

# Other Commands

```java
slm log

// Outputs the content of most recent cron job log file
```

```java
slm set

// Command that cron will call daily. Use this to test setting your status.
```

```java
slm uninstall

// This will remove the locally stored token and any related cron jobs from your machine
```

# How to Get a Token

Note: you should only have to do this once

- Go to your [workspace apps](https://api.slack.com/apps)
- Click Location Manager
- Go to 'Install App' and click the 'Install App' button, and copy token

<p align="center">
<img src="https://i.imgur.com/xffSGvC.png" alt="drawing" width="600"/>
</p>

# How it Works

#### Install wizard

- User is prompted for token and desired time of day to run script ([prompts](https://github.com/terkelg/prompts), [chalk](https://github.com/chalk/chalk))
- Token is saved locally ([node-persist](https://github.com/simonlast/node-persist))
- Cron job is created ([node-crontab](https://github.com/dachev/node-crontab), [shelljs](https://www.npmjs.com/package/shelljs))

#### Recurring script

- Status emoji is calculated based on IP address location ([ipinfo.io](https://ipinfo.io), [geolib](https://github.com/manuelbieh/geolib))
- Token is retrieved from local storage ([node-persist](https://github.com/simonlast/node-persist))
- API call is made to Slack ([node-slack-sdk](https://github.com/slackapi/node-slack-sdk), [Slack Web API](https://api.slack.com/methods/users.profile.set))

## License

[ISC License](https://github.com/trybick/slack-location-manager/blob/master/LICENSE)
