---
title: Deploying an iOS app
date: 2018-10-10 14:48:37 +0000
redirect_from: []
published: false

---
You can deploy an iOS app to:

* Bitrise.io (for internal testers)
* devices of external testers
* iTunes Connect (to release the app to Testflight and the App Store)

To deploy an iOS app to any platform, you need:

* [code signing files](/code-signing/ios-code-signing/code-signing/)
* [to archive your Xcode project and export a signed .ipa file](/code-signing/ios-code-signing/create-signed-ipa-for-xcode/)

## Deploying an iOS app to Bitrise.io

Deploy an app to Bitrise to be able to download the .ipa file and install it on devices specified in the app's Development Provisioning Profile. This way your internal testers can easily test the app.

#### Before you start

Make sure that you have:

* generated an .ipa file locally, on your own machine, at least once
* uploaded all the Developer certificates that are included in the provisioning profile to Bitrise
* uploaded the app's Development Provisioning Profile if you want to use [manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning/) on Bitrise
* [registered your testers' devices](/testing/registering-a-test-device/) on Bitrise

#### Deploying the app

1. Make sure the `Certificate and profile installer` Step or the `iOS Auto Provision` Step is in your workflow.

   Do NOT use both!
2. Make sure the `Xcode Archive & Export for iOS` Step is in your workflow.
3. Set the `Select method for export` input of the Step to `development`.
4. Make sure the `Deploy to Bitrise.io` Step is in your workflow.
5. Start a build.
6. When the build is finished, go to the app's `Builds` page and click the latest build.
7. Click the `APPS & ARTIFACTS` tab to find your .ipa file.

And that's it! The file can now be installed on all the devices included in the app's provisioning profile.

## Deploying an iOS app for external testers without Testflight

Before deploying your app to the App Store, you might want to release it to external testers who can test it on their devices outside the development environment. You can do this by exporting an .ipa file with the **ad-hoc** export method.

{% include message_box.html type="important" title="Using Testflight" content="If you wish to invite external testers using Testflight, you CANNOT use the **ad-hoc** export method. You need an .ipa with the **app-store** export method."%}

#### Before you start

Make sure that you have:

* generated an .ipa file locally, on your own machine, at least once
* uploaded all the Developer certificates that are included in the provisioning profile to Bitrise
* uploaded the app's Development Provisioning Profile if you want to use [manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning/) on Bitrise. If you use [auto-provisioning](), you don't need to upload a profile.
* uploaded a Distribution certificate for the app
* uploaded an Ad-hoc Provisioning Profile (if you want to use manual provisioning)

#### Deploying the app

1. Make sure the `Certificate and profile installer` Step or the `iOS Auto Provision` Step is in your workflow.

   Do NOT use both!
2. Make sure the `Xcode Archive & Export for iOS` Step is in your workflow.
3. Set the `Select method for export` input of the Step to `ad-hoc`.
4. Make sure you have the `Deploy to Bitrise.io` Step in your workflow.
5. Start a build.
6. When the build is finished, go to the app's `Builds` page and click the latest build.
7. Click the `APPS & ARTIFACTS` tab to find your .ipa file that you can distribute.

## Deploying an iOS app to iTunes Connect

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

Register the app on iTunes Connect. Keep in mind that every time you want to push an app to iTunes Connect, it **must have a unique build and version number** - increment either or both before deploying.

#### Deploying the app

To deploy the app to iTunes Connect, we have two Steps:

* `Deploy to iTunes Connect`
* `Deploy to iTunes Connect - Application Loader`

`Deploy to iTunes Connect - Application Loader` is simple: it simply pushes an .ipa or .pkg binary file to iTunes Connect. With this Step, you **cannot** submit the app for review on the App Store, for example.

With the `Deploy to iTunes Connect` Step, you can:

* submit your app to the App Store for review,
* you can upload apps of three different platforms (iOS, OS X, AppleTVOS)
* tell Bitrise whether you want to upload your screenshots and the app's metadata along with the binary

1. Make sure the `Certificate and profile installer` Step or the `iOS Auto Provision` Step is in your workflow.

   Do NOT use both!
2. Make sure the `Xcode Archive & Export for iOS` Step is in your workflow.
3. Set the `Select method for export` input of the Step to `app-store`.

   The Step will store the path of the exported .ipa file in the $BITRISE_IPA_PATH environment variable.
4. Add the `Deploy to iTunes Connect` Step to your workflow.
5. Fill the required inputs.
   * **Either the app's Apple ID or its Bundle ID is a required input**. One of the two must be provided.
   * If you set the `Submit for Review` to `true`, the Step will wait for your submission to be processed on iTunes Connect and then submit the given version of the app for review.
   * The default value of the `Skip App Version Update` input is `No`. Change it only if you [incremented the app version](/builds/build-numbering-and-app-versioning/) in another way.
   * If you use an iTunes Connect account that is linked to multiple teams, provide either a **Team ID** or a **Team name**!
6. Start a build.

If all goes well, your app will be submitted to iTunes Connect and you can distribute it via Testflight or via the App Store!