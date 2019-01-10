---
title: Android App Bundle-draft
redirect_from: []
date: 2019-01-08 09:25:30 +0000
published: false

---
Creating an Android App Bundle (.aab) with Bitrise is _almost_ the same as generating an APK. Tweaking a few step inputs will enable you to compile an Android App Bundle (.aab) file from your code, get it signed and deployed to Google Play Store. Our scanner can detect your code as an Android project and your first build gets kicked off right away! If you select the `deploy` workflow in the Workflow Editor, you can modify a couple step inputs - let's see how!

## Generating Android App Bundle with Gradle Runner Step

The key to generate an Android App Bundle is to specify the right task and modify the file extensions in our `Gradle Runner` Step.

Before you start, make sure that:

* make sure you insert the `Gradle Runner` Step in your `deploy` workflow AFTER the `Android Unit Test` and `Android Lint` Steps.

1. Click `Gradle Runner` in the workflow.
2. Click the `Config` section.
3. In the `Gradle task to run` input field, set, for example, `bundleRelease` or `bundleDebug` to create a bundle of your project.

   ![](/img/bundlerelease.jpg)
4. Click the `Export config` section.
5. To copy the Android App bundle file into the Bitrise deploy directory, replace the `.apk` file extension with `.abb` in the `APK file include filter` input field:

   ![](/img/include-filter.jpg)

This way the Step will generate an Android App Bundle instead of an APK even if there is an APK in the Step's output path: `$BITRISE_APK_PATH`.

## Signing an Android App Bundle

Before you start, make sure that:

* you have uploaded your keystore file to the `Code Signing` tab of the Workflow Editor.
* you have filled out the `Keystore password`, `Keystore alias` and the `Private key password` input fields.

1. Add the `Sign APK` Step after the `Gradle Runner` Step in your `deploy` workflow.
2. Make sure the `Build artifact path` is the same as the output of the `Gradle Runner` Step.

![](/img/bundle-signing.png)

If you have uploaded your keystore file and filled out the required credentials, the `Sign APK` Step's `Keystore url`, `Keystore password`, `Keystore alias` and the `Private key password` will get populated automatically!

{% include message_box.html type="note" title="Can I create an Android App Bundle with Android Build Step?" content=" Since the `Android Build` Step uses the `assemble` Gradle command exclusively, you cannot run a `bundle` command with it. Use Gradle Runner instead!" %}