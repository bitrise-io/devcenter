---
title: Device testing for Android
date: '2018-10-26T08:33:44.000+00:00'
redirect_from: []
menu:
  testing:
    weight: "11"

---
With Bitrise’s Android virtual device testing solution, you can run UI tests on emulators without having to set up and register your own devices.

{% include message_box.html type="note" title="Limitations" content="You might be limited by your overall build time. Also note that a single build can contain only one `[BETA] Virtual Device Testing` Step performing one type of test (`instrumentation`, `robo` or `gameloop`. "%}

Our device testing solution is based on [Firebase Test Lab](https://firebase.google.com/docs/test-lab/). You can find the resulting logs, videos and screenshots on Bitrise.

## Enabling device testing

1. First you have to turn on `Device Testing` on the app's `Settings` tab. Toggle the switch to the right in the upper right corner of `Device Testing`.

   ![](/img/enable-ui-test-on-virtual-devices.png)
2. From `Settings`, go to your app's `Build` page.
3. Click on a build you want to test.
4. If you have enabled device testing in Step 1., you should find `DEVICE TESTS BETA` next to `APPS & ARTIFACTS` as a third tab. Click it!

   ![](/img/builds-device tests.png)
5. Click `add step to primary workflow` to add two steps that you need for device testing to your primary workflow:
   * `Android Build` Step for `robo` test or `Android Build for UI Testing` Step for `instrumentation` test
   * `[BETA] Virtual Device Testing for Android` Step to run tests and create test reports.

     ![](/img/add-step-to-primary-workflow.png)

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
4. Add `[BETA] Virtual Device Testing for Android` Step after the `Android Build` Step.
5. Set the `APK path` input field.
6. Check if `robo` is the selected `Test type`.
7. Add the type of test device in the `Test devices` input field. If choosing a different device than the default, your input should have the format of `deviceID,version,language,orientation` separated with `,`.

   ![](/img/robo-test-1.png)

   Find the list of the available devices [here](https://firebase.google.com/docs/test-lab/android/available-testing-devices).
8. Start a build and [check your test results](/testing/device-testing-for-android/#checking-test-results).

#### Setting user input with Robo directives for successful robo tests

If your app needs specific user interaction for a successful robo test, you can use the `Robo Directives` input field to set those necessary inputs. For example, certain UI elements of the app are only accessible for robo testing if the required user inputs (username and email address) are populated for log in.

1. Click the `[BETA] Virtual Device Testing for Android` Step in your workflow.
2. Click the `Robo Test` section.
3. Find the `Robo directives` input field and set your required user input directives.
   * provide a comma-separated list of key-value pairs, where the **key** is the Android resource name of the target UI element, and the **value** is the text string. EditText fields are supported but not text fields in WebView UI elements. For example, you could use the following parameter for custom login:

         username_resource,username,ENTER_TEXT
         password_resource,password,ENTER_TEXT
         loginbtn_resource,,SINGLE_CLICK
   * One directive per line, the parameters are separated with `,` character. For example: `ResourceName,InputText,ActionType`

![](/img/robo-directives.png)

Based on the input you provide, you can successfully run a robo test (even on pages that are only accessible with a specific user input) and check the test results on the `DEVICE TESTS` tab of your Build's page. The test results can be, for example:

* screenshots of the final state of the Emulator screen
* recorded video
* logs
* files

Here is a screenshot of a successful robo test, where the robo test got all the way through to `My application` by populating the `email` and `password` fields first with the pre-defined directives from the `Robo directives`.

![](/img/successful-robo-test.jpg)

### Running instrumentation tests

1. Open the `primary workflow` of your build in `Workflow Editor`.
2. Add the `Android Build for UI testing` Step to your workflow.
3. To export an APK and a Test APK, you have to set the following input fields in the `Android Build for UI testing` Step.
   * `Project Location`: the root directory of your Android project
   * `Module`: set the module you wish to build
   * `Variant`: set the variant you wish to build (usually `debug`)

   ![](/img/android-build-ui-testing.png)

   The step outputs will be `BITRISE_APK_PATH` (which is the path of the generated APK after filtering) and `BITRISE_TEST_APK_PATH` (which is the path of the generated test APK after filtering).
4. Add the `[BETA] Virtual Device Testing` Step right after the `Android Build for UI testing` Step.
5. Set the `Test type` to `instrumentation`.

   Our `Android Build for UI Testing` Step exports an APK and a Test APK and their paths get automatically set in the `APK path` and `Test APK path` input fields of the `[BETA] Virtual Device Testing` Step.
6. Add the type of test device in the `Test devices` input field. If choosing a different device than the default, your input should have the format of  `deviceID,version,language,orientation` separated with `,`.

   ![](/img/instrumentation-test-2.png)
7. Start a build and [check your test results](/testing/device-testing-for-android/#checking-test-results).

## Checking test results

You can check UI test result on the `DEVICE TESTS` tab of your app's build page.

1. Go back to your `Builds` page, select your build, and click `DEVICE TESTS` tab to check your test result.
2. Click the device you've tested your project on.

You can view test cases and downloadable logs if you've selected `instrumentation` test and a video and screenshots if you've selected `robo` as test type. Or scroll down and download all your reports in `FILES GENERATED`.