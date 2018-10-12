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
2. Make sure you have the `Xcode Archive & Export for iOS` Step in your workflow.
3. Set the `Select method for export` input of the Step to `development`. 
4. Make sure you have the `Deploy to Bitrise.io` Step in your workflow. 
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
* uploaded the app's Development Provisioning Profile if you want to use [manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning/) on Bitrise

#### Deploying the app

1. Make sure the `Certificate and profile installer` Step or the `iOS Auto Provision` Step is in your workflow. 

   Do NOT use both! 
2. Make sure you have the `Xcode Archive & Export for iOS` Step in your workflow.
3. Set the `Select method for export` input of the Step to `ad-hoc`. 
4. Make sure you have the `Deploy to Bitrise.io` Step in your workflow. 
5. Start a build. 
6. When the build is finished, go to the app's `Builds` page and click the latest build.
7. Click the `APPS & ARTIFACTS` tab to find your .ipa file that you can distribute. 

## Deploying an iOS app to iTunes Connect