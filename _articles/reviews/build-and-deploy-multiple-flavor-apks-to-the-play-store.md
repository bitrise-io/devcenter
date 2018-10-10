---
title: Build and deploy multiple flavor APKs in a single workflow to the Play Store
date: 2018-10-08 11:02:02 +0000
redirect_from: []
published: false

---
You can release and deploy multiple flavors of your Android APK separately from their main version using only one workflow. no need for separate workflows for every flavor to be built!

* Van egy sample appunk a multiple flavor androidra?
* Hogy jon a kepbe a while label app dolog. \[white label app - an app that can be further customized based on the reseller's requirements.\]
* user feedback: "There's a chance I missed something but I couldn't find a way to deploy multiple flavors out-of-the-box without assigning a different workflow for each, or writing custom scripting steps.

  More specifically and from what I can remember, **the Bitrise-provided environment variable $BITRISE_SIGNED_APK_PATH only returned a random package out of all, and the $BITRISE_APK_PATH_LIST (sic) was mixing up packages resulting to "incorrect package" errors from Google Play.** I submitted a disc_ssion post about the matter which either got deleted or I can't seem to re-visit it._

## Difference between build types and product flavors:

* **BUILD TYPE:** when creating a new module in Android Studio, it creates a **release and debug** \[used every time when you develop an app until you switch to the release build type\] **build types automatically** of the app. build types mean a the same code base and UI but different compilation/packaging!
* **PRODUCT FLAVOR:** app can have multiple flavors where flavor means different behavior between different versions/flavors of the same app- different version of the core app BUT with extra features:
  * free or paid version of the app
  * different versions based on user roles (admin, customer) or client groups
  * demo and full version of the app

  You can check your flavors in the `scr` \[source\] folder in Android Studio - ON BITRISE? WHAT OTHER FLAVORS CAN BE \[dimensions\].

      android {
      ...
      defaultConfig {...}
      buildTypes {...}
      productFlavors {
      admin {
      ..
      }
      customer {
      ..
      }
      }
      }
  * **BUILD VARIANT** - it combines the app's **build types and flavors.** You can check them in the Build Variant tab of Android Studio.

  freeDebug

  freeRelease

  paidDebug

  paidRelease

More on shared code stored in the main folder and flavor folders in Android Studio Guide.

Once you know which flavor you want to build, the only thing you need to modify is the `Gradle task to run` input in Android Build step. Here you can add the build variant ( which is the combination of build type and flavor) or variants.

If you need multiple variants in a single build, you have options:

1. Set an `assembleX` task, for example, `assembleDebug` in the `Gradle task to run` field of Android Build.

   It **generates all flavors** in a build or **just lists the tasks separated by a 		space**:

   `assembleFlavor1Debug assembleFlavor2Debug`
2. Use multiple Gradle Runner steps so you can define the flavors you need one by one in one workflow:

   `assembleFlavor1Debug` in Gradle Runner no. 1

   `assembleFlavor2Debug` in Gradle Runner no. 2

   Using separate Gradle Runner steps enables the $BITRISE_APK_PATH to contain the 		flavor that has just been built. For example: /path/to/my/flavor1-debug.apk and 		/path/to/my/flavor2-debug.apk This way the **Sign APK, Deploy to bitrise.io and the 	Google Play Deploy steps can automatically pick up the APK to code sign and deploy 		your app.**
3. Have **one Gradle Runner step which generates all the flavors of the ap**p and insert as **many Google Play Deploy** step as many flavors you want to deploy.
4. Have one **workflow with the defined Gradle Runner and Google Play Deploy steps and set the variables as env vars**? Then create multiple workflows which will run this template utility after setting the env var.

Code signing procedure is the same for every build variant.