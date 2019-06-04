---
# jp title missing
title: Sample apps-draft
date: 2018-10-30 14:13:21 +0000
redirect_from: []
published: false

---

{% include not_translated_yet.html %}

Bitrise maintains a couple of sample apps that you can check to create the best configuration for your workflow. All the sample apps we provide in this guide are monitored by our developers on a weekly basis. The apps are scheduled to run between 4 a.m. - 5 a.m. UTC on every Monday. This way we can check if our VM updates happening on Saturdays have disrupted the sample apps. If so, our developers fix them.

For each sample app, we provide a primary and deploy workflow, these contain the most frequently used and recommended steps of a specific platform.

These workflows don't contain any signing certificates, provisioning profiles or keystore files, therefore if you run the builds you will see a code signing error message. We hope next time you encounter the same error in your own build, you will remember to upload your code signing files. If you need more help on code signing, check out our [Android](/code-signing/android-code-signing/android-code-signing-procedures/) and [iOS](/code-signing/ios-code-signing/code-signing/) guides.

{% include message_box.html type="note" title="Protecting your code signing files" content="Irrespective of public or private apps, your code signing files are always protected from curious eyes!

* Files uploaded to the `Code signing` tab are not accessible to people outside of your team!
* Even if you generate a public app and share the build with someone, the **certificate and provisioning profile URLs** will be redacted in build logs.
* If you have exported an encrypted profile from Xcode, you can protect the file with the same password you used in Xcode on our `Code Signing` tab.
* The `Expose for Pull Request` toggle in `Secrets` tab is by default **disabled for public apps** since secrets included in PR builds can be accessed by anyone who can open a pull request. "%}

## About triggers

With every sample app, the primary workflow gets triggered when code is pushed to the Feature branch. If code is pushed to the developer branch, then the deploy workflow gets triggered.

![](/img/triggers-sample-app.png)

Learn more about triggering builds [here](/builds/triggering-builds/triggering-builds/).

## Sample apps

### android-sample-app

* In this sample app we show you an Android primary and deploy workflow. The primary one performs unit and UI tests and deploys the results to your build's `APPS & ARTIFACTS` tab with the help of our `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step - all test reports at your fingertips to help you fix any issues in your project. The deploy workflow takes care of building, code signing and deploying your app.

{% include message_box.html type="info" title="More about Android" content="

* [Getting started with Android apps](/getting-started/getting-started-with-android-apps/)
* [About Android code signing](/code-signing/android-code-signing/android-code-signing-procedures/)
* [About Android build steps](/tips-and-tricks/android-tips-and-tricks/)
* About [Android UI ](/testing/device-testing-for-android/)and [Android unit testing](/testing/android-run-a-unit-test/)
* [About Android deployment](/deploy/android-deploy/deploying-android-apps/)" %}

### carthage-sample-app

If you use our `Carthage` Step to manage your dependencies instead of `Run Cocoapods install` Step, make sure you add your `Github Personal Access Token` input in the step input field as a [secret env var](/builds/env-vars-secret-env-vars/#about-secrets).

![](/img/carthage.png)

If you receive the following error message, the token is surely missing from the Step:

      API rate limit exceeded for 208.52.166.154. (But here’s the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.

### expo-sample-app

If your React Native project comes with an Expo framework, it does not contain any native elements. This expo-sample-app shows a primary and deploy workflow, where the primary workflow contains our `[BETA] Expo Eject` and `Recreate user schemes` Steps. `[BETA] Expo Eject` Step generates the necessary native elements to your projects using the [Expo Development CLI.](https://docs.expo.io/versions/latest/introduction/installation#local-development-tool-expo-cli)

{% include message_box.html type="important" title="Do you have an Expo account?" content=" This step requires your Expo username and password. Head over to Expo to create an account or keep them handy when setting the `[BETA] Expo Eject` Step input fields.

![](/img/expo-eject.png)" %}

Follow the steps to fill out the required `[BETA] Expo Eject` Step input fields:

1. Specify the `Expo CLI version`.
2. In the `Username for Expo` input field, if you have a React Native project with Expo Kit library, you have to add your Expo username. Step will run `expo eject --eject-method expoKit` **TO DO WHAT?**
3. If you have a React Native project with Expo Kit library, you have to add your Expo password in the `Password for Expo account` input field. Note, this is sensitive information, so make sure you set it as a [secret env var](/builds/env-vars-secret-env-vars/#about-secrets/).  The Step will run `**expo eject --eject-method expoKit**` **TO DO WHAT?**
4. `Run expo publish after eject?` With this set to `yes` or `no` you can control if the Step should **automatically publish your app on** [Expo.io](https://expo.io/) once it gets ejected.
5. `React Native version to set in package.json` Here you can add the version if it is missing from your package.json file.

{% include message_box.html type="note" title="My message" content="
In the case of an iOS project: you need to use SHARED schemes. The `Recreate user schemes` Step generates platform-specific files. To fulfill this requirement, you either generate shared schemes in XCode or leave it to our `Recreate user schemes`. Make sure you add the location of your Xcode project file in the `Project or Workspace path`.

When you run your build, the Step scans your project and lists out the shared schemes, if any, and recreates shared ones if those have been missing from your project (based on your Xcode project file)
![](/img/recreate=schemes.png)
"%}

### ios-sample-app

This sample app contains our `Xcode test for iOS` and our `Deploy to Bitrise.io - Apps, Logs, Artifacts` Steps. It's important to add this deploy step to your workflow since with this you can check test results generated by `Xcode test for iOS` Step (`All`, `Failing` and `Passing`) in the `APPS & ARTIFACTS` tab on your Build's page. If your workflow [does not contain any test targets](/getting-started/getting-started-with-ios-apps/#running-xcode-tests), it will not contain the `Xcode test for iOS` Step.

![](/img/sample-app-ios.png)

![](/img/xcode-test-results.png)

With iOS projects, we also advise you to add our `Run CocoaPods install` Step to your primary workflow to make sure all your iOS dependencies are installed.

{% include message_box.html type="info" title="More on iOS" content="

* [Getting started with iOS apps](/getting-started/getting-started-with-ios-apps/)
* [About iOS code signing with troubleshooting](/code-signing/ios-code-signing/code-signing/)
* [About frequent iOS issues](/troubleshooting/frequent-ios-issues/)
* [About device testing for iOS](/testing/device-testing-for-ios/)
* [About iOS deployment](/deploy/ios-deploy/introduction-to-deploying-ios-apps/)"%}

### ionic-sample-app and cordova-sample-app

If you wish to generate a build.json file, insert our `Generate cordova build configuration` Step in your deploy workflow. If you have an iOS project, make sure you add it after the `Certificate and profile installer` step in your workflow.

{% include message_box.html type="info" title="Learn more about Ionic and Cordova" content="

* [Getting started with Ionic/Cordova apps](/getting-started/getting-started-with-ionic-cordova-apps/)" %}

### reactnative-sample-app

Make sure you have the `Install React Native` Step in your workflow after the `Git clone repository` Step to install the [React Native CLI npm package](https://www.npmjs.com/package/react-native-cli).

Make sure you have the `React Native bundle` Step right after the `Install React Native` Step to bundle your project if it lacks a `react.gradle` file containing the bundling task command.

You can use **two dependency manager steps** with your React Native project:

* `Run npm command`
* `Run yarn command`

If you add `install` in the `The npm command with arguments to run` input field, the step will install all the native or missing dependencies to your project. If you type `test`, the Step will run a jest test.

{% include message_box.html type="info" title="More on React Native" content="

* [Getting started with React Native apps](/getting-started/getting-started-with-react-native-apps/) "%}

### xamarin-sample-app

We advise you to use our `NuGet restore` Step to manage dependencies for your Xamarin project.

{% include message_box.html type="info" title="More on Xamarin" content="

* [Getting started with Xamarin apps](/getting-started/getting-started-with-xamarin-apps/) "%}
