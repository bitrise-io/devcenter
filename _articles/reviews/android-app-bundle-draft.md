---
title: Android App Bundle-draft
redirect_from: []
date: 2019-01-08 09:25:30 +0000
published: false

---
This guide describes how you can generate your Android App Bundle to publish your app using our Android workflow. With a few changes, you're ready to...Bundles are stored in .aab format. An Android App Bundle is a file (with the `.aab` file extension) that you upload to Google Play to support Dynamic Delivery.

.aab necessary file format for Android App bundles

## Generating Android App Bundle with Gradle Runner Step

If you are using `Gradle Runner` Step in your workflow, set the following:

1. In the `Gradle task to run` input field, set, for example, `bundleRelease` or `bundleDebug` to create a bundle of your project .

   ![](/img/bundlerelease.jpg)
2. Click `Export config` to see your export options.
3. To copy the Android App bundle file into the Bitrise deploy directory, replace the .apk file extension with .abb in the following input fields:
   * `APK file include filter`
   * `APK file exclude filter`
   * `Test APK file include filter`

   ![](/img/exportconfig.jpg)

This way the Step will generate a bundle instead of an APK even if the Step's output is `$BITRISE_APK_ATH`.

## Generating Android App Bundle with Android Build Step

If you are using `Android Build` Step in your workflow, set the following:

1. Set the APK location pattern

   ![](/img/android-build.png)