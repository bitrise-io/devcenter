---
tag: []
title: Getting started with React Native apps - makeover
redirect_from: []
summary: ''
published: false

---
You can easily set up and configure your React Native project on Bitrise. Your React Native repo can consists of an Android and an iOS project so configurations should be done as you would normally do with Android and iOS apps. When running a React Native project, you will see that first an Android, then an iOS build gets built. If your organization has more than one concurrency, you can have Android and iOS builds run simultaneously. The power is in your hands - deploy both native versions of your app or just one to a marketplace!

* [Adding a React Native project to bitrise.io](/getting-started/getting-started-with-react-native-apps/#adding-a-react-native-project-to-bitriseio)
* [Installing dependencies](/getting-started/getting-started-with-react-native-apps/#installing-dependencies)
* [Code signing](/getting-started/getting-started-with-react-native-apps/#code-signing)
* [Testing your project](/getting-started/getting-started-with-react-native-apps/#testing-your-project)
* [Deploying to Bitrise](/getting-started/getting-started-with-react-native-apps/#deploying-to-bitrise)
* [Deploying to an app store](/getting-started/getting-started-with-react-native-apps/#deploying-to-an-app-store)

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

## Adding a React Native project to Bitrise

1. Add your React Native project as a [new app](/getting-started/adding-a-new-app/) to Bitrise.

   This flow will guide you through the process of connecting your repository, setting up your repository access, selecting a branch and validating your project. Below we highlight some React Native-specific configuration.
2. Once you get to **Project build configuration**, you should see React Native as the selected **project type**. (If the project scanner fails and the **project type** is not selected automatically, you can [configure your project manually](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-configuration#manual-project-configuration).) You can see that **Android** is automatically selected in **The root directory of an Android app**.

   If your project consists of only one module, that module will be automatically selected for Module. If your project contains more than one module, you can pick a module, but we recommend the main one!
3. In the **Variant** field, select a variant that suits your project. Pick **Select All Variants** to build all variants. Pick **debug** or **release** if you wish to generate an APK or an .ipa file.
4. In the **Project (or Workspace)** field, select your Xcode project or Xcode Workspace path.
5. In the **Select Scheme name**, pick a scheme name. The scanner validation will fail if you do not have a SHARED scheme in your  project. You can still point Bitrise manually to your Xcode scheme but if it’s shared, we automatically detect it for you. [Read more about schemes and the possible issues with them!](https://devcenter.bitrise.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found)
6. In **Select ipa export method**, select the export method of your .ipa file: ad-hoc, app-store, development or enterprise method. You can read more on the different export methods in our [iOS app deployment guides](/deploy/ios-deploy/introduction-to-deploying-ios-apps/).

You have successfully set up your React Native project on [bitrise.io](https://www.bitrise.io)! Your first build gets kicked off automatically. You can check the generated artifacts of the first build on the [**APPS & ARTIFACTS**](/builds/build-artifacts-online/) tab of your Build's page.

## Installing dependencies

### Javascript dependencies

If the Bitrise project scanner has successfully scanned your project, **Run npm command** or **Run yarn command** Steps will be included in your workflow.

1. In the **Run npm command** Step, type install in the **npm command with arguments to run** input field so that it can add javascript dependencies to your project.

![](/img/run-nmp.png)

The **Run yarn command** Step can install javascript dependencies automatically to your project without having to configure it manually.

### Native dependencies

**Install missing Android SDK components** Step installs the missing native dependencies  for your Android project - luckily this steps is by default included in your workflow for deployment.

For iOS dependencies, you can add the **Run CocoaPods install** Step to your workflow as it is not part of the workflow by default.

## Code signing

A React Native app can consists of two projects, an Android and an iOS - both have different signing procedures. If you click on the Code Signing tab of your project's Workflow Editor, all iOS and Android code signing fields are displayed in one page for you. Let's see how to upload your code signing files and configure our code signing Steps.

1. Sign your Android project with the [Android Sign Step](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/).
2. Sign and export your iOS project:
   * [To make it available on Bitrise and share it with your internal testers.](/deploy/ios-deploy/deploying-an-ios-app-to-bitrise-io/).
   * [To make it available for external testers](/deploy/ios-deploy/deploying-an-ios-app-for-external-testing/).

## Testing your project

You can use React Native's built in testing method, called `jest` to perform unit tests.  Add another `Run nmp command` step to your workflow, and type `test` in the `npm command with arguments to run` input field.

![](/img/test-npm.png)

## Deploying to Bitrise

The `Deploy to bitrise.io` step uploads all the artifacts related to your build into the[ APPS & ARTIFACTS ](https://devcenter.bitrise.io/builds/build-artifacts-online/) tab on your Build’s page. All you have to do is add the Step to your workflow and [configure](/tutorials/deploy/bitrise-app-deployment/) it according to whom and how you want to share the artifacts with. You can share the generated APK/.ipa file with your team members using the build’s URL. You can also notify user groups or individual users that your APK/.ipa file has been built.

## Deploying to Google Play Store and iTunes Connect

### Android

Deploying an Android APK to the Play Store requires one additional Step to your Workflow: **Google Play Deploy**. Here is a short tutorial on[ how to configure the Step](/deploy/android-deploy/deploying-android-apps/#deploying-to-the-google-play-store).

{% include message_box.html type="important" title="Do you have a Google Play Developer Account?" content="Make sure you are in sync with Google Play Store! Learn how to

* [register to Google Play Store and set up your project](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
* set up [Google Play API access](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#set-up-google-play-api-access) "%} 

### iOS