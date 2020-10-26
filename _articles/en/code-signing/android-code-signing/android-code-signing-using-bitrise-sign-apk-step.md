---
title: Android code signing using Android Sign step
redirect_from:
- "/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/"
tag:
- android
- google-play
- code-signing
- files
description: You can create a signed APK using the Android Sign Step in your Bitrise
  workflow. This Step is configured to run if you have already uploaded your keystore
  file to Bitrise. All you have to do is upload your keystore file in the Code signing
  tab of the Workflow Editor.
menu:
  android-code-signing:
    weight: 1
    title: Android code signing using Android Sign Step

---
## Creating a signed APK with the Android Sign Step

You can create a signed APK using the **Android Sign** Step in your Bitrise workflow.

Bitrise project scanner provides a deploy workflow which contains the **Android Sign** Step. With this Step, you can digitally sign your APK as part of your workflow. This Step is configured to run if you have already uploaded your keystore file to Bitrise. All you have to do is upload your keystore file on the Code signing tab of the Workflow Editor.

Before you start:

* Make sure you have the **Android Sign** Step in your deploy workflow right after your build Steps but before **Google Play deploy** Step.

1. Log into [bitrise.io](https://www.bitrise.io/) and click on your app.
2. On your Dashboard, click **Workflows**.
3. Click **Code signing**.
4. Click on or drag-and-drop your keystore file to the **Upload file** field of the **ANDROID KEYSTORE FILE** section.

   ![{{ page.title }}](/img/android-code-signing/upload-file.png)

   A keystore URL automatically gets generated once you upload the keystore file. Bitrise assigns an Environment Variable (`BITRISEIO_ANDROID_KEYSTORE_URL`) to the download URL (which is a time-limited, read-only download URL) of the file as the value. You can use this URL to download the keystore file during a build in the future.
5. Fill out the displayed three input fields with your credentials:
   * Keystore password.
   * Keystore alias.
   * Private key password.

   ![{{ page.title }}](/img/android-keystore-file.png)
6. Click **Save metadata**.

   When you have successfully uploaded a keystore file to the **ANDROID KEYSTORE FILE** section, Bitrise will automatically export the following Environment Variables based on your input:
   * `$BITRISEIO_ANDROID_KEYSTORE_ALIAS`
   * `$BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
   * `$BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`
   * `$BITRISEIO_ANDROID_KEYSTORE_URL`

   Bitrise uses the above Environment Variables and sets them as inputs into the respective fields of the **Android Sign** Step. Once the Step runs, it produces a signed APK which will be used as the input value of the **APK or App Bundle file path** field in the **Google Play Deploy** Step.

## Downloading your files

You can [download your files](/tutorials/how-to-use-the-generic-file-storage/) from the **GENERIC FILE STORAGE** (for example, your keystore file) using the **File-downloader** Step:

An example for downloading a keystore file:

    - file-downloader:
    
       inputs:
    
       - source: $BITRISEIO_ANDROID_KEYSTORE_URL
    
       - destination: "$HOME/keystores/my_keystore.jks" #native android#

After this Step, `my_keystore.jks` will be available at `$HOME/keystores/my_keystore.jks`.

{% include banner.html banner_text="Sign your APK with Android Sign Step" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}