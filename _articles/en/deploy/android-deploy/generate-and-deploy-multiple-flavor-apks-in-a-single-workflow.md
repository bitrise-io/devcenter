---
title: Generate and deploy multiple flavor APKs in a single workflow
date: '2018-10-26T12:56:08.000+00:00'
redirect_from: []
tag:
- deploy
- android
- gradle
description: You can generate, code sign and deploy multiple flavor (multi-flavor)
  APKs in one workflow using our Gradle Runner Step. Flavor means enhancing an app's
  core code with features resulting in different versions of the same app.
summary: ''
menu:
  android-deploy:
    weight: 5
    title: Generating and deploying multiple flavor APKs in a single build

---
You can generate, code sign and deploy multiple flavor (multi-flavor) APKs/AABs in one workflow using our **Gradle Runner** Step. Flavor means enhancing an app's core code with features resulting in different versions of the same app (just to mention the most common examples: free/paid, demo/full). Check out the official Android Studio guide on [build types, flavors and build variants](https://developer.android.com/studio/build/build-variants) for more info! In this tutorial, you will need to do some settings to **Android Sign** and **Google Play Deploy** Steps - so keep your eyes peeled!

## Generating multi-flavor APKs

If you have an Android deploy workflow at hand, do the following:

1. Insert **Gradle Runner** Step after the Android testing Steps. **Android Build** step can only build one variant so if this Step is part of your workflow, then we advise you to replace it with our **Gradle Runner** Step.
2. Click the **Config** section of the Step.
3. Specify **assemble** [Gradle tasks](/tips-and-tricks/android-tips-and-tricks/#getting-the-list-of-available-gradlew-tasks-in-your-project) by adding your build variants' task names in the **Gradle task to run** Step input field - as many task names as many build variants you want to build in one workflow. Each task name must be exactly the same build variant name what you have listed in the **Build Variant** window of Android Studio! Make sure you separate them only with a space, no need for a comma ! In this image, you can see the order of the Steps for the deploy workflow and the **Gradle Task to run** Step input with two build variants:

   `assembleDemo` and `assembleFull` (for APKs) or `bundleDemo` and `bundleFull` (for AABs)

   ![{{ page.title }}](/img/multiflavor-1.jpg)
4. **Gradle Runner** generates a `$BITRISE_APK_PATH_LIST` / `$BITRISE_AAB_PATH_LIST` Environment Variable output that contains ALL the build variants you have set in the **Gradle task to run** Step above. We will need this output Environment Variable later.

## Signing and deploying multi-flavor APKs

1. Add one **Android Sign** Step AFTER the **Gradle Runner** Step if it's missing from your workflow.
2. Set the `$BITRISE_APK_PATH_LIST` in the `apk path` input field which will make sure all the required APKs will get code signed with the keystore file you uploaded to the **Code Signing** tab. Check out [how you can upload your keystore file to bitrise.io](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/#creating-a-signed-apk-with-the-android-sign-step). The Step will export either the `$BITRISE_SIGNED_APK_PATH` or the `$BITRISE_AAB_PATH_LIST` Environment Variable output which lists all your signed build variants.
3. Make sure you set the following input fields in the **Android Sign** Step:

* **Keystore url**
* **Keystore password**
* **Keystore alias**

1. Add the **Google Play Deploy** Step AFTER the **Android Sign** Step.
2. Set the `$BITRISE_SIGNED_APK_PATH` or the `$BITRISE_SIGNED_AAB_PATH` Environment Variable in the **APK or App Bundle file path** Step input field so that the **Google Play Deploy** Step can release all your build variants to the app store.

{% include banner.html banner_text="Let's deploy multi-flavor APKs!" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}