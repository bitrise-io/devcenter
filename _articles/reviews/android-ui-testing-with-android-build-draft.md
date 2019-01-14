---
title: Android UI testing with Android Build - draft
redirect_from: []
date: 2019-01-14 11:32:07 +0000
published: false

---
the step generates two APKs (normal app and the other is the AndroidTest one). Upload both of them to Firebase with the VDT step. no need for Gradle Runner to run these two commands: `app:assembleDebug` and `:app:assembleDebugAndroidTest. `

**What does this step:**  
Builds your Android project via gradle with the belonging AndroidTest variant.  
E.g: `gradlew ":app:assembleDemoDebug" ":app:assembleDemoDebugAndroidTest"`

**Why would you need it?**  
This step will generate all the APKs what you will need to run instrumentation test for your Android app.  
It will generate an APK from your app and the belonging test APK too.

**Required inputs for the step:**  
`project_location`: The root directory of your android project, for example, where your root build gradle file exist (also gradlew, settings.gradle, etc...)  
`module`: Set the module that you want to build. To see your available modules please open your project in Android Studio and go in \[Project Structure\] and see the list on the left.  
`variant`: Set the variant that you want to build. To see your available variants please open your project in Android Studio and go in \[Project Structure\] -> variants section.  
`apk_path_pattern`: After the build the step will find the APK files with the given pattern.

**Step outputs:**  
`BITRISE_APK_PATH`:  
Path of the generated (and copied) APK - after filtering.

`BITRISE_TEST_APK_PATH`:  
Path of the generated (and copied) test APK - after filtering.