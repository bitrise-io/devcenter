---
title: Deploying an iOS app to iTunes Connect
date: 2018-10-26 12:41:22 +0000
redirect_from: []
menu:
  ios-deploy:
    weight: 4

---
You can deploy an app to iTunes Connect (rebranded as App Store Connect) to:

* invite testers on Testflight
* release your app on the App Store

On Bitrise, you can either simply just upload your binary to iTunes Connect or you can also submit it for review.

#### Before you start

Make sure that you have:

* generated an .ipa file locally, on your own machine, at least once
* uploaded all the Developer certificates that are included in the provisioning profile to Bitrise
* uploaded the app's Development Provisioning Profile if you want to use [manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning/) on Bitrise. If you use [auto-provisioning](), you don't need to upload a profile.
* uploaded a Distribution certificate for the app
* uploaded an App Store Provisioning Profile (if you want to use manual provisioning)

Register the app on iTunes Connect. Keep in mind that every time you want to push an app to iTunes Connect, it **must have a unique build and version number** - [increment either or both](/builds/build-numbering-and-app-versioning/) before deploying.

#### Deploying the app

To deploy the app to iTunes Connect, we have two Steps:

* `Deploy to iTunes Connect`
* `Deploy to iTunes Connect - Application Loader`

`Deploy to iTunes Connect - Application Loader` is simple: it simply pushes an .ipa or .pkg binary file to iTunes Connect. With this Step, you **cannot** submit the app for review on the App Store, for example.

![](/img/itunes-connect.png)

With the `Deploy to iTunes Connect` Step, you can:

* submit your app to the App Store for review,
* you can upload apps of three different platforms (iOS, OS X, AppleTVOS)
* tell Bitrise whether you want to upload your screenshots and the app's metadata along with the binary

1. Make sure the `Certificate and profile installer` Step or the `iOS Auto Provision` Step is in your workflow.

   Do NOT use both!
2. Make sure the `Xcode Archive & Export for iOS` Step is in your workflow.
3. Set the `Select method for export` input of the Step to `app-store`.

   The Step will store the path of the exported .ipa file in the $BITRISE_IPA_PATH environment variable.

   ![](/img/app-store-export.png)
4. Add the `Deploy to iTunes Connect` Step to your workflow.
5. Fill the required inputs.
   * **Either the app's Apple ID or its Bundle ID is a required input**. One of the two must be provided.
   * If you set the `Submit for Review` to `true`, the Step will wait for your submission to be processed on iTunes Connect and then submit the given version of the app for review.
   * The default value of the `Skip App Version Update` input is `No`. Change it only if you [incremented the app version](/builds/build-numbering-and-app-versioning/) in another way.
   * If you use an iTunes Connect account that is linked to multiple teams, provide either a **Team ID** or a **Team name**!
6. Start a build.

If all goes well, your app will be submitted to iTunes Connect and you can distribute it via Testflight or via the App Store!