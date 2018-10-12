---
title: Build and deploy multiple flavor APKs in a single workflow
date: 2018-10-08 11:02:02 +0000
redirect_from: []
published: false

---
You can deploy multiple flavor APKs in one workflow using our `Gradle Runner` step. You will need to do some settings to `Sign APK` and `Google Play Deploy` steps - so keep you eyes peeled! But first a little recap on the most important terms we will use in this guide.

{% include message_box.html type="info" title="About build types, flavors and build variants" content="
Build types mean the way your build is packaged, for example, compiled as `debug` for debugging or `release` for releasing the app.

Flavor means when an app's core code is enhanced with features resulting in different versions of the same app (just to mention the most common examples: free/paid, demo/full).

Finally, where all of the above blends together is build variant, which we will mention in this guide a lot. Build variant means the combination of flavors and build types, for example:

* freeDebug
* freeRelease
* paidDebug
* paidRelease
  "%}

## Generate APKs

If you have an Android deploy workflow do the following:

1. Insert `Gradle Runner` step after testing steps. `Android Build` step can only build one variant so if this step is part of your workflow, then we advise you to replace it with our `Gradle Runner` step.
2. Click the `Config` section of the step.
3. Specify the `assemble` [Gradle tasks](/tips-and-tricks/android-tips-and-tricks/#what-are-gradle-tasks-and-how-can-i-get-the-list-of-available-tasks-in-my-project/) by adding your build variants' task names in the `Gradle task to run` step input field - as many tasks names as many build variants you want to build in one workflow. Each task name must be **exactly the same build variant name** what you have listed in `Build Variant` window of Android Studio! Make sure you separate them only with a space, no need for `,`! In the below image, you can see the order of the steps for the deploy workflow and the `Gradle Task to run` step input with the two build variants:

   `assembleMyflavorDebug` and `assembleMyflavorDebugAndroidTest`

   ![](/img/gradle-multiflavor.jpg)

   `Gradle Runner` generates a `$BITRISE_APK_PATH_LIST` env var output that contains ALL the build variants you have set in `Gradle task to run` step above. We will need this output env var later but you can always check it and its value containing the APKs at `Env Vars` tab!

## Signing and deploying

1. Add the `Sign APK` step AFTER the `Gradle Runner` step if it's missing from your workflow.
2. Set the `$BITRISE_APK_PATH_LIST` in the `apk path` input field_s will make sure all the required APKs will get code signed with the keystore file you uploaded to the `Code Signing` tab. Check out [how you can upload your keystore file to bitrise.io](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/#create-a-signed-apk-with-the-sign-apk-step/). The step will export a `$BITRISE_SIGNED_APK_PATH` env var output which lists all your signed build variants.
3. Add the `Google Play Deploy` step AFTER the `Sign APK` step.
4. Set the `$BITRISE_SIGNED_APK_PATH` env var in the `APK or App Bundle file path` step input field so that `Google Play Deploy` can release all your build variants to the app store.