---
changelog: 
last_modified_at: 
title: Android Signステップを使ったAndroidコード署名
redirect_from:
- "/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/"
menu:
  android-code-signing:
    weight: 2

---
You can create a signed APK using the **Android Sign** Step in your Bitrise Workflow.

## Creating a signed APK with the Android Sign Step

To digitally sign your Android project, use the **Android Sign** Step. This Step is configured to run if you have already uploaded your keystore file on the **Code signing** tab of the Workflow Editor.

The **Android Sign** Step is not required if signing is configured in your project’s bundle.gradle file. If so, running the **Android Build** Step (or the **Gradle Runner** Step) signs the output (APK or AAB) automatically. Nevertheless, we recommend that you use the **Android Sign** Step to sign your project in an easy and secure way.

{% include message_box.html type="info" title="jarsigner and apksigner" content="By default, the **Android Sign** Step uses jarsinger to sign your Android app. If you wish to use [apksigner](https://developer.android.com/studio/command-line/apksigner) to sign your project, then you have to first set the **Enables apksigner** input to true and leave the **APK Signature Scheme** input on automatic. This way apksigner checks your APK's minimum and target SDK versions and chooses the required schemes. It signs your project with V1 scheme if your minimum supported version is low and it also signs with other schemes for newer systems."%}

Before you start:

* Make sure you have the **Android Sign** Step in your deploy Workflow right after your build Steps but before the **Google Play deploy** Step.

1. Log into [bitrise.io](https://www.bitrise.io/) and click on your app.
2. On the app’s page, click **Workflows**.
3. Click **Code signing**.
4. Click on or drag-and-drop your keystore file to the **Upload file** field of the **ANDROID KEYSTORE FILE** section.![Android code signing using Android Sign step](https://devcenter.bitrise.io/img/android-code-signing/upload-file.png)

   A keystore URL automatically gets generated once you upload the keystore file. Bitrise assigns an Environment Variable (`BITRISEIO_ANDROID_KEYSTORE_URL`) to the download URL (which is a time-limited, read-only download URL) of the file as the value. No need to download it manually as the **Android Sign** Step downloads it automatically.
5. Fill out the displayed three input fields with your credentials:
   * Keystore password.
   * Keystore alias.
   * Private key password.![Android code signing using Android Sign step](https://devcenter.bitrise.io/img/android-keystore-file.png)
6. Click **Save metadata**.

   When you have successfully uploaded a keystore file to the **ANDROID KEYSTORE FILE** section, Bitrise will automatically export the following Environment Variables based on your input:
   * $BITRISEIO_ANDROID_KEYSTORE_ALIAS
   * $BITRISEIO_ANDROID_KEYSTORE_PASSWORD
   * $BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD
   * $BITRISEIO_ANDROID_KEYSTORE_URL

   Bitrise uses the above Environment Variables and sets them as inputs into the respective fields of the **Android Sign** Step. Once the Step runs, it produces either a signed APK or an AAB. The signed APK or AAB is used in deploy Steps, for example, the **Google Play Deploy** Step or the **Deploy to** [**Bitrise.io**](http://bitrise.io/ "http://Bitrise.io") Step. The latter deploys the APK/AAB on the **APPS & ARTIFACTS** tab. You can also [use Ship to deploy your app](https://devcenter.bitrise.io/deploy/ship/) once you built an APK/AAB file.

## Downloading your files

You can [download your keystore](https://devcenter.bitrise.io/code-signing/android-code-signing/downloading-a-keystore-file/) to the project directory from the **ANDROID KEYSTORE FILE** section using the **File Downloader** Step:

An example for downloading a keystore file:

    - file-downloader:
    
       inputs:
    
       - source: $BITRISEIO_ANDROID_KEYSTORE_URL
    
       - destination: "$HOME/keystores/my_keystore.jks" #native android#

After this Step, `my_keystore.jks` will be available at `$HOME/keystores/my_keystore.jks`.