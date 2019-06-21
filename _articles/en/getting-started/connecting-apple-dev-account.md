---
title: Connecting your Apple Developer Account to Bitrise
redirect_from:
- https://devcenter.bitrise.io/getting-started/signing-up/connecting-apple-dev-account/
- "/signing-up/connecting-apple-dev-account"
tag:
- apple
- " builds"
- code-signing
- security
summary: Connecting your Apple Developer Account allows Bitrise to reuse your authentication
  sessions for 30 days so you do not have to manually go through 2FA on every iOS
  deploy.
menu:
  getting-started-main:
    weight: 10
    title: Connecting your Apple Developer Account

---
Connect your Apple Developer Portal account to Bitrise by authenticating your Apple credentials on Bitrise, and allow your apps to use those credentials during the builds. 

## Reasons to connect your account

Connect your Apple Developer account to Bitrise if:

* You want to use our `iOS Auto Provision` Step to [manage provisioning profiles for an iOS application](/code-signing/ios-code-signing/ios-auto-provisioning/).
* You want to upload your app to the App Store, using either our `fastlane` or `Deploy to iTunes Connect` Steps.
* You want to upload metadata, screenshots, or other artifacts using our `fastlane` Step.

{% include message_box.html type="warning" title="Custom Script Steps" content="If you use, for example, a custom Script Step to utilise `fastlane` or to upload your app to the App Store, you will not be able to get past Apple 2FA by connecting your Apple Developer account. This solution only works with the official Steps, such as `fastlane`, `iOS Auto Provision` or `Deploy to iTunes Connect`. "%}

The above Steps all require two-factor authentication, which is mandatory for all Apple Developer accounts. If, during your build, Bitrise needs to access your Apple Developer Portal account, it will have to go through 2FA.

Connecting your Apple Developer account allows Bitrise to reuse your authentication sessions for 30 days so you do not have to manually go through 2FA on every single occasion.

## Connecting your account

To successfully connect your Apple Developer account, and use your Apple Developer credentials in your Bitrise builds, you need to do TWO things:

1. Authenticate your Apple Developer account by providing your Apple credentials on your **Account settings** page. 
2.  Authorize apps to use the data from your Apple Developer account. 

{% include message_box.html type="warning" title="Authorizing the apps" content="It is NOT enough to simply provide your Apple Developer credentials on Bitrise, as described in [Authenticating your Apple Developer account](/getting-started/connecting-apple-dev-account/#authenticating-your-apple-developer-account). Apps will not be able to automatically use your credentials: you need to authorize each app to do so."%} 

### Authenticating your Apple Developer account

1. Log in to [bitrise.io](https://www.bitrise.io).
2. Click on your profile in the upper-right corner of your `Dashboard` and select `Account settings` from the dropdown menu.

   ![](/img/account-settings.jpg)
3. On the menu bar on the left, select `Apple Developer Account`.
4. Provide your credentials in the popup window and click `Store credentials`.

   ![](/img/apple-dev.png)
5. If two-factor authentication is enabled on your Apple Developer account, you will be prompted to provide your verification code. In this case, your authentication will expire in 30 days and you will have to authenticate again!

### Enabling Apple Developer Portal integration

Authorize your app to receive Apple Developer Portal data from Bitrise once your Apple Developer Account is connected to your [bitrise.io](https://www.bitrise.io) account. 

As such, any team member's connected account can be used with an app. The app does NOT necessarily have to use the owner's connected Apple Developer account. 

To authorize the app:

1. Open your project's page on [bitrise.io](https://www.bitrise.io).
2. Select the `Team` tab.
3. Scroll down to the `Connected Apple Developer Portal Account` section.

   ![](/img/bitrise_test_repo_-_Bitrise-1.png)
4. Select the account you want to use from the dropdown menu.
5. Test the connection to make sure it works. 

If everything goes well, you should be able to use the connected account's Apple Developer credentials in the app's builds.