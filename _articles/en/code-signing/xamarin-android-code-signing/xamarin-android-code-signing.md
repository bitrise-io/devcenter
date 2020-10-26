---
title: Xamarin Android code signing
tag:
- xamarin
- android
- code-signing
- files
description: You can specify the code signing configuration for your Xamarin Android
  project by creating a signed APK in Visual Studio.
redirect_from: []
menu:
  android-code-signing:
    weight: 8

---
## Configuring code signing in Visual Studio

You can specify the code signing configuration for your Xamarin Android project by creating a signed APK in [Visual Studio](https://visualstudio.microsoft.com/).

1. Open Visual Studio.
2. Double click on your Xamarin Android project to open **Project Options**.
3. Select the **Android Package Signing** in **Build group**.
4. Select your configuration and platform in **Configuration - Platform**.
5. Check the **Sign .APK file using the following keystore details**.
6. Fill out the signing information.

## Using the same keystore path locally and on [bitrise.io](https://www.bitrise.io) for Xamarin Android

You can not use Environment Variables in your keystore path in your Xamarin project! The keystore path has to be relative to the folder of your Xamarin Android project. You can also use an absolute path.

You can use the same path on your local machine and on [bitrise.io](https://www.bitrise.io) by putting your keystore into your repository.

{% include message_box.html type="important" title="Gitignore your keystore" content=" Don't forget to gitignore your keystore in your repository! "%}

Since your keystore is gitignored, you have to upload your keystore to the **GENERIC FILE STORAGE** of Bitrise and download it to the same location in the build.

 1. On the Dashboard select your app.
 2. Click the **Workflow** tab to open the Workflow Editor.
 3. Click **Code signing**.
 4. Scroll down to the **GENERIC FILE STORAGE** field.
 5. Type your Environment Variable name here in the first field.
    In our example, we use `XAMARIN_KEYSTORE`.

    ![{{ page.title }}](/img/android-code-signing/generic-file-storage-xm.png)
 6. Upload your keystore file in the **Upload file field**.

    Your Environment Variable (for example, `$BITRISEIO_XAMARIN_KEYSTORE_URL`) will be automatically available with the download URL of your keystore file.

    ![{{ page.title }}](/img/android-code-signing/download-url.png)
 7. Navigate back to your workflow.
 8. Insert the **File Downloader** Step before the **Xamarin Archive** Step. The **File Downloader** Step will get a **Download source url** input.
 9. Type your Environment Variable, for example, `$BITRISEIO_XAMARIN_KEYSTORE_URL` in the **Download source url** field.
10. Set your keystore path in the **Download destination path**.

![{{ page.title }}](/img/file-downloader.png)

{% include message_box.html type="important" title="Bitrise keystore path" content="
Ensure that your Bitrise keystore path is the same as your local path relative to your project root. For example, if `keystore.jks` is in your project's root, then your Bitrise keystore path has to be `$BITRISE_SOURCE_DIR/keystore.jks`.
"%}

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/dashboard/builds" button_text="Go to Bitrise now" %}