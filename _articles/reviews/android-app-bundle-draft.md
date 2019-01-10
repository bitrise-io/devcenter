---
title: Android App Bundle-draft
redirect_from: []
date: 2019-01-08 09:25:30 +0000
published: false

---
This guide describes how you can deploy your Android App Bundle using our Android workflow. With a few changes, you're ready to...Bundles are stored in .aab format. An Android App Bundle is a file (with the `.aab` file extension) that you upload to Google Play to support Dynamic Delivery.

Before you start, make sure you have .aab necessary file format for Android App bundles

With our scanner, you can add your project to Bitrise as an Android project. Your first build gets kicked off automatically. If you select the `deploy` workflow in the Workflow Editor, you can modify a couple of things to generate an Android App Bundle instead of an .apk. 

fejlesztett codeot a bitrise kigeneralja az aab-t, alairja es feltolti a play store-ban. beszkelleni az aab-t, felismeri h android, kigenerallodik a config, lesz egy bitrise app. itt az alap konfigban a deployban. mi rajkuk ossze a bundle es mi irjuk ala. google playben customizolja.

## Generating Android App Bundle with Gradle Runner Step

The key to generate an Android App Bundle is to specify the right task and modify the file extensions in our Gradle Runner Step. 

Before you start:

* make sure you insert the `Gradle Runner` Step in your `deploy` workflow AFTER the `Android Unit Test` and `Android Lint` Steps. 

1. Click `Gradle Runner` in the workflow.
2. Click the `Config` section.
3. In the `Gradle task to run` input field, set, for example, `bundleRelease` or `bundleDebug` to create a bundle of your project.

   ![](/img/bundlerelease.jpg)
4. Click `Export config` to see your export options.
5. To copy the Android App bundle file into the Bitrise deploy directory, replace the .apk file extension with .abb in the following in the `APK file include filter` input field:

   ![](/img/include-filter.jpg)

This way the Step will generate a bundle instead of an APK even if the Step's output is `$BITRISE_APK``_TH_`_._de beletesz egy aab filet. innen a sign apk ismeri ezt a path-t es ala tudja irni az aab file mintha sima apk lenne. (vagy be van allitva a signing a gradle projektben) 100%ban megegyezik az apk workflowval

test apk-t csak apkbol tudunk generalni, bundle-nel ilyen nincs, 

Android build steppel csak assemble-el, gradle runner bamrilyen taskot ertelmez.

## Generating Android App Bundle with Android Build Step

If you are using `Android Build` Step in your workflow, set the following:

1. Set the APK location pattern

   ![](/img/android-build.png)