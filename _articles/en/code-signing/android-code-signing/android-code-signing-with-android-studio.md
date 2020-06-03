---
last_modified_at: 
title: Android code signing with Android Studio
tag:
- android
- code-signing
- files
description: You can specify the code signing configuration for your project in Android
  Studio. You will need a keystore file, a key alias and a key password - have these
  ready before you start the procedure!
redirect_from: []
menu:
  android-code-signing:
    weight: 3

---
You can specify the code signing configuration for your project in [Android Studio](https://developer.android.com/studio/). You will need a keystore file, a key alias and a key password - have these ready before you start the procedure!

1. Go to **Project navigator**.
2. Select your project and open **Module Settings**.
3. From **Modules**, select your module.
4. On the **Signing** tab, fill out the signing information. In our example, we used the following values:
   * Name: `release`
   * Key alias: `MyAndroidKey`
   * Key password: `***`
   * Store file: `/path/to/my/keystore.jks`
   * Store password: `***`

Once you filled out the signing information, the `signingConfigs` block will be created in your module's `build.gradle` file.

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to Bitrise now" %}