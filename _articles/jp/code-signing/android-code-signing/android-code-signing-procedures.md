---
title: Androidコード署名手順
menu:
  android-code-signing:
    weight: 2

---
[Google Play Store](https://play.google.com/store/apps)でアプリを配布する前に、APKファイルに署名をする必要があります。

code signingの設定は、Android Studioで記述することも、Gradleに手動で記述することも出来ます。Bitrise Workflow Editorで `Android Sign` stepを使用することで、APKを自動で署名することも出来ます。  

様々なAndroid code signingの方法

* [Android Studioでcode signing](/code-signing/android-code-signing/android-code-signing-with-android-studio/)
* [Gradleでcode signing](/code-signing/android-code-signing/android-code-signing-in-gradle/)
* [Bitrise Android Sign Stepを使用したcode signing](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/)