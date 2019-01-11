---
title: Android App Bundle-draft
redirect_from: []
date: 2019-01-08 09:25:30 +0000
published: false

---
Creating an Android app bundle with Bitrise is _almost_ the same as generating an APK. All you have to do is tweaking a few step inputs to compile an Android app bundle (.aab) file from your code, then get the bundle signed and deployed to Google Play Store.

## Generating Android app bundle with Gradle Runner Step

Our scanner can detect your code as an Android project and kick your first build off right away! Select the `deploy` workflow in your Workflow Editor to get a basic workflow which you can modify to create an .aab file instead of an APK file.

The key to generate an Android app bundle is to specify the right **Gradle task** and modify the **file extensions** in our `Gradle Runner` Step.

Before you start, make sure that:

* you insert the `Gradle Runner` Step in your `deploy` workflow AFTER the `Android Unit Test` and `Android Lint` Steps.

1. Click `Gradle Runner` in the workflow.
2. Click the `Config` section.
3. In the `Gradle task to run` input field, set, for example, `bundleRelease` or `bundleDebug` to create a bundle of your project.

   ![](/img/bundlerelease.jpg)
4. Click the `Export config` section.
5. To copy the Android app bundle file into the Bitrise deploy directory, replace the `.apk` file extension with `.abb` in the `APK file include filter` input field:

   ![](/img/include-filter.jpg)This way the Step will generate an Android app bundle instead of an APK even if there is an APK in the Step's output (`$BITRISE_APK_PATH`).

## Signing an Android app bundle

Signing an Android app bundle file is the same as signing an APK.

Before you start, make sure that:

* you have uploaded your keystore file to the `Code Signing` tab of the Workflow Editor.
* you have filled out the `Keystore password`, `Keystore alias` and the `Private key password` input fields.

1. Add the `Sign APK` Step AFTER the `Gradle Runner` Step in your `deploy` workflow.
2. Make sure the `Build artifact path` is the same as the output of the `Gradle Runner` Step.

![](/img/bundle-signing.png)

If you have uploaded your keystore file and filled out the required credentials, the `Sign APK` Step's `Keystore url`, `Keystore password`, `Keystore alias` and the `Private key password` will get populated automatically!

{% include message_box.html type="note" title="Can I create an Android App Bundle with Android Build Step?" content=" Since the `Android Build` Step uses the `assemble` Gradle command **exclusively**, you cannot run a `bundle` command with it. Use the `Gradle Runner` Step instead!" %}

## Deploying your Android app bundle Google Play Store

If you want to check the bundle prior to app store distribution, you can add the `Deploy to bitrise.io` Step after the `Gradle Runner` Step. It uploads the bundle into the[ APPS & ARTIFACTS ](https://devcenter.bitrise.io/builds/build-artifacts-online/)tab on your Build’s page. 

Before you start, make sure you are in sync with Google Play Store! Learn how to

* [register to Google Play Store and set up your project](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
* set up [Google Play API access](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#set-up-google-play-api-access)

1. In your Bitrise `Dashboard`, go to `Code Signing` tab and upload the service account JSON key into the `GENERIC FILE STORAGE.`
2. Copy the env key which stores your uploaded file’s url.

   For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. Add the `Google Play Deploy` step AFTER the `Sign APK` step in your `deploy` workflow.
4. Fill out the required input fields as follows:
   * `Service Account JSON key file path`: This field can accept a remote URL so you have to provide the env var which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: the package name of your Android app bundle
   * `Track`: the track where you want to deploy your Android app bundle (alpha/beta/rollout/production)
5. Start a build.

Now you should be able to distribute/customize your Android app bundle in Google Play Store.