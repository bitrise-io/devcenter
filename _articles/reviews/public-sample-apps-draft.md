---
title: Public sample apps-draft
date: 2018-10-30 14:13:21 +0000
redirect_from: []
published: false

---
Bitrise public sample apps are available for your compare your project with This guide aims to remedy some pain points you might experience when configuring your workflow. With the help of our Bitrise public sample apps collection, we will demonstrate how workflows should be configured, and what a successfully run build looks like.

For each sample public app we provide a primary and deploy workflow, these contain the most frequent and recommended step to use with the respective platform.

These workflows don't contain any signing certificates, provisioning profiles or keystore files. If you run the builds and see the error message they throw due to missing code signing files, you'll remember the next time to upload them. 

{% include message_box.html type="note" title="Up-to-date sample apps" content=" All the sample apps we provide in this guide are monitored by our developers on a weekly basis. All apps are scheduled to run between 4 and 5 on every Monday morning to see if the VM updates happening on Saturdays have disrupted the sample apps. If so, our developers fix the sample apps so that you have them as reliable reference."%}

* carthage-sample-app
* xamarin-sample-app
* ionic-sample-app
* cordova-sample-app
* reactnative-sample-app
* fastlane-ios-sample-app
* fastlane-android-sample-app
* fastlane-snappy-sample-app
* android-sample-app

## About triggers

With every public sample app, the primary workflow gets triggered when code is pushed to the Feature branch. If code is pushed content to the develop branch, then the deploy workflow gets triggered.

![](/img/triggers-sample-app.png)

Learn more about triggering builds [here](/builds/triggering-builds/triggering-builds/).

## ios-sample-app

* If you use the `Xcode test for iOS` Step in you workflow, we suggest you to include our `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step. This way you can check the test results (`All`, `Failing` and `Passing`) in the `APPS & ARTIFACTS` tab on your Build's page.

![](/img/sample-app-ios.png)

![](/img/xcode-test-results.png)

* You don't have to sacrifice safety when developing public iOS apps. Your signing certificates and provisioning profiles are safe from curious eyes in our Code Signing tab since the tab is not accessible for non-team members. Certificate and provisioning profile URLs are redacted in build logs. Do not expose your secret env vars with the `Expose for Pull Requests?` toggle.
* With iOS projects, we advise you to add our `Run CocoaPods install` step to your primary workflow to make sure all your iOS dependencies are installed.

{% include message_box.html type="info" title="More on iOS" content="

* Let's [get started with iOS apps](/getting-started/getting-started-with-ios-apps/)
* About [iOS code signing ](/code-signing/ios-code-signing/code-signing/)with troubleshooting
* About [frequent iOS issues](/troubleshooting/frequent-ios-issues/)
* About [device testing for iOS](/testing/device-testing-for-ios/)
* About [iOS deployment](/deploy/ios-deploy/introduction-to-deploying-ios-apps/)"%}

## android-sample-app

* We advise you to include all testing related steps in your primary workflow and have the code signing and build steps in your deploy workflow. The only exception here is our `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step which deploys all the test results and other artifacts to the `APPS & ARTIFACTS` tab of your Build's page on bitrise.io so you need this Step in your primary workflow!

{% include message_box.html type="info" title="More about Android" content="

* Let's [get started with Android apps](/getting-started/getting-started-with-android-apps/)
* [About Android code signing](/code-signing/android-code-signing/android-code-signing-procedures/)
* [About Android build steps](/tips-and-tricks/android-tips-and-tricks/)
* About [Android UI ](/testing/device-testing-for-android/)and [Android unit testing](/testing/android-run-a-unit-test/)
* About [Android deployment](/deploy/android-deploy/deploying-android-apps/)" %}

## carthage-sample-app

Our `Carthage` Step is a iOS dependency manager.

* Make sure you add your `Github Personal Access Token` input in the step input field as a secret, otherwise the build will throw the following error message:

      API rate limit exceeded for 208.52.166.154. (But here’s the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.

  Make sure you insert the step BEFORE any building step in your deploy workflow.

## xamarin-sample-app

* `NuGet restore` Step is the recommended dependency manager for your [Xamarin](/getting-started/getting-started-with-xamarin-apps/) project.

## ionic-sample-app and cordova-sample-app

* `Generate cordova build configuration` step is a configuration step which generates the build.json file on which the building is based.

{% include message_box.html type="info" title="Learn more about Ionic and Cordova" content=" For more information on code signing Ionic or Cordova, read this [guide](/code-signing/ios-code-signing/ionic-cordova-code-signing/). For more information on code signing Ionic or Cordova, read this guide." %}

## reactnative-sample-app

run npm command step and run yarn command steps:  either of them, 1. install or it runs a jest stest if you type test.

plusz install react native step

react native bundle step it bundles your app ez az install react native utan szokott jonni,nem mindig szokott kelleni, valamikor kell valamikor nem. oszzebundeli a link from bazsi.

## expo-sample-app

If your React Native comes with an Expo framework, it does not contain any native elements. This sample app shows an primary and deploy workflow, where the primary workflow contains our `[BETA] Expo Eject` and `Recreate user schemes` Steps. `[BETA] Expo Eject` Step generates the necessary native elements to your projects using the [Expo Development CLI.](https://docs.expo.io/versions/latest/introduction/installation#local-development-tool-expo-cli)

{% include message_box.html type="important" title="Do you have an Expo account?" content=" This step requires your Expo username and password. Head over to Expo to create an account or keep them handy when setting the `[BETA] Expo Eject` Step input fields.

![](/img/expo-eject.png)" %}

1. Select the `Expo CLi version`.
2. In the case of a React Native project **using Expo Kit** library:
   * add your Expo username
   * add your Expo password for your Expo account. Note, this is sensitive information, so make sure you set it as a [secret env var](/builds/env-vars-secret-env-vars/#about-secrets/).
     In both cases, the Step will run `expo eject --eject-method expoKit`.
3. `Run expo publish after eject?`
4. `React Native version to set in package.json`

`Recreate user schemes`

1. 

## fastlane-ios-sample-app and fastlane-android-sample-app

## fastlane-snappy-sample-app

This workflow is configured to create screenshots of the unit test so that you can check the output in the `APPS & ARTIFACTS` tab of your Build's page.

![](/img/screenshot-snappy.png)