---
title: Build and deploy multiple flavor APKs in a single workflow
date: 2018-10-08 11:02:02 +0000
redirect_from: []
published: false

---
You can deploy multiple flavor APKs in one workflow using our Gradle Runner step. You will need to do some settings to the Sign APK and the Google Play Deploy steps to reference the build variants - so keep you eyes peeled! In this tutorial, we walk you through how to generate multiple APKs (or just a few out of all your build variants) and how to sign and deploy them to an app store.

## Generate APKs

1. Add `Gradle Runner` step to your deploy workflow. `Android Build` step can only build one variant so if this step is part of your workflow, then we advise you to replace it with `Gradle Runner` step.
2. In `Gradle Runner` step, set the task names of your build variants in `Gradle task to run` step input field. Each task name must be exactly the same build variant same that you have as a build variant name in \[Android Studio\]! More on what other gradle tasks you can use are here. Make sure you separate them only with a space, no need for `,` separation! In the below image, you can see the order of the steps for the deploy workflow and the `Gradle Task to run` step input with two build variant we're building:

   `assembleMyflavorDebug` and `assembleMyflavorDebugAndroidTest`
   ![](/img/gradle-multiflavor.jpg)

   Gradle Runner generates a `BITRISE_APK_PATH_LIST` env var that contains ALL the build variants you have set in the step input above. Note that we have another env var for building one APK, that is the `BITRISE_APK_PATH`.

## Signing and deploying

1. Add the Sign APK step if it's missing from your workflow.
2. Set the `$BITRISE_APK_PATH_LIST` in the `apk path` input field. This will make sure all the required apks will get code signed with the uploaded keystore file. Check out how you can upload your keystore file to bitrise.io.
3. Add the Google Play Depoy step to AFTER the Sign APK step.
4. In Google Play Deploy, set the `$BITRISE_SIGNED_APK_PATH` env var in the `APK or App Bundle file path` step input field so that Google Play Deploy can release all your build variants set in this env var.

### Signing and deploying a white label app

If you have a white label app and you want to distribute it with different features (for example, color or logo) to resellers you need to use different keystore files. If you want to built multiple flavors in a single workflow for different resellers, you need to use different keystore files. We advise you to code sign your project as described in [Sign your app for release](https://developer.android.com/studio/publish/app-signing) section of the Android Studio Guide. Make sure you store the keystore file in the same folder where you had it during the code signing and