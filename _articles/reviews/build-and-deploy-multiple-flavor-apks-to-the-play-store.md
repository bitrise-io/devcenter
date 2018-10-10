---
title: Build and deploy multiple flavor APKs in a single workflow
date: 2018-10-08 11:02:02 +0000
redirect_from: []
published: false

---
You can deploy multiple flavor APKs in one workflow using our Gradle Runner, Sign APK and a deploy step.

`Android Build` step can only build one variant so if this step is part of your workflow, then we advise you to replace it with `Gradle Runner` step.

1. In Gradle Runner step, set the task names of your build variants in `Gradle task to run` step input field. Each task name must be exactly the same name that you have as a build variant name in \[Android Studio\]! Make sure you separate them only with a space, no need for `,` separation! In the below image, you can see the order of the steps for the deploy workflow and the `Gradle Task to run` step input with two build variant we're building:

   `assembleMyflavorDebug` and `assembleMyflavorDebugAndroidTest`
   ![](/img/gradle-multiflavor.jpg)

   Gradle Runner generates a `BITRISE_APK_PATH_LIST` env var that contains ALL the build variants you have set in the step input above. Note that we have another env var for building one APK, that is the `BITRISE_APK_PATH`.
2. Add the Sign APK step if it's missing from your workflow.
3. Set the `$BITRISE_APK_PATH_LIST` in the `apk path` input field. This will make sure all the required apks will get code signed with the uploaded keystore file. Check out how you can upload your keystore file to bitrise.io.
4. Add the Google Play Depoy step to AFTER the Sign APK step.
5. In Google Play Deploy, set the `$BITRISE_SIGNED_APK_PATH` env var in the `APK or App Bundle file path` step input field so that Google Play Deploy can release all your build variants set in this env var.

If you need to use another keystore

white label-  universalis app, tovabb lehet fejleszteni a megrendelok igenyei szerint. (color, logo, signing files of the first rest)  ha mas megrendelok vannak, kulonbozo keystore file , es akkor tobb sing apk step. vagy az andrroidos projektben amikor egy task buildelok akkor signolodjon az apk. vagy android studio val signoljam. de ugyanabban a mappaban legyen a keystore, legyen env var. (olvassa el h a gradle settingsben hogyan tudsz code signingolni) You can release and deploy multiple flavors of your Android APK separately from their main version using only one workflow. no need for separate workflows for every flavor to be built!


android buld es gradle runner is ugy mukodik, h ezeknek eket outputja van: bitrise apk_path es bitrise apk_path list. ha egy apk generalt akkor az bemegy a bitrise apk pahtbe, es belerakjuk az apk listbe (pipe separalva) minden tovabbi step vagyis sign apk es google pkay deploy tudjak fogadni a z ak patht es a listet is. (listnel van az h tobb build is kigeneralodik) sign apk es google play deployt h a listesre mutasson, ezt be kell allitani, ugyanazzal az egy keystorrral.

1 task egy flavourt tud buildelni, miden task nevnek tartamaznia kell a flavour nevet.

1. sign: berakom asign apk stepet, es az apk step inputjat atallitom. a listes verioja. igy a sing aok tobb aokt lesignol a megadott keystorral.
2. sign apk kiexportalja h bitrise sign apk step ez az output. listazza az osszes flavourt ami signolva van
3. berak google play deploy, berakom az ak_path inputot raallitom a sign apk step outputjara.
4. deploy to bitrise. io - minden ami a deploy mpaabbaban van az kideployolodik

bekonofizom a sign apkt h a listet varja ezzel vegig signolja a listat,es a signolt apkat a bitrise a sing apk env be rakja be es a google play deploy ez alapjan deployol ezt az envet kell megadnom a bitrise sign _apk path-t ezt a az apk-app bundle file path-be be kell rakni.

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

More on shared code stored in the main folder and flavor folders in Android Studio Guide