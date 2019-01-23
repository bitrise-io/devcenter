---
title: Xamarin Android code signing
menu:
  android-code-signing:
    weight: 6

---
## Configuring code signing in Xamarin Studio

You can specify the code signing configuration for your Xamarin Android project by creating a signed APK in [Xamarin Studio](https://www.visualstudio.com/xamarin/).

1. Log into your `Xamarin Studio`.
2. Double click on your Xamarin Android project to open `Project Option`.
3. Select the `Android Package Signing` in `Build group`.
4. Select your platform in the `Configuration - Platform`.
5. Check the `Sign .APK file using the following keystore details`.
6. Fill out the signing information.

## Using the same keystore path locally and on [bitrise.io](https://www.bitrise.io) for Xamarin Android

You **cannot use environment variables** in your keystore path in your Xamarin project! The keystore path has to be relative to the folder of your Xamarin Android project. You can also use an absolute path.

You can use the same path on your local machine and on [bitrise.io](https://www.bitrise.io) by putting your keystore into your repository.

{% include message_box.html type="important" title="Gitignore your keystore" content=" Don't forget to gitignore your keystore in your repository! "%}

Since your keystore is gitignored, you have to upload your keystore to the `GENERIC FILE STORAGE` of Bitrise and download it to the same location in the build.

1. On the `Dashboard`, click on your `Workflow` tab.
2. Click on `Code signing`.
3. Scroll down to the `GENERIC FILE STORAGE` field.
4. Type your environment variable name here in the first field.
   In our example, we use `XAMARIN_KEYSTORE`.

   ![Screenshot](/img/android-code-signing/generic-file-storage-xm.png)
5. Upload your keystore file in the `Upload file field`.

   Your environment variable (for example, `$BITRISEIO_XAMARIN_KEYSTORE_URL`) will be automatically available with the download URL of your keystore file.

   ![Screenshot](/img/android-code-signing/download-url.png)
6. Navigate back to your workflow.
7. Insert the `File Downloader` step before the `Xamarin Archive` step. The `File Downloader` step will get a `Download source url` input.
8. Type your environment variable, for example, `$BITRISEIO_XAMARIN_KEYSTORE_URL` in the `Download source url` field.
9. Set your keystore path in the `Download destination path`.

![Screenshot](/img/android-code-signing/file-downloader.png)

{% include message_box.html type="important" title="Bitrise keystore path" content="
Ensure that your Bitrise keystore path is the same as your local path relative to your project root. For example, if `keystore.jks` is in your project's root, then your Bitrise keystore path has to be `$BITRISE_SOURCE_DIR/keystore.jks`.
"%}