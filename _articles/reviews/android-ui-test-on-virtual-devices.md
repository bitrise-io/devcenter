---
title: Device testing for Android
date: 2018-10-13 08:39:08 +0000
redirect_from: []
published: false

---
With Bitrise’s Android virtual device testing solution, you can run Android tests on physical devices without having to set up and register your own devices: you just need to use our dedicated Steps and set the device type(s) on which you want to test your app. There are no limits to using the Step, other than your overall build time limit.

Our device testing solution is based on [Firebase Test Lab](https://firebase.google.com/docs/test-lab/): it uses real, production devices running in a Google data center to test your app. These devices are flashed with updated APIs and have customizable locale settings. You can find the resulting logs, videos and screenshots on Bitrise.

## Enabling device testing

First you need to enable device testing to your app, then select a build whose primary workflow Bitrise will extend with our `Gradle Runner` and `[BETA] Virtual Device Testing for Android` Step.

1. First you have to turn on `Device Testing` on the app's `Settings` tab. Toggle the switch to the right in the upper right corner of `Device Testing`.

   ![](/img/settings-device-testing.png)

   Save some manual config for yourself and let Bitrise add the two steps you need in your primary workflow to perform virtual device testing.
2. From `Settings` go to your app's `Build` page.
3. Click on a build you want to test.
4. If you have enabled device testing in Step 1., you should find `DEVICE TESTS BETA` next to `APPS & ARTIFACTS` as a third tab.

   ![](/img/build-device-test.jpg)
5. Click `add step to primary workflow` to add two steps that you need for device testing:
   * `Gradle Runner` Step to generate an APK for testing
   * `[BETA] Virtual Device Testing for Android` Step to run the tests and create the test reports of your app

     ![](/img/primary-virtual-device.png)
     Now check your primary workflow, it should contain `Gradle Runner` and `[BETA] Virtual Device Testing for Android` Steps in the right places.

## Running tests

With Bitrise, you can choose from 3 different test types:

* robo - default test type in Bitrise to do what. Learn more about robo test [here](https://firebase.google.com/docs/test-lab/android/robo-ux-test).
* instrumentation - unit test? for Bitrise?
* gameloop - [test](https://firebase.google.com/docs/test-lab/android/game-loop) type where player actions are simulated while a game app runs.

### Running robo tests

1. Open the primary workflow of your build in `Workflow Editor`.
2. Click `Gradle Runner` Step.
3. Add the `assembleDebug` task to the `Gradle task to run` Step input field. This will prepare a debug APK env var containing the debug APK path of your build. You will need this env var in the next step.

   ![](/img/assembedebug-gradle.jpg)
4. Click `[BETA] Virtual Device Testing for Android.`
5. Set your APK env var in the `APK path` input field.
6. Check if `robo` is the selected test type in the `Test type` field.
7. Add the type of test device in the `Test devices` input field. The format should be the following: `deviceID,version,language,orientation` separated with `,`.

   ![](/img/test-devices.png)
8. Start a build.

### Running instrumentation tests

1. Open the primary workflow of your build in `Workflow Editor`.
2. Click `Gradle Runner` Step.
3. Add the `assembleDebugAndroidTest` task after `assembleDebug` task to the `Gradle task to run` input field. This will build an APK and a debug APK env var containing the debug APK path of your build. You will need this env var in the next step.
4. Click `[BETA] Virtual Device Testing for Android`.
5. Set your **Debug/Test APK** env var in the `APK path` input field in `[BETA] Virtual Device Testing for Android`.
6. Select `instrumentation` as `Test type`.
7. Add the type of test device in the `Test devices` input field. The format should be the following: `deviceID,version,language,orientation` separated with `,`.
8. _Optional_: Under `Instrumentation Test` section you can set the test APK path.

   ![](/img/instrumentation-test.png)

## Check test results

You can check UI test result on the `DEVICE TEST` tab of your app's build page. You will see the list of devices used in the UI test. If you click the device, you will get more details on the test results, status of individual tests, a video of the test, screenshots, and activity map, logs, and a list of the generated files.

You can download all the test files.

how to do unit testing in bitrise, link it here.

* for robo tests - video and screenshots available


* for instrumentation tests - logs available