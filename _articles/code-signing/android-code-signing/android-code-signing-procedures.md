---
title: Android code signing procedures
menu:
  android-code-signing:
    weight: 1

---
Before you distribute your app through [Google Play Store](https://play.google.com/store/apps), your APK file must be digitally signed.

You can specify the code signing configuration for your project in Android Studio or manually in your Gradle configuration. You can also use the `Sign ApK` step in your Bitrise Workflow Editor to have your APK signed automatically.

{% include message_box.html type="info" title="Different Android code signing procedures:" content="

* [Android code signing with Android Studio](/code-signing/android-code-signing/android-code-signing-with-android-studio/)
* [Android code signing in Gradle](/code-signing/android-code-signing/android-code-signing-in-gradle/)
* [Android code signing using Bitrise Sign APK step](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/)
  "%}