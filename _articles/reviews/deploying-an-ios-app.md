---
title: Deploying an iOS app
date: 2018-10-10 14:48:37 +0000
redirect_from: []
published: false

---
You can deploy an iOS app to:

* Bitrise.io
* external testers and the App Store

To deploy an iOS app to any platform, you need:

* [code signing files](/code-signing/ios-code-signing/code-signing/)
* [to archive your Xcode project and export a signed .ipa file](/code-signing/ios-code-signing/create-signed-ipa-for-xcode/)

## Deploying an iOS app to Bitrise.io

Deploy an app to Bitrise to be able to download the .ipa file and install it on devices specified in the app's Development Provisioning Profile. This way your internal testers can easily test the app. 

Before you start, make sure that you have:

* uploaded all the Developer certificates that are included in the provisioning profile to Bitrise 
* generated an .ipa file locally, on your own machine, at least once
* uploaded the app's Development Provisioning Profile if you want to use [manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning/) on Bitrise

1. Make sure the `Certificate and profile installer` Step is in your workflow. 
2. Make sure you have the `Xcode Archive & Export for iOS` Step in your workflow.
3. Set the `Select method for export` input of the Step to `development`. 
4. Make sure you have the `Deploy to Bitrise.io` Step in your workflow. 
5. Start a build. 
6. When the build is finished, go to the app's `Builds` page and click the latest build.
7. Click the `APPS & ARTIFACTS` tab to find your .ipa file. 

And that's it! The file can now be installed on all the devices [registered to Bitrise](/testing/registering-a-test-device/) - if the app's provisioning profile also includes those devices, of course. 

## Deploying an iOS app to the App Store