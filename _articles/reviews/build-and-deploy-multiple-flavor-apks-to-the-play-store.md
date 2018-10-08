---
title: Build and deploy multiple flavor APKs to the Play Store
date: 2018-10-08 11:02:02 +0000
redirect_from: []
published: false

---
You can have an app with multiple flavors where flavors represent different versions of the core app. Each version has different features to them. Each of these versions can be built and released to an App Store or deployed to the same device. 

Build types are not the same as build flavors. Build types mean how the app is built and packaged such as a debug or a release build. If you have two flavors of the same app and at least two build types, it means 4 different versions, that is, build variants can be made.

It is possible to have multiple flavors of your Android APK  and have them built and released separately from their main/base/full version. 

* This comes in handy when you want to add different features to different versions of your APK. 
* With separate building and deployment process, you can also avoid having a gigantic APK file. 

## Generate a build using build variant

Anything to do in Gradle beforehand?

Have the Gradle Runner/Android Build step in your workflow to assemble the Android flavor. Have as many Gradle Runner/Android Build step in your workflow as many flavors you want to build.

In the Gradle Runner step define the following inputs:

In the Gradle Task to run, define the action 

## Release and deploy a build