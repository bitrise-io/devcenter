---
title: Build and deploy multiple flavor APKs to the Play Store
date: 2018-10-08 11:02:02 +0000
redirect_from: []
published: false

---
You can have an app with multiple flavors where flavors represent different versions of the core app. Each version has different features or accessibility options added to them. Each of these versions can be built and released to an App Store or deployed to the same device. 

Build types are not the same as build flavors. Build types mean how the app is built and packaged such as a debug or a release build. If you have two flavors of the same app and at least two build types, it means 4 different versions, build variants can be made.

?code signing files will be the same for all flavors and build variants?

You can check the definitions of the app flavors in `build.gradle` file.

You can define as many flavors as many configuration you need to add to your app, meaning each configuration can be have its own flavor package/directory . Once an app has received a flavor, it cannot be released as a flavorless app. It is possible to have multiple flavors of your Android APK  and have them built and released separately from their main/base/full version. 

Make sure that you have saved the application ID of your flavors since Google Play Store will require the unique app ID of the app version you're uploading.

* This comes in handy when you want to add different features or create a free/ version of the same app. 
* With separate building and deployment process, you can also avoid having a gigantic APK file. 

## Generate a build using build variant

Anything to do in Gradle beforehand?

Have the Gradle Runner/Android Build step in your workflow to assemble the flavor. You can have as many Gradle Runner/Android Build step in your workflow as many flavors you want to build.

In the Gradle Runner step define the following inputs:

* In the Gradle Task to run, define the action:
  * assemble - Assembles all variants of all applications and secondary packages. 
  * assembleAndroidTest - Assembles all the Test applications. 
  * assembleDebug - Assembles all Debug builds.
  * assembleRelease - Assembles all Release builds.

## Release and deploy a build

Add the Deploy to Google Play Store step to your workflow as many times as you had the Gradle Runner step in your workflow.

Or simoly use env vars and reference them?