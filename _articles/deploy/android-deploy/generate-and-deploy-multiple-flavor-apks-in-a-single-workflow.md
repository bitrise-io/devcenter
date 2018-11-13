---
title: Generate and deploy multiple flavor APKs in a single workflow
date: 2018-10-26 12:56:08 +0000
redirect_from: []
menu:
  android-deploy:
    weight: 2
    title: Generating and deploying multiple flavor APKs in a single build

---
You can generate, code sign and deploy multiple flavor (multi-flavor) APKs in one workflow using our `Gradle Runner` Step. Flavor means enhancing an app's core code with features resulting in different versions of the same app (just to mention the most common examples: free/paid, demo/full). Check out the official Android Studio guide on [build types, flavors and build variants](https://developer.android.com/studio/build/build-variants) for more info! In this tutorial, you will need to do some settings to `Sign APK` and `Google Play Deploy` Steps - so keep your eyes peeled!

## Generating multi-flavor APKs

If you have an Android deploy workflow at hand, do the following:

1. Insert `Gradle Runner` Step after the Android testing steps. `Android Build` step can only build one variant so if this Step is part of your workflow, then we advise you to replace it with our `Gradle Runner` Step.
2. Click the `Config` section of the Step.
3. Specify the `assemble` [Gradle tasks](/tips-and-tricks/android-tips-and-tricks/#what-are-gradle-tasks-and-how-can-i-get-the-list-of-available-tasks-in-my-project/) by adding your build variants' task names in the `Gradle task to run` Step input field - as many task names as many build variants you want to build in one workflow. Each task name must be **exactly the same build variant name** what you have listed in the `Build Variant` window of Android Studio! Make sure you separate them only with a space, no need for `,`! In the below image, you can see the order of the Steps for the deploy workflow and the `Gradle Task to run` Step input with two build variants:

   `assembleDemo` and `assembleFull`

   ![](/img/multiflavor-1.jpg)
4. `Gradle Runner` generates a `$BITRISE_APK_PATH_LIST` env var output that contains ALL the build variants you have set in `Gradle task to run` Step above. We will need this output env var later!

## Signing and deploying multi-flavor APKs

1. Add one `Sign APK` Step AFTER `Gradle Runner` Step if it's missing from your workflow.
2. Set the `$BITRISE_APK_PATH_LIST` in the `apk path` input field which will make sure all the required APKs will get code signed with the keystore file you uploaded to the `Code Signing` tab. Check out [how you can upload your keystore file to bitrise.io](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/#create-a-signed-apk-with-the-sign-apk-step/). The Step will export a `$BITRISE_SIGNED_APK_PATH` env var output which lists all your signed build variants.
3. Make sure you set the following input fields in the `Sign APK` Step:
- `Keystore url`
- `Keystore password`
- `Keystore alias`
4. Add the `Google Play Deploy` Step AFTER the `Sign APK` step.
5. Set the `$BITRISE_SIGNED_APK_PATH` env var in the `APK or App Bundle file path` Step input field so that `Google Play Deploy` can release all your build variants to the app store.