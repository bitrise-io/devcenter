---
title: Android code signing using Bitrise Sign APK step
redirect_from:
- "/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/"
menu:
  android-code-signing:
    weight: 2

---
## Creating a signed APK with the Sign APK Step

You can create a signed APK using the `Sign APK step` in your Bitrise workflow.

Bitrise Project Scanner provides a `deploy workflow` which contains the `Sign APK step`. With this step, you can digitally sign your APK as part of your workflow. This Step is configured to run if you have already uploaded your keystore file to Bitrise. All you have to do is upload your keystore file in the `Code signing` tab of the Workflow Editor.

In this section, we walk you through the code signing steps using our `android-multiple-test-results-sample` demo app.

Before you start:

* Make sure you have the `Sign APK` Step in your deploy workflow right after your build steps but before `Google Play deploy` Step.

1. Log into [bitrise.io](https://www.bitrise.io/) and click on your app.
2. On your `Dashboard`, click `Workflow`.
3. Click `Code signing`.
4. Click or drag-and-drop your keystore file on the `Upload file` field of the `ANDROID KEYSTORE FILE` section.

   ![Screenshot](/img/android-code-signing/upload-file.png)

   A keystore URL automatically gets generated once you upload the keystore file. Bitrise assigns an environment variable (`BITRISEIO_ANDROID_KEYSTORE_URL`) to the download URL (which is a time-limited, read-only download URL) of the file as the value. You can use this URL to download the keystore file during a build in the future.
5. Fill out the displayed three input fields with your credentials:
   * `keystore password`
   * `keystore alias`
   * `private key password`

   ![Screenshot](/img/android-code-signing/three-fields.png)
6. Click on `Save metadata`.

   When you have successfully uploaded a keystore file in the `ANDROID KEYSTORE FILE` section and you have all the fields filled out, Bitrise will automatically export the following env vars based on your input:
   * `$BITRISEIO_ANDROID_KEYSTORE_ALIAS`
   * `$BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
   * `$BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`
   * `$BITRISEIO_ANDROID_KEYSTORE_URL`

   Bitrise uses the above env vars and sets them as inputs into the respective fields of the `Sign APK` step. Once the Step runs, it produces a signed APK which will be used as the input value of the `APK or App Bundle file path` field in the `Google Play Deploy` Step.

## Downloading your files

You can download your files from `GENERIC FILE STORAGE` (for example, your keystore file) using the `File-downloader` step:

An example for downloading a keystore file:

    - file-downloader:
    
       inputs:
    
       - source: $BITRISEIO_ANDROID_KEYSTORE_URL
    
       - destination: "$HOME/keystores/my_keystore.jks" #native android#

After this step, `my_keystore.jks` will be available at `$HOME/keystores/my_keystore.jks`.

You might find these guides helpful as well:

* [How to use the Generic File Storage](/tutorials/how-to-use-the-generic-file-storage/)
* [Downloading a keystore file](/code-signing/android-code-signing/downloading-a-keystore-file/)
* [Managing files on Bitrise](/getting-started/managing-files-on-bitrise/)