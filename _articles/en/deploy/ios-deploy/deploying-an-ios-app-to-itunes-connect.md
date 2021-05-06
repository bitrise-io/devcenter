---
title: Deploying an iOS app to iTunes Connect
date: '2018-10-26T12:41:22.000+00:00'
redirect_from: []
tag:
- itunes-connect
- app-store
- ios
- deploy
description: You can deploy an app to iTunes Connect (rebranded as App Store Connect)
  to invite testers on Testflight or to release your app on the App Store.
summary: ''
menu:
  ios-deploy:
    weight: 5

---
{% include message_box.html type="info" title="Deploying with Ship" content="This guide talks about deploying with the official Bitrise deploy Steps. We recommend checking out Ship, our deployment solution that aims to save you a lot of headache in publishing your apps: [Deploying with Ship](/deploy/ship/)."%}

You can deploy an app to iTunes Connect (rebranded as App Store Connect) to:

* Invite testers on Testflight.
* Release your app on the App Store.

On Bitrise, you can either simply just upload your binary to iTunes Connect or you can also submit it for review.

{% include message_box.html type="important" title="Two-factor authentication" content="Two-factor authentication (2FA) is mandatory for all Apple Developer Portal accounts. If, during your build, Bitrise needs to access your Apple Developer Portal account, it will have to go through 2FA.

To make this work, [connect your Apple Developer Account to Bitrise](/getting-started/connecting-to-services/configuring-bitrise-steps-that-require-apple-developer-account-data/). That allows Bitrise to reuse your authentication sessions for 30 days so you do not have to manually go through 2FA on every single occasion."%}

#### Before you start

Make sure that you have:

* Connected your Apple Developer Account to Bitrise.
* Generated an .ipa file locally, on your own machine, at least once.
* Uploaded all the Developer certificates that are included in the provisioning profile to Bitrise.
* Uploaded the app's Development Provisioning Profile if you want to use [manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning/) on Bitrise. If you use [auto-provisioning](/code-signing/ios-code-signing/ios-auto-provisioning/), you don't need to upload a profile.
* Uploaded a Distribution certificate for the app.
* Uploaded an App Store Provisioning Profile (if you want to use manual provisioning).

Register the app on iTunes Connect. Keep in mind that every time you want to push an app to iTunes Connect, it must have a unique build and version number - [increment either or both](/builds/build-numbering-and-app-versioning/) before deploying.

#### Deploying the app

To deploy the app to iTunes Connect, we have two Steps:

* **Deploy to iTunes Connect**
* **Deploy to iTunes Connect - Application Loader**

**Deploy to iTunes Connect - Application Loader** is simple: it simply pushes an .ipa or .pkg binary file to iTunes Connect. With this Step, you cannot submit the app for review on the App Store, for example.

![{{ page.title }}](/img/itunes-connect.png)

With the **Deploy to iTunes Connect** Step, you can:

* Submit your app to the App Store for review.
* You can upload apps of three different platforms (iOS, OS X, AppleTVOS).
* Tell Bitrise whether you want to upload your screenshots and the app's metadata along with the binary.

1. Make sure the **Certificate and profile installer** Step or the **iOS Auto Provision with App Store Connect API** Step is in your Workflow.

   Do NOT use both!
2. Make sure the **Xcode Archive & Export for iOS** Step is in your Workflow.
3. Set the **Select method for export** input of the Step to `app-store`.

   The Step will store the path of the exported .ipa file in the $BITRISE_IPA_PATH Environment Variable.

   ![{{ page.title }}](/img/app-store-export.png)
4. Add the `Deploy to iTunes Connect` Step to your Workflow.
5. Fill the required inputs.
   * Either the app's Apple ID or its Bundle ID is a required input. One of the two must be provided.
   * If you set the **Submit for Review** to `true`, the Step will wait for your submission to be processed on iTunes Connect and then submit the given version of the app for review.
   * The default value of the **Skip App Version Update** input is `No`. Change it only if you [incremented the app version](/builds/build-numbering-and-app-versioning/) in another way.
   * If you use an iTunes Connect account that is linked to multiple teams, provide either a Team ID or a Team name!
6. Start a build.

If all goes well, your app will be submitted to iTunes Connect and you can distribute it via Testflight or via the App Store!

{% include banner.html banner_text="Deploy to iTunes Connect" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}