---
title: iOS deployment
date: 2018-10-26T12:49:32.000+00:00
redirect_from: "/ios-deploy/introduction-to-deploying-ios-apps/"
tag:
- ios
- deploy
- app store
summary: 'Find out the basics about deploying your iOS app using Bitrise: where you
  can deploy, what files you need, how to configure your app for deployment. '
menu:
  deploy-main:
    identifier: ios-deploy
    weight: 2

---
Once you built your app and ran unit tests and UI tests on it, it's time to deploy it.

To deploy an iOS app to any platform, you need:

* [code signing files](/code-signing/ios-code-signing/code-signing/)
* [to archive your Xcode project and export a signed .ipa file](/code-signing/ios-code-signing/create-signed-ipa-for-xcode/)

Our guides delve into the specifics of these two basic requirements and show how to use our Steps to deploy the app in the exact way you want to!

* [Deploying an iOS app to Bitrise.io (for internal testers)](/deploy/ios-deploy/deploying-an-ios-app-to-bitrise-io/)
* [Deploying an iOS app for external testing](/deploy/ios-deploy/deploying-an-ios-app-for-external-testing/)
* [Deploying an iOS app to iTunes Connect](/deploy/ios-deploy/deploying-an-ios-app-to-itunes-connect/)