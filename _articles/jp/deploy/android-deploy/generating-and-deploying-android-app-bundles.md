---
changelog: 
last_modified_at: 
tag:
- android
- gradle
title: 'Generating and deploying Android app bundles '
redirect_from: []
description: You can compile an Android App Bundle with our Android Build and Gradle
  Runner Steps, easily get it signed with the Android Sign Step and deployed with
  Google Play Deploy Step.
menu:
  android-deploy:
    weight: 8
    title: Generating and deploying Android app bundles

---
{% include not_translated_yet.html %}

Creating an Android App Bundle with Bitrise is almost the same as generating an APK. All you have to do is tweaking a few Step inputs to compile an Android App Bundle (.aab) file from your code, then get the bundle signed and deployed to Google Play Store.

{% include message_box.html type="warning" title="Step versions supporting bundle creation" content=" The following Steps must be of the indicated version or newer - older versions of the Steps do NOT support bundle creation.

* Android Build 0.10.0 or newer
* Gradle Runner 1.9.0 or newer
* Android Sign 1.3.0 or newer
* Deploy to Google Play 1.6.0 or newer"%}

## Generating an Android App Bundle

You can create an Android App Bundle with either the **Gradle Runner** Step or with the **Android Build** Step.

### Gradle Runner Step

Once the Bitrise project scanner detects your code as an Android app, it kicks off your first build right away! Select the workflow you use for deployment in your Workflow Editor.

1. Insert the **Gradle Runner** Step after the **Android Unit Test** and **Android Lint** Steps in your Workflow (if the build Step is not already there).
2. Click the **Config** section of **Gradle Runner**.
3. In the **Gradle task to run** input field, set, for example, `bundleRelease` or `bundleDebug` to create a bundle of your project.

   ![{{ page.title }}](/img/bundlerelease.jpg)

This way the Step will generate an Android App Bundle instead of an APK.

If you wish to generate an Android App Bundle and an APK in one workflow, you can specify an additional task in the **Gradle task to run** input field:

![{{ page.title }}](/img/assemble-bundle-gradle-runner.jpg)

### Android Build Step

You can generate an Android App Bundle for your Android app with our **Android Build** Step as well:

1. Add the **Android Build** Step after the **Android Unit Test** and **Android Lint** Steps in your Workflow (if the build Step is not already there).
2. Provide the root directory of your Android project in the **Project Location** input field.
3. Go to **Build type** and select `aab` as build type.

   ![{{ page.title }}](/img/android-build-aab-config.jpg)

If you wish to generate an APK and an Android App Bundle in one workflow, add two **Android Build** Steps after each other and configure one to build an Android App Bundle and the other to build an APK.

## Signing an Android App Bundle

Signing an Android App Bundle file is the same as signing an APK.

{% include message_box.html type="important" title="Before you start, make sure" content="

* You have uploaded your keystore file to the **Code Signing** tab of the Workflow Editor.
* You have filled out the **Keystore password**, **Keystore alias** and the **Private key password** input fields. "%}

1. Add the **Android Sign** Step AFTER the build Step in your Workflow.
2. Make sure the **APK file path** input field displays the same output env var as the output of the build Step you've been using.

   ![{{ page.title }}](/img/android-sign-aab-apk.jpg)

If you have uploaded your keystore file and filled out the required credentials, the **Android** **Sign** Step's **Keystore url**, **Keystore password**, **Keystore alias** and the **Private key password** will get populated automatically!

## Deploying your Android App Bundle to Google Play Store

If you want to check the bundle prior to app store distribution, you can add the **Deploy to bitrise.io** Step after the **Gradle Runner / Android Build** Steps. It uploads the bundle into the [ APPS & ARTIFACTS ](https://devcenter.bitrise.io/builds/build-artifacts-online/) tab of your Build’s page.

Before you start, make sure you are in sync with Google Play Store! Learn how to:

* [Register to Google Play Store and set up your project](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project).
* Set up [Google Play API access](https://devcenter.bitrise.io/deploy/android-deploy/deploying-android-apps/#setting-up-google-play-api-access).

1. In your Bitrise Dashboard, go to **Code Signing** tab and upload the service account JSON key into the **GENERIC FILE STORAGE**.
2. Copy the env key which stores your uploaded file’s url.

   For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. Add the **Google Play Deploy** Step AFTER the **Android** **Sign** Step in your Workflow.
4. Fill out the required input fields as follows:
   * **Service Account JSON key file path**: This field can accept a remote URL so you have to provide the env var which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * **Package name**: the package name of your Android App Bundle.
   * **App file path:**  automatically filled out.
   * **Track**: the track where you want to deploy your Android App Bundle (alpha/beta/rollout/production).
5. [Start a build]().

Now you should be able to distribute and customize your Android App Bundle in Google Play Store.