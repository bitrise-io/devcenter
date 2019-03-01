---
# jp title missing
title: Getting started with Xamarin apps
date: 2018-10-19 11:49:28 +0000
menu:
  getting-started:
    weight: 13

---

{% include not_translated_yet.html %}

[Xamarin](/tutorials/xamarin/index/) provides a developer with tools that can help them building cross-platform mobile applications. Bitrise supports Xamarin apps, of course: this guide aims to walk you through the procedure of:

* adding a Xamarin app to Bitrise
* testing the app
* deploying the app

You can do the entire procedure in one single workflow but we recommend using at least two: one to test your app and one to deploy it. There is no need to have separate workflows for the different project types, though: you can build both an iOS and an Android version of a Xamarin app within a single workflow.

* [Before you start](/getting-started/getting-started-with-xamarin-apps/#before-you-start)
* [Adding a Xamarin app](/getting-started/getting-started-with-xamarin-apps/#adding-a-xamarin-app)
* [Installing dependencies](/getting-started/getting-started-with-xamarin-apps/#installing-dependencies)
* [Testing Xamarin apps](/getting-started/getting-started-with-xamarin-apps/#testing-xamarin-apps)
* [Deploying Xamarin apps](/getting-started/getting-started-with-xamarin-apps/#deploying-xamarin-apps)

## Before you start

Before adding a Xamarin app on Bitrise, you need to prepare your Xamarin solution file. Bitrise detects the solution file and all the available [solution configurations](https://docs.microsoft.com/en-us/visualstudio/ide/understanding-build-configurations?view=vs-2017) present in it.

A Xamarin solution file can contain multiple projects. Your solution configuration determines which projects (_solution items_) should be built and what project configuration type (for example, _debug_ or _release_) the build should use.

[Set up your solution configurations in Visual Studio](https://docs.microsoft.com/en-us/appcenter/build/xamarin/ios/solution-configuration-mappings). The solution file will have to contain all the solution configurations that you want to build on Bitrise. Also, make sure that a solution configuration you wish to build on a given solution platform is compatible with that platform.

{% include message_box.html type="example" title="Solution configuration" content="For example, if your solution file contains an Android and an iOS project but you want Bitrise to build only the Android project, set up a solution configuration in Visual Studio that only builds the Android project and use that configuration on Bitrise. Use the appropriate solution platform for that configuration: for example, if you only want to build an Android project, do not set iPhone as your solution platform."%}

## Adding a Xamarin app

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

 1. Click the `+` sign on the top menu bar and select `Add app`.
 2. On the Create new App page, choose the account you wish to add the app to.
 3. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click `Next`.
 4. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-your-repository).
 5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
 6. Type the name of the branch that includes your project's configuration - master, for example - then click `Next`.
 7. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them. In the case of a Xamarin app, we're looking for the Xamarin Solution file.
 8. Select the Xamarin solution configuration. The available options are based on the solution file. This will be stored as an [Environment Variable](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/) and it can be changed later.

    ![](/img/xamarin-project-build.png)
 9. Select the Xamarin solution platform. This will be stored as an Environment Variable and it can be changed later.
10. Confirm your build configuration.
11. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build - click the message and it will take you to the build page.

## Installing dependencies

Installing your dependencies with Xamarin apps is taken care of by a dedicated Step: `NuGet restore`. This Step is part of every automatically created [workflow](/getting-started/getting-started-workflows/) for Xamarin apps and it has one required input: the path to the Xamarin solution file which is stored as an Environment Variable when you add the app.

1. Enter the Workflow Editor of your app, and click the `Workflows` tab.
2. Make sure you have the `NuGet restore` Step in your workflow.

   The Step's single required input is the path to the Xamarin solution file. By default, the input is an [Environment Variable](/getting-started/getting-started-steps/#environment-variables-as-step-inputs), stored when adding the app to Bitrise. If you want to use a different solution file, click on the `Env Vars` tab in the Workflow Editor to change the value of the Environment Variable.

## Testing Xamarin apps

You can run **unit tests** and **UI tests** on Bitrise, both with Android and iOS projects. It is easy to configure and you can use all the testing frameworks available on the Microsoft App Center.

### Unit testing

Unit tests of Xamarin apps can be run with the `NUnit Runner` Step. The Step runs NUnit 2.x and NUnit 3.0 or higher tests with the NUnit Console Runner (_nunit3-console.exe_).

1. Enter the Workflow Editor of your app, and click the `Workflows` tab.
2. Add the `NUnit runner` Step to your workflow.

   This Step should be after the `NuGet restore` Step: you will want to install all your dependencies before running tests on your app.
3. Fill in the required input variables. By default, all the inputs are [Environment Variables](/getting-started/getting-started-steps/#environment-variables-as-step-inputs). If you want to use a different solution file or solution configuration, click on the `Env Vars` tab in the Workflow Editor to change the value of the Environment Variable.
   * **Path to Xamarin Solution**: the location of your Xamarin solution file.
   * **Xamarin project configuration**: the solution configuration, set up in Visual Studio, that you want to run on Bitrise. Change the appropriate environment variable if you want to run a different configuration; for example, if you only want to build an iOS project, as opposed to both iOS and Android projects.
   * **Xamarin platform**: the target platform of your solution configuration.

{% include message_box.html type="note" title="Debug inputs" content="In the Debug input group, you can configure the Step further: set the building tool, set additional flags for the NUnit Console Runner, and configure whether you want to build your test projects before running tests."%}

### UI testing

For UI tests, we strongly recommend using our `App Center upload and schedule tests` Step. You need to set up the tests in the Visual Studio App Center - [read more about it in our guide](/testing/run-your-tests-in-the-app-center/). Let's go through the process in brief.

1. Add the `App Center upload and schedule tests` Step to your workflow.

   This Step should be after the `NuGet restore` and the `Xamarin Archive` Steps, in order to install all your dependencies and build the app before running tests.

   ![](/img/ui-testing-xamarin.png)
2. Fill in the required inputs of the Step. You can find all these in the App Center after setting up your test run: check the **Submit** tab.

If you're interested in Calabash UI testing on Bitrise, check out this [discuss guide](https://discuss.bitrise.io/t/how-to-do-calabash-uitesting-on-bitrise/361)!

## Deploying Xamarin apps

With the help of Bitrise, you can deploy a Xamarin app to:

* Bitrise.io
* the App Store
* Google Play

To deploy your app, you need to build, sign and export the application file.

### Code signing Xamarin apps

Code signing requires different approaches for iOS and Android projects. We're presenting a brief overview here of code signing for both platforms.

For the purposes of deploying your app, we recommend [creating a new workflow](/getting-started/getting-started-workflows/), based on the automatically created deploy workflow.

#### **Android**

For Android, you need an APK and you need to sign that APK. Bitrise makes that happen with the `Sign APK` Step. The Step requires a keystore file, a keystore password and a keystore alias.

1. [Create a code signing identity in Visual Studio](https://docs.microsoft.com/en-us/xamarin/android/deploy-test/signing/?tabs=vswin).
2. Upload the keystore file to Bitrise: open the Workflow Editor of your app, go to the `Code Signing` tab and upload the file to the `ANDROID KEYSTORE FILE` section.
3. Set a keystore password, a keystore alias and a private key password.
4. On the `Workflows` tab, add the `Sign APK` Step to your workflow, AFTER the `Xamarin Archive` Step.

Read more about using the `Sign APK` Step [in our guide](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/)!

#### **iOS**

1. Set up your code signing identity and provisioning profile [on Visual Studio](https://docs.microsoft.com/en-us/xamarin/ios/deploy-test/provisioning/).
2. In the solution file, find the iOS project you want to build and set up its project options. You need to set:
   * the signing identity you want to use (for example, Developer)
   * the provisioning profile

   You can also set up custom entitlements in a .plist file.
3. On your own machine, use our [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool to collect the code signing files of your project.
4. Upload the files - the .p12 certificate and the provisioning profile - to Bitrise: open the Workflow Editor of your app and upload the files on the `Code Signing` tab.
5. Add the `Certificate and profile installer` Step to your workflow.

Read more about iOS code signing [in our guide](/code-signing/ios-code-signing/create-signed-ipa-for-xamarin/)!

### Exporting the app package file

On Bitrise, it does not matter whether you want to export an .ipa file, an .apk file or an .app file: the process is the same for all Xamarin apps. To make sure you build the correct project type, set up your solution configurations in Visual Studio.

For example, if you want to get an .apk file to upload it to Google Play, use a **Release** project configuration for your Android project in your solution configuration.

For your iOS project, set up the correct code signing identity in Visual Studio: for example, if you want to upload your app to the App Store, use a Distribution identity with an App Store type provisioning profile.

1. Enter the Workflow Editor of your app, and click the `Workflows` tab.
2. Make sure you have the `Xamarin Archive` Step in your workflow.

   ![](/img/xamarin-archive.jpg)
3. Make sure the required inputs of the Step have appropriate values. By default, all the inputs are [Environment Variables](/getting-started/getting-started-steps/#environment-variables-as-step-inputs). Click on the `Env Vars` tab in the Workflow Editor to change the value of the Environment Variable.
   * **Path to the Xamarin Solution file**: the location of your Xamarin solution file.
   * **Xamarin project configuration**: the solution configuration, set up in Visual Studio, that you want to run on Bitrise. Change the appropriate environment variable if you want to run a different configuration; for example, if you only want to build an iOS project, as opposed to both iOS and Android projects.
   * **Xamarin solution platform**: the target platform of your solution configuration.

### Deploying to the App Store

{% include message_box.html type="note" title="Before you start" content="Make sure that you have the correct solution configuration in Visual Studio! You need to use a Distribution type code signing identity with an App Store provisioning profile. Also, make sure that the Distribution certificate and the provisioning profile are uploaded to Bitrise!"%}

1. Go to the `Workflows` tab of the Workflow Editor.
2. Select the workflow you created for deploying your app.
3. Check that the code signing Steps and the `Xamarin Archive` Step are included in the workflow.
4. If you want to use a different solution configuration, change the values of the relevant Environment Variables on the the `Env Var` tab. You can check out which Env Vars you need to change in the inputs of the `Xamarin Archive` Step.
5. Add the `Deploy to iTunes Connect - Application Loader` Step to your workflow.

   ![](/img/deploy-itunes-connect.jpg)
6. Click the `Deploy to iTunes Connect - Application Loader`  Step, and enter your Apple ID and password in the relevant input field.
7. Start a build!

### Deploying to Google Play

{% include message_box.html type="note" title="Before you start" content="Make sure that you have the correct solution configuration in Visual Studio! You need a **Release** configuration."%}

1. Go to the `Workflows` tab of the Workflow Editor.
2. Select the workflow you created for deploying your app.
3. Check that the code signing Steps and the `Xamarin Archive` Step are included in the workflow.
4. If you want to use a different solution configuration, change the values of the relevant Environment Variables on the the `Env Var` tab. You can check out which Env Vars you need to change in the inputs of the `Xamarin Archive` Step.
5. Add the `Google Play Deploy` Step to the workflow.

   The Step needs to be after the `Xamarin Archive` Step.
6. Upload the Service Account JSON key file to the **Generic File Storage** on the `Code Signing`tab of the Workflow Editor.

   Learn more about [how to access your JSON key file](/tutorials/deploy/android-deployment/#set-up-google-play-api-access).
7. Create a Secret Environment Variable to reference the Service Account's JSON key file.
8. Click the `Google Play Deploy` Step, and add the Service Account's JSON key file path and the package name in the relevant input field.
9. Start a build!

If the build is successful, congratulations - you've just deployed your Xamarin app!
