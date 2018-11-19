---
title: Sample apps-draft
date: 2018-10-30 14:13:21 +0000
redirect_from: []
published: false

---
Bitrise maintains a couple of sample apps to demonstrate the   This guide aims to remedy some pain points you might experience when configuring your workflow.

For each sample app, we provide a primary and deploy workflow, these contain the most frequent and recommended step to use with the respective platform.

These workflows don't contain any signing certificates, provisioning profiles or keystore files, therefore if you run the builds you will see a code signing error message. We hope next time you encounter the same error message with your own build, you will remember to upload your code signing files. If you need more help on code signing, check out our [Android](/code-signing/android-code-signing/android-code-signing-procedures/) and [iOS](/code-signing/ios-code-signing/code-signing/) guides.

{% include message_box.html type="note" title="Safety comes first when code signing" content="Irrespective of public or private apps, your code signing files are always protected from curious eyes!

* Files uploaded to the `Code signing` tab are not accessible to people outside of your team!
* Even if you generate a public app and share the build with someone, Certificate and provisioning profile URLs are redacted in build logs .
* If you have exported an encrypted profile from Xcode, you can use password protection for that file on our `Code Signing` tab as well.
* One last note: the `Expose for Pull Request` toggle in `Secrets` tab is by default disabled for public apps as secrets included in PR builds can be accessed by anyone who can open a pull request. "%}

All the sample apps we provide in this guide are monitored by our developers on a weekly basis. All apps are scheduled to run between 4 and 5 on every Monday morning to see if the VM updates happening on Saturdays have disrupted the sample apps. If so, our developers fix the sample apps so that you have them as reliable reference.

* carthage-sample-app
* xamarin-sample-app
* ionic-sample-app
* cordova-sample-app
* reactnative-sample-app
* fastlane-ios-sample-app
* fastlane-android-sample-app
* fastlane-snappy-sample-app
* android-sample-app

quick start guide-ban megemliteni

## About triggers

With every sample app, the primary workflow gets triggered when code is pushed to the Feature branch. If code is pushed content to the develop branch, then the deploy workflow gets triggered.

![](/img/triggers-sample-app.png)

Learn more about triggering builds [here](/builds/triggering-builds/triggering-builds/).

## ios-sample-app

* If you use the `Xcode test for iOS` Step in you workflow, we suggest you to include our `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step. This way you can check test results (`All`, `Failing` and `Passing`) in the `APPS & ARTIFACTS` tab on your Build's page.

![](/img/sample-app-ios.png)

![](/img/xcode-test-results.png)

* With iOS projects, we advise you to add our `Run CocoaPods install` step to your primary workflow to make sure all your iOS dependencies are installed.

{% include message_box.html type="info" title="More on iOS" content="

* [Getting started with iOS apps](/getting-started/getting-started-with-ios-apps/)
* [About iOS code signing with troubleshooting](/code-signing/ios-code-signing/code-signing/)
* [About frequent iOS issues](/troubleshooting/frequent-ios-issues/)
* [About device testing for iOS](/testing/device-testing-for-ios/)
* [About iOS deployment](/deploy/ios-deploy/introduction-to-deploying-ios-apps/)"%}

## android-sample-app

* In this sample app we show you how to build your primary workflow to perform unit and UI tests and have the results deployed to your your build's `APPS & ARTIFACTS` - all test reports at your fingertips to help you fix any issues in your project before marketplace deployment. If you select `deploy` at the `WORKFLOW` drop-down menu, you will see all the steps necessary to build, code sign and deploy your app. We advise you to include all testing related steps in your primary workflow and have the code signing and build steps in your deploy workflow. The only exception here is our `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step which deploys all the test results and other artifacts to the `APPS & ARTIFACTS` tab of your Build's page on bitrise.io so you need this Step in your primary workflow!

{% include message_box.html type="info" title="More about Android" content="

* [Getting started with Android apps](/getting-started/getting-started-with-android-apps/)
* [About Android code signing](/code-signing/android-code-signing/android-code-signing-procedures/)
* [About Android build steps](/tips-and-tricks/android-tips-and-tricks/)
* About [Android UI ](/testing/device-testing-for-android/)and [Android unit testing](/testing/android-run-a-unit-test/)
* [About Android deployment](/deploy/android-deploy/deploying-android-apps/)" %}

## carthage-sample-app

If you use our `Carthage` Step to manage your dependencies instead of `Run Cocoapods install`, make sure you add your `Github Personal Access Token` input in the step input field as a [secret env var](/builds/env-vars-secret-env-vars/#about-secrets).

![](/img/carthage.png)

If you reveice the following error message, the token is surely missing:

      API rate limit exceeded for 208.52.166.154. (But here’s the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.

Make sure you insert the step BEFORE any building step in your deploy workflow.

## xamarin-sample-app

* `NuGet restore` Step is the recommended dependency manager for your [Xamarin](/getting-started/getting-started-with-xamarin-apps/) project.

{% include message_box.html type="info" title="More on Xamarin" content="

* [Getting started with Xamarin apps](/getting-started/getting-started-with-xamarin-apps/) "%}

## ionic-sample-app and cordova-sample-app

* `Generate cordova build configuration` step is a configuration step which generates the build.json file on which the building process is based.

{% include message_box.html type="info" title="Learn more about Ionic and Cordova" content=" 

* [Getting started with Xamarin apps](/getting-started/getting-started-with-ionic-cordova-apps/)" %}

## reactnative-sample-app

run npm command step and run yarn command steps:  either of them, 1. install or it runs a jest stest if you type test.

plusz install react native step

react native bundle step it bundles your app ez az install react native utan szokott jonni,nem mindig szokott kelleni, valamikor kell valamikor nem. oszzebundeli a link from bazsi.

{% include message_box.html type="info" title="More on React Native" content="
This is my **content**, full of **INFORMATION**.

It is _so_, \`very\` INFORMATIVE.
"%}

## expo-sample-app

If your React Native comes with an Expo framework, it does not contain any native elements. This sample app shows a primary and deploy workflow, where the primary workflow contains our `[BETA] Expo Eject` and `Recreate user schemes` Steps. `[BETA] Expo Eject` Step generates the necessary native elements to your projects using the [Expo Development CLI.](https://docs.expo.io/versions/latest/introduction/installation#local-development-tool-expo-cli)

{% include message_box.html type="important" title="Do you have an Expo account?" content=" This step requires your Expo username and password. Head over to Expo to create an account or keep them handy when setting the `[BETA] Expo Eject` Step input fields.

![](/img/expo-eject.png)" %}

1. Select the `Expo CLi version`.
2. In the case of a React Native project **using Expo Kit** library:
   * add your Expo username
   * add your Expo password for your Expo account. Note, this is sensitive information, so make sure you set it as a [secret env var](/builds/env-vars-secret-env-vars/#about-secrets/).
     In both cases, the Step will run `expo eject --eject-method expoKit`.
3. `Run expo publish after eject?` With this set to `yes` or `no` you can control if the Step should automatically publish your app on Expo.io once it gets ejected.
4. `React Native version to set in package.json` Here you can add the version if it is missing from your package.json file.
5. `Recreate user schemes` Step: Platform-specific files get generated. In the case of an iOS project: you need to use SHARED schemes. To fulfill this requirement, you either take care of it in XCode or leave it to `Recreate user schemes`. When running your build, the step scans your project and lists out the shared schemes, if any, and recreates shared ones if those have been missing from your project (based on your Xcode project file)

   ![](/img/recreate=schemes.png)
6. 

## fastlane-ios-sample-app and fastlane-android-sample-app

* You can run all your existing fastlane lanes using our `fastlane` step:

![](/img/fastlane-lane.png)

## fastlane-snappy-sample-app

This workflow is configured to create screenshots of the unit test so that you can check the output in the `APPS & ARTIFACTS` tab of your Build's page.

![](/img/screenshot-snappy.png)