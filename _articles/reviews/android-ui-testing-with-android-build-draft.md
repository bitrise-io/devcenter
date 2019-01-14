---
title: Android UI testing with Android Build - draft
redirect_from: []
date: 2019-01-14 11:32:07 +0000
published: false

---
This Step generates two APKs which you need to run instrumentation test for your Android App. The step conveniently generates an **APK from your app and a test APK** which then you can upload to Firebase with the `[BETA] Virtual Device Testing for Android` Step. Behind the scenes, the Step builds your Android project and an Android Test variant with gradle, therefore, there is no need for `Gradle Runner` Step to run these two commands: `app:assembleDebug` and `:app:assembleDebugAndroidTest.`

**Required inputs for the step for Android Build for UI testing**  
`project_location`: The root directory of your android project, for example, where your root build gradle file exist (also gradlew, settings.gradle, etc...)  
`module`: Set the module that you want to build. To see your available modules please open your project in Android Studio and go in \[Project Structure\] and see the list on the left.  
`variant`: Set the variant that you want to build. To see your available variants please open your project in Android Studio and go in \[Project Structure\] -> variants section.  
`apk_path_pattern`: After the build the step will find the APK files with the given pattern. **And VDT can pick them app?**

**Step outputs:**  
`BITRISE_APK_PATH`:  
Path of the generated (and copied) APK - after filtering.

`BITRISE_TEST_APK_PATH`:  
Path of the generated (and copied) test APK - after filtering.

**Why would you need it?**  
This step will generate all the APKs what you will need to run instrumentation test for your Android app.  
It will generate an APK from your app and the belonging test APK too.

**What does this step:**  
Builds your Android project via gradle with the belonging AndroidTest variant.  
E.g: `gradlew ":app:assembleDemoDebug" ":app:assembleDemoDebugAndroidTest"`

With Bitrise’s Android virtual device testing solution, you can run UI tests on emulators without having to set up and register your own devices: you just need to use our dedicated Steps and set the device type(s) on which you want to test your app.

{% include message_box.html type="note" title="Limitations" content="You might be limited by your overall build time. Also note that a single build can contain only one `[BETA] Virtual Device Testing` Step performing one type of test (`instrumentation`, `robo` or `gameloop`. "%}

Our device testing solution is based on [Firebase Test Lab](https://firebase.google.com/docs/test-lab/). You can find the resulting logs, videos and screenshots on Bitrise.

## Enabling device testing

First you need to enable device testing to your app, then select a build whose primary workflow Bitrise will extend with our `Gradle Runner` and `[BETA] Virtual Device Testing for Android` Step.

1. First you have to turn on `Device Testing` on the app's `Settings` tab. Toggle the switch to the right in the upper right corner of `Device Testing`.

   ![](/img/settings-device-testing.png)
2. From `Settings` go to your app's `Build` page.
3. Click on a build you want to test.
4. If you have enabled device testing in Step 1., you should find `DEVICE TESTS BETA` next to `APPS & ARTIFACTS` as a third tab. Click it!

   ![](/img/build-device-test.jpg)
5. Click `add step to primary workflow` to add two steps that you need for device testing to your primary workflow:
   * `Android Build` S**tep to generate an APK for testing**
   * `[BETA] Virtual Device Testing for Android` Step to run the tests and create the test reports![](/img/primary-virtual-device.png)

## Running tests

With Bitrise, you can choose from 3 different test types:

* robo (default test type in Bitrise)
* instrumentation
* gameloop

If you want to read up on the difference between these test types, take a look at [Firebase's documentation](https://firebase.google.com/docs/test-lab/android/overview).

There is a small difference between configuring your workflow for `robo` and `instrumentation` tests, so let's see them separately!

### Running robo tests

1. Open the primary workflow of your build in `Workflow Editor`.
2. **Add an** `**Android Build**` **Step after t**he `Android Unit Test` Step to **export an APK** 
3. Add the `Debug` task to the `Variant` Step input field. This will prepare an env var containing the APK path of your build. You will need this env var in the next step.

   ![](/img/robo-test.png)
4. Add `[BETA] Virtual Device Testing for Android` Step after `Android Build` Step.
5. Set the `APK path` input field.
6. Check if `robo` is the selected `Test type`. It should be since it is the default test type.
7. Add the type of test device in the `Test devices` input field. If choosing a different device than the default, your input should have the format of `deviceID,version,language,orientation` separated with `,`.

   ![](/img/test-devices-android.png)

   Find the list of the available devices [here](https://firebase.google.com/docs/test-lab/android/available-testing-devices).
8. Start a build. csak app apk-t kreal, nincs test, itt marad az android build.

### Running instrumentation tests

1. Open the `primary workflow` of your build in `Workflow Editor`.
2. Add the `Android Build for UI testing` Step to your wofkflow. To export and APK and a Test APK you have to set the following input fields:
- project location:
- module:
- variant:
3. Add the [BETA] Virtual Device Testing` Step right after the `Android Build for UI testing` Step. Set the following:
- Test type:Select `instrumentation` as `Test type`
7. Add the type of test device in the `Test devices` input field. If choosing a different device than the default, your input should have the format of  `deviceID,version,language,orientation` separated with `,`.

   ![](/img/instrumentation-test.png)
8. Start a build.

## Checking test results

You can check UI test result on the `DEVICE TESTS` tab of your app's build page.

1. Go back to your `Builds` page, select your build, and click `DEVICE TESTS` tab to check your test result.
2. Click the device you've tested your project on.

   ![](/img/device-test-page.jpg)

You can view test cases and downloadable logs if you've selected `instrumentation` test and a video and screenshots if you've selected `robo` as test type. Or scroll down and download all your reports in `FILES GENERATED`.

module;app

variant:debug

be vdt

be instur

alapbol a test apk path es az apk path van beegetve