---
title: Connecting your Apple Developer Account to Bitrise
redirect_from:
- "/signing-up/connecting-apple-dev-account"
menu:
  signing-up:
    weight: 6

---
You can authenticate your Apple Developer Account on Bitrise and integrate the Apple Developer Portal with your Bitrise project. This allows you to use our `iOS Auto Provisioning` step which makes managing Provisioning Profiles for iOS applications a lot easier!

All you need is a [bitrise.io](https://www.bitrise.io) account and a valid Apple Developer Account.

### Authenticating your Apple Developer Account on Bitrise

1. Log in to [bitrise.io](https://www.bitrise.io).
2. Click on your profile in the upper-right corner of your `Dashboard` and select `Account settings` from the dropdown menu.

   ![](/img/account-settings.jpg)
3. On the menu bar on the left, select `Apple Developer Account`.
4. Provide your credentials in the popup window and click `Store credentials`.

   ![](/img/apple-dev.png)
5. If two-factor authentication is enabled on your Apple Developer account, you will be prompted to provide your verification code. In this case, your authentication will expire in 30 days - Bitrise will prompt you before that happens!

### Enabling Apple Developer Portal integration

You can authorize your project to receive Apple Developer Portal data from Bitrise once your Apple Developer Account is connected to your [bitrise.io](https://www.bitrise.io) account.

1. Open your project's page on [bitrise.io](https://www.bitrise.io).
2. Select the `Team` tab.
3. Select your account in the `Connected Apple Developer Portal Account` menu at the bottom of the page.