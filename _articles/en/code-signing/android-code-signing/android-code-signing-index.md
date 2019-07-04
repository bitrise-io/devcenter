---
title: Android code signing
tag:
- android
- code-signing
summary: 'Before you distribute your app through Google Play Store, your APK file
  must be digitally signed. Find out the different ways of signing your Android app
  on Bitrise. '
redirect_from: "/code-signing/android-code-signing/android-code-signing-procedures/"
menu:
  code-signing-main:
    identifier: android-code-signing
    weight: 1

---
Before you distribute your app through [Google Play Store](https://play.google.com/store/apps), your APK file must be digitally signed.

You can specify the code signing configuration for your project in Android Studio or manually in your Gradle configuration. You can also use the **Android Sign** Step in your Bitrise Workflow Editor to have your APK signed automatically.

{% include message_box.html type="info" title="Different Android code signing procedures:" content="

* [Android code signing with Android Studio](/code-signing/android-code-signing/android-code-signing-with-android-studio/)
* [Android code signing in Gradle](/code-signing/android-code-signing/android-code-signing-in-gradle/)
* [Android code signing using Android Sign Step](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/)
  "%}