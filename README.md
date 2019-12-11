# Slack Location Manager

A command-line tool that sets your slack status emoji depending on your location. Run the wizard to create a cron job which will run the script daily.

## Made for F1V

This was created for an internal use at F1V. If you're not part of the team and want to use this, you will need to create an app and get a token from it within your workspace.

## Install

#### Globally install the package

```bash
npm install -g slack-location-manager
```

## Use

#### Run the install wizard

This will prompt you for a token and your desired schedule. (**Important**: To get your token, see below [How to get a Token](https://github.com/trybick/slack-location-manager#how-to-get-a-token))

```bash
slm install
```

#### Test the script

This is the command that cron will call daily. You can use this command to test setting your status.

```java
slm set
```

## How to Get a Token

Note: you should only have to do this once. Once completed, everything is automated.

Click **View App** in your Slackbot messages or go [here](https://api.slack.com/apps)

<p align="center">
<img src="https://i.imgur.com/oQ6kJdr.png" alt="drawing" width="600"/>
</p>

Copy your token from the **Install App** section of the App settings

<p align="center">
<img src="https://i.imgur.com/tmkqVGs.png" alt="drawing" width="600"/>
</p>

## Uninstall

This will remove the locally stored token and any related cron jobs from your machine

```bash
slm uninstall
```
