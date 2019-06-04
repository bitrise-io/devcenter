---
title: Apple 2FA
redirect_from: []
date: 2019-03-29 13:45:36 +0000
published: false

---
{% include message_box.html type="important" title="Two-factor authentication" content="Two-factor authentication (2FA) is mandatory for all Apple Developer Portal accounts. If, during your build, Bitrise needs to access your Apple Developer Portal account, it will have to go through 2FA.

To make this work, [connect your Apple Developer Account to Bitrise](/getting-started/signing-up/connecting-apple-dev-account/). That allows Bitrise to reuse your authentication sessions for 30 days so you do not have to manually go through 2FA on every single occasion."%}

Two-factor authentication (2FA) is mandatory for all Apple Developer Portal accounts. If, during your build, Bitrise needs to access your Apple Developer Portal account, it will have to go through 2FA.

To make this work, connect your Apple Developer Account to Bitrise. That allows Bitrise to reuse your authentication sessions for 30 days so you do not have to manually go through 2FA on every single occasion.

Connect your Apple Developer account to Bitrise if:

* You want to use our `iOS Auto Provision` Step to [manage provisioning profiles for an iOS application](/code-signing/ios-code-signing/ios-auto-provisioning/).
* You want to upload your app to the App Store, using either our `fastlane` or `Deploy to iTunes Connect` Steps. 
* You want to upload metadata, screenshots, or other artifacts using our `fastlane` Step. 

{% include message_box.html type="warning" title="Custom Script Steps" content="If you use, for example, a custom Script Step to utilise `fastlane` or to upload your app to the App Store, you will not be able to get past Apple 2FA by connecting your Apple Developer account. This solution only works with the official Steps, such as `fastlane`, `iOS Auto Provision` or `Deploy to iTunes Connect`. "%} 

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