---
title: Device testing for Android
date: '2018-10-26T08:33:44.000+00:00'
redirect_from: []
tag:
- testing
- android
- firebase
summary: With Bitrise’s Android virtual device testing solution, you can run UI tests
  on emulators without having to set up and register your own devices. Our solution
  is based on Firebase Test Lab. You can find the resulting logs, videos and screenshots
  on Bitrise.
menu:
  testing-main:
    weight: 15

---
With Bitrise’s Android virtual device testing solution, you can run UI tests on emulators without having to set up and register your own devices.

{% include message_box.html type="note" title="Limitations" content="You might be limited by your overall build time. Also note that a single build can contain only one **\[BETA\] Virtual Device Testing** Step performing one type of test (`instrumentation`, `robo` or `gameloop`. "%}

Our device testing solution is based on [Firebase Test Lab](https://firebase.google.com/docs/test-lab/). You can find the resulting logs, videos and screenshots on Bitrise.

## Running tests

With Bitrise, you can choose from 3 different test types:

* robo (default test type in Bitrise)
* instrumentation
* gameloop

If you want to read up on the difference between these test types, take a look at [Firebase's documentation](https://firebase.google.com/docs/test-lab/android/overview).

There is a small difference between configuring your workflow for `robo` and `instrumentation` tests, so let's see them separately!

### Running robo tests

1. Open the Workflow you want to use in `Workflow Editor`.
2. Add the **Android Build** Step after the **Android Unit Test** Step to export an APK.
3. Add the `Debug` task to the **Variant** Step input field. This will prepare an env var containing the APK path of your build. You will need this env var in the next step.

   ![](/img/robo-test.png)
4. Add **\[BETA\] Virtual Device Testing for Android** Step after the **Android Build** Step.
5. Set the `APK path` input field.
6. Check if `robo` is the selected **Test type**.
7. Add the type of test device in the **Test devices** input field. If choosing a different device than the default, your input should have the format of `deviceID,version,language,orientation` separated with `,`.

   ![](/img/robo-test-1.png)

   Find the list of the available devices [here](https://firebase.google.com/docs/test-lab/android/available-testing-devices).
8. Start a build and [check your test results](/testing/device-testing-for-android/#checking-test-results).

#### Setting user input with Robo directives for successful robo tests

If your app needs specific user interaction for a successful robo test, you can use the **Robo Directives** input field to set those necessary inputs. For example, certain UI elements of the app are only accessible for robo testing if the required user inputs (username and email address) are populated for log in.

1. Click the **\[BETA\] Virtual Device Testing for Android** Step in your workflow.
2. Click the **Robo Test** section.
3. Find the **Robo directives** input field and set your required user input directives.
   * provide a comma-separated list of key-value pairs, where the **key** is the Android resource name of the target UI element, and the **value** is the text string. EditText fields are supported but not text fields in WebView UI elements. For example, you could use the following parameter for custom login:

         username_resource,username,ENTER_TEXT
         password_resource,password,ENTER_TEXT
         loginbtn_resource,,SINGLE_CLICK
   * One directive per line, the parameters are separated with `,` character. For example: `ResourceName,InputText,ActionType`

![](/img/robo-directives.png)

Based on the input you provide, you can successfully run a robo test (even on pages that are only accessible with a specific user input) and check the test results on the **Test Reports page**. The test results can be, for example:

* Screenshots
* Recorded video
* Logs
* Files

Here is a screenshot of a successful robo test, where the robo test got all the way through to **My application** by populating the **email** and **password** fields first with the pre-defined directives from the **Robo directives**.

![](/img/successful-robo-test.jpg)

### Running instrumentation tests

1. Open the Workflow you want to use in the Workflow Editor.
2. Add the **Android Build for UI testing** Step to your Workflow.
3. To export an APK and a Test APK, you have to set the following input fields in the **Android Build for UI testing** Step.
   * **Project Location**: the root directory of your Android project
   * **Module**: set the module you wish to build
   * **Variant**: set the variant you wish to build (usually `debug`)

   ![](/img/android-build-ui-testing.png)

   The step outputs will be `BITRISE_APK_PATH` (which is the path of the generated APK after filtering) and `BITRISE_TEST_APK_PATH` (which is the path of the generated test APK after filtering).
4. Add the **\[BETA\] Virtual Device Testing** Step right after the **Android Build for UI testing** Step.
5. Set the **Test type** to **instrumentation**.

   Our **Android Build for UI Testing** Step exports an APK and a Test APK and their paths get automatically set in the **APK path** and **Test APK path** input fields of the **\[BETA\] Virtual Device Testing** Step.
6. Add the type of test device in the **Test devices** input field. If choosing a different device than the default, your input should have the format of  `deviceID,version,language,orientation` separated with `,`.

   ![](/img/instrumentation-test-2.png)
7. Start a build and [check your test results](/testing/device-testing-for-android/#checking-test-results).

## Checking the test results

Check out the test results of your device tests on the **Test Reports** page. You can view the results of the tests run on each device, and check the details of each test case. This includes:

* Test cases
* Video
* Screenshots
* Logs
* Files generated

To view the test results:

1. Click the **Builds** tab of the app and select the build that ran the tests.
2. Under the build status, click **See more** next to the **Test reports** label.

This takes you to the **Test Reports** page. Check out our [Test Reports guide](/testing/test-reports/) to find out more about using it to analyze your test results.

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Let's run some tests!</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>