---
title: Deploying an iOS app
date: 2018-10-10 14:48:37 +0000
redirect_from: []
published: false

---
You can deploy an iOS app to:

* Bitrise.io
* specific devices
* Testflight and the App Store

To deploy an iOS app to any platform, you need:

* [code signing files](/code-signing/ios-code-signing/code-signing/)
* [to archive your Xcode project and export a signed .ipa file](/code-signing/ios-code-signing/create-signed-ipa-for-xcode/)

## Deploying an iOS app to Bitrise.io

Deploy an app to Bitrise to be able to download the .ipa file and install it on devices specified in the app's Development Provisioning Profile. This way your internal testers can easily test the app. 

Before you start, make sure that you have:

* uploaded all the Developer certificates that are included in the provisioning profile to Bitrise 
* generated an .ipa file locally, on your own machine  