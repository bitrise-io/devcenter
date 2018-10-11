[Google Play Store](https://play.google.com/store/apps)でアプリを配布する前に、APKファイルに署名をする必要があります。

code signingの設定は、Android Studioで記述することも、Gradleに手動で記述することも出来ます。
Bitrise Workflow Editorで`sign-apk`ステップを使用することで、自動でAPKファイルを署名することも出来ます。

Androidでのそれぞれのcode signingの方法

* [Android Studioを使ったcode signing](/code-signing/android-code-signing/android-code-signing-with-android-studio/)
* [Gradleを使ったcode signing](/code-signing/android-code-signing/android-code-signing-in-gradle/) 
* [Bitrise Sign APK ステップを利用したcode signing](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/)