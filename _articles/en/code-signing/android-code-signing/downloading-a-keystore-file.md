---
title: Downloading a keystore file
date: '2018-12-11T10:30:01.000+00:00'
redirect_from: []
tag:
- android
- gradle
- code-signing
- files
description: If the file path of your keystore file is defined in your build.gradle
  file but the keystore file itself is missing from the location where the path points
  to, you can use one of our file downloading steps to download the keystore file
  from Bitrise and place it in the defined location.
menu:
  android-code-signing:
    weight: 9

---
If the file path (where your keystore file is located) that's defined in your `build.gradle` file but the keystore file itself is missing from the path's location, you can use one of our file downloading Steps to download the keystore file from Bitrise and put it in the defined location.

Bitrise has two Steps which download files from the **Code Signing** tab. Which one to use in your workflow depends on where you uploaded your keystore file in the **Code Signing** tab:

* **File Downloader** Step: If you have uploaded your keystore file to the **ANDROID KEYSTORE FILE** section, which is the recommended place for your keystore file, this is the Step you should use. Once the file is uploaded, Bitrise assigns an Environment Variable (`BITRISEIO_ANDROID_KEYSTORE_URL`) to the download URL (which is a time-limited, read-only download URL) of the file as the value.

  ![](/img/android-keystore.png)
* **Generic File Storage** Step: If you have uploaded your keystore file to the **GENERIC FILE STORAGE** section on the **Code Signing** tab, this is the Step you should use. Bitrise assigns an Environment Variable (`$GENERIC_FILE_STORAGE`) to the download URL (which is a time-limited, read-only download URL) of the file as the value. If you use an Environment Variable in your `build.gradle` file, you can use a **Script** Step to overwrite the Environment Variable's value with the destination path defined in the `$GENERIC_FILE_STORAGE` Environment Variable. Make sure you use [envman](/tips-and-tricks/expose-environment-variable/) and not just a simple export.

  ![](/img/keystore-generic.png)

1. Add either the **File Downloader** or the **Generic File Storage** Step to your workflow. The Step should be added BEFORE the **Gradle Runner** Step.
2. If you use the **File Downloader** Step, fill out the following 2 input fields:
   * **Download source url**: Set the generated keystore URL you get when you upload your file to the **ANDROID KEYSTORE FILE** section of the **Code Signing** tab).
   * **Download destination path**: Set the location of the keystore file as a relative path. This path should be the same as the keystore path already defined in your `build.gradle` file (for example, `$HOME/keystores/project_release.keystore`).
3. Add the **Gradle Runner** Step right after your file downloading Step.

With that said, if you have successfully added the Steps to download your keystore file to the same location that you specified in your `build.gradle` file, you do not need the **Android Sign** Step in your workflow. Our **Gradle Runner** Step will sign and assemble your project.

{% include banner.html banner_text="Download a keystore file from Bitrise" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}