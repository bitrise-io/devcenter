---
# jp title missing
title: Android UI testing with Android Build - draft
redirect_from: []
date: 2019-01-14 11:32:07 +0000
published: false

---

{% include not_translated_yet.html %}

With Bitrise’s Android virtual device testing solution, you can run UI tests on emulators without having to set up and register your own devices.

{% include message_box.html type="note" title="Limitations" content="You might be limited by your overall build time. Also note that a single build can contain only one `[BETA] Virtual Device Testing` Step performing one type of test (`instrumentation`, `robo` or `gameloop`. "%}

Our device testing solution is based on [Firebase Test Lab](https://firebase.google.com/docs/test-lab/). You can find the resulting logs, videos and screenshots on Bitrise.

## Enabling device testing

1. First you have to turn on `Device Testing` on the app's `Settings` tab. Toggle the switch to the right in the upper right corner of `Device Testing`.

   ![](/img/settings-device-testing.png)
2. From `Settings`, go to your app's `Build` page.
3. Click on a build you want to test.
4. If you have enabled device testing in Step 1., you should find `DEVICE TESTS BETA` next to `APPS & ARTIFACTS` as a third tab. Click it!

   ![](/img/build-device-test.jpg)
5. Click `add step to primary workflow` to add two steps that you need for device testing to your primary workflow:
   * `Android Build` Step for `robo` test or `Android Build for UI Testing` Step for `instrumentation` test
   * `[BETA] Virtual Device Testing for Android` Step to run tests and create test reports.![](/img/primary-virtual-device.png)

## Running tests

With Bitrise, you can choose from 3 different test types:

* robo (default test type in Bitrise)
* instrumentation
* gameloop

If you want to read up on the difference between these test types, take a look at [Firebase's documentation](https://firebase.google.com/docs/test-lab/android/overview).

There is a small difference between configuring your workflow for `robo` and `instrumentation` tests, so let's see them separately!

### Running robo tests

1. Open the primary workflow of your build in `Workflow Editor`.
2. Add the `Android Build` Step after the `Android Unit Test` Step to export an APK.
3. Add the `Debug` task to the `Variant` Step input field. This will prepare an env var containing the APK path of your build. You will need this env var in the next step.

   ![](/img/robo-test.png)
4. Add `[BETA] Virtual Device Testing for Android` Step after `Android Build` Step.
5. Set the `APK path` input field.
6. Check if `robo` is the selected `Test type`.
7. Add the type of test device in the `Test devices` input field. If choosing a different device than the default, your input should have the format of `deviceID,version,language,orientation` separated with `,`.

   ![](/img/robo-test-1.png)

   Find the list of the available devices [here](https://firebase.google.com/docs/test-lab/android/available-testing-devices).
8. Start a build and [check your test results](/testing/device-testing-for-android/#running-instrumentation-tests).

### Running instrumentation tests

1. Open the `primary workflow` of your build in `Workflow Editor`.
2. Add the `Android Build for UI testing` Step to your workflow.
3. To export an APK and a Test APK, you have to set the following input fields in the `Android Build for UI testing` Step.
   * `Project Location`: the root directory of your Android project
   * `Module`: set the module you wish to build
   * `Variant`: set the variant you wish to build

   ![](/img/android-build-ui-testing.png)

   The step outputs will be `BITRISE_APK_PATH` (which is the path of the generated APK after filtering) and `BITRISE_TEST_APK_PATH` (which is the path of the generated test APK after filtering).
4. Add the `[BETA] Virtual Device Testing` Step right after the `Android Build for UI testing` Step.
5. Set the `Test type` to `instrumentation`.

   Our `Android Build for UI Testing` Step exports an APK and a Test APK and their paths get automatically set in the `APK path` and `Test APK path` input fields of the `[BETA] Virtual Device Testing` Step.
6. Add the type of test device in the `Test devices` input field. If choosing a different device than the default, your input should have the format of  `deviceID,version,language,orientation` separated with `,`.

   ![](/img/instrumentation-test-2.png)
7. Start a build and [check your test results](/testing/device-testing-for-android/#running-instrumentation-tests).

## Checking test results

You can check UI test result on the `DEVICE TESTS` tab of your app's build page.

1. Go back to your `Builds` page, select your build, and click `DEVICE TESTS` tab to check your test result.
2. Click the device you've tested your project on.

   ![](/img/device-test-page.jpg)

You can view test cases and downloadable logs if you've selected `instrumentation` test and a video and screenshots if you've selected `robo` as test type. Or scroll down and download all your reports in `FILES GENERATED`.
