---
title: Android code signing with Android Studio
tag:
- android
- code-signing
- files
summary: You can specify the code signing configuration for your project in Android
  Studio. You will need a keystore file, a key alias and a key password - have these
  ready before you start the procedure!
redirect_from: []
menu:
  android-code-signing:
    weight: 5

---
You can specify the code signing configuration for your project in [Android Studio](https://developer.android.com/studio/). You will need a keystore file, a key alias and a key password - have these ready before you start the procedure! 

1. Go to `Project navigator`.

2. Select your project and open `Module Settings`.

3. From `Modules`, select your module.

4. On the `Signing` tab, fill out the signing information. In our example, we used the following values:

    * name: release

    * key alias: MyAndroidKey

    * key password: ***

    * store file: /path/to/my/keystore.jks

    * store password: ***

Once you filled out the signing information, the `signingConfigs` block will be created in your module's `build.gradle` file.