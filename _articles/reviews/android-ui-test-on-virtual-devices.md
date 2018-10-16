---
title: Android UI test on virtual devices
date: 2018-10-13 08:39:08 +0000
redirect_from: []
published: false

---
Tests run with [Firebase Test Lab](https://firebase.google.com/docs/test-lab/android/firebase-console). Bitrise provides unlimited device minutes until our `[BETA] Virtual Device Testing for Android` Step is in beta version. You can run instrumentation tests to execute your app using the Espresso framework and **UI Automator 2.0**., robo tests that analyzes your app's UI and can simulate user activity, and gameloop tests that use demo mode to simulate gamer activity.

## Enable UI tests on virtual devices

1. First you have to turn on `Device Testing` on the app's `Settings` tab. Toggle the switch to the right in the upper right corner of `Device Testing`.

   ![](/img/settings-device-testing.png)

   At this point, it's going to save you some manual config if you let Bitrise add the two steps you need in your workflow to perform virtual device testing.
2. From `Settings` go to your app's `Build` page.
3. Click on a build you want to perform UI testing on.
4. If you have enabled device testing in Step 1., you should find `DEVICE TESTS BETA` next to `APPS & ARTIFACTS` tab.

   ![](/img/build-device-test.jpg)
5. Click `add step to primary workflow` to add two steps that you need for UI testing:
   * `Gradle Runner` Step to generate an APK for testing
   * `[BETA] Virtual Device Testing for Android` Step to run the tests and create the test reports of your app

     ![](/img/primary-virtual-device.png)
Now you can check your primary workflow that it contains `Gradle Runner` and `[BETA] Virtual Device Testing for Android` in the right places.

## Modify your primary workflow

Make sure you have added `Gradle Runner` and `[BETA] Virtual Device Testing` steps to your workflow.

1. Add an extra task; `assembleDebugAndroidTest`, to the `Gradle task to run` step input field.

   ![](/img/assembledebugandroidtest.jpg)
2. Set the `Test APK path` of the APK you want to test **in the field**
3. Select the `**Test type**`: `robo` (by default selected), `instrumentation`, `gameloop`

   In this tutorial, we chose `robo/insturmentation`.
4. how to do instrumentation test: [https://discuss.bitrise.io/t/how-to-run-android-ui-tests-on-virtual-devices/2496/4](https://discuss.bitrise.io/t/how-to-run-android-ui-tests-on-virtual-devices/2496/4 "https://discuss.bitrise.io/t/how-to-run-android-ui-tests-on-virtual-devices/2496/4")
5. Select the type of test device in the `Test devices` input field. The format should be the following: `deviceID,version,language,orientation` separated with `,`.

   ![](/img/test-devices.png)
6. Start a build.

## Check test results

You can check UI test result on the `DEVICE TEST` tab of your app's build page. You will see the list of devices used in the UI test. If you click the device, you will get more details on the test results, status of individual tests, a video of the test, screenshots, and activity map, logs, and a list of the generated files.

You can download all the test files.