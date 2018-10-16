---
title: Android UI test on virtual devices
date: 2018-10-13 08:39:08 +0000
redirect_from: []
published: false

---
Tests run with [Firebase Test Lab](https://firebase.google.com/docs/test-lab/android/firebase-console). Bitrise provides unlimited device minutes until our `[BETA] Virtual Device Testing for Android` Step is in beta version. You can run instrumentation tests to execute your app using the Espresso framework and **UI Automator 2.0**., robo tests that analyzes your app's UI and can simulate user activity, and gameloop tests that use demo mode to simulate gamer activity.

why emulator too slow.

## Enable UI tests on virtual devices

First you need to enable device testing to your app, then select a build whose primary workflow Bitrise will extend with our building test, `Gradle Runner` and our `[BETA] Virtual Device Testing for Android` Step.

1. First you have to turn on `Device Testing` on the app's `Settings` tab. Toggle the switch to the right in the upper right corner of `Device Testing`.

   ![](/img/settings-device-testing.png)

   Save you some manual config for yourself and let Bitrise add the two steps you need in your primary workflow to perform virtual device testing. 
2. From `Settings` go to your app's `Build` page.
3. Click on a build you want to perform UI testing on.
4. If you have enabled device testing in Step 1., you should find `DEVICE TESTS BETA` next to `APPS & ARTIFACTS` tab.

   ![](/img/build-device-test.jpg)
5. Click `add step to primary workflow` to add two steps that you need for UI testing:
   * `Gradle Runner` Step to generate an APK for testing
   * `[BETA] Virtual Device Testing for Android` Step to run the tests and create the test reports of your app

     ![](/img/primary-virtual-device.png) Now check your primary workflow, it should contain `Gradle Runner` and `[BETA] Virtual Device Testing for Android` Steps in the right places.

## Modify your primary workflow

1. Open the primary workflow in `Workflow Editor`.
2. Click `Gradle Runner`
3. Add an extra task; `assembleDebugAndroidTest`, to the `Gradle task to run` step input field.

   ![](/img/assembledebugandroidtest.jpg)
4. Set the `Test APK path` of the APK you want to test **in the field**
5. Select the `**Test type**`: `robo` (by default selected), `instrumentation`, `gameloop`

   In this tutorial, we chose `robo/insturmentation`.
6. how to do instrumentation test: [https://discuss.bitrise.io/t/how-to-run-android-ui-tests-on-virtual-devices/2496/4](https://discuss.bitrise.io/t/how-to-run-android-ui-tests-on-virtual-devices/2496/4 "https://discuss.bitrise.io/t/how-to-run-android-ui-tests-on-virtual-devices/2496/4")
7. Select the type of test device in the `Test devices` input field. The format should be the following: `deviceID,version,language,orientation` separated with `,`.

   ![](/img/test-devices.png)
8. Start a build.

## Check test results

You can check UI test result on the `DEVICE TEST` tab of your app's build page. You will see the list of devices used in the UI test. If you click the device, you will get more details on the test results, status of individual tests, a video of the test, screenshots, and activity map, logs, and a list of the generated files.

You can download all the test files.