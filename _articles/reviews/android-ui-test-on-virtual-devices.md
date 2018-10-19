---
title: Device testing for Android
date: 2018-10-13 08:39:08 +0000
redirect_from: []
published: false

---
With Bitrise’s Android virtual device testing solution, you can run UI tests on emulators without having to set up and register your own devices: you just need to use our dedicated Steps and set the device type(s) on which you want to test your app. There are no limits to using the Step, other than your overall build time limit.

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
   * `Gradle Runner` Step to generate an APK for testing
   * `[BETA] Virtual Device Testing for Android` Step to run the tests and create the test reports![](/img/primary-virtual-device.png)

## Running tests

With Bitrise, you can choose from 3 different test types:

* robo (default test type in Bitrise)
* instrumentation
* gameloop

If you want to read up on the difference between these test types, take a look at [Firebase's documentation](https://firebase.google.com/docs/test-lab/android/overview).

### Running robo tests

1. Open the primary workflow of your build in `Workflow Editor`.
2. Add an `Android Build` Step after the `Android Unit Test` Step to export an APK.
3. Add the `Debug` task to the `Variant` Step input field. This will prepare an env var containing the APK path of your build. You will need this env var in the next step.

   ![](/img/robo-test.png)
4. Add `[BETA] Virtual Device Testing for Android` Step after `Android Build` Step.
5. Set the `APK path` input field.
6. Check if `robo` is the selected `Test type`.
7. Add the type of test device in the `Test devices` input field. If choosing a different device than the default, your input should have the format of `deviceID,version,language,orientation` separated with `,`.

   ![](/img/test-devices.png)
8. Start a build.

### Running instrumentation tests

1. Open the `primary workflow` of your build in `Workflow Editor`.
2. Add two `Android Build` Steps after `Android Unit Test` Step. We will export an APK in the first build step and a test APK in the second build step.
3. In the first `Android Build` Step, add the `Debug` task to the `Variant` field.
4. In the second `Android Build` Step, add the `DebugAndroidTest` task into the `Variant` field.

![](/img/instrumentation-test-1.png)

1. Click `bitrise.yml` tab and edit the primary workflow by adding the [output alias](https://devcenter.bitrise.io/bitrise-cli/step-outputs/#exporting-step-outputs-in-output-aliases/) for instrumentation testing to your second `Android Build` step. This will replicate to the `Test APK path` field of the `Instrumentation Test` section of the `[BETA] Virtual Device Testing` step. With this little trick, you will be able to output a test APK as well.

        - android-build@0.9.5:
               inputs:
               - variant: Debug
               - module: app
           - android-build@0.9.5:
               inputs:
               - variant: DebugAndroidTest
               - module: app
               outputs:
               - BITRISE_APK_PATH: BITRISE_TEST_APK_PATH

   ![](/img/virtual-device.png)
2. Select `instrumentation` as `Test type` in `[BETA] Virtual Device Testing step`.
3. Add the type of test device in the `Test devices` input field. If choosing a different device than the default, your input should have the format of  `deviceID,version,language,orientation` separated with `,`.

   ![](/img/instrumentation-test.png)

## Check test results

You can check UI test result on the `DEVICE TEST` tab of your app's build page. You will see the list of devices used in the UI test. If you click the device, you will get more details on the test results, status of individual tests, a video of the test, screenshots, and activity map, logs, and a list of the generated files.

You can download all the test files.

how to do unit testing in bitrise, link it here.

* for robo tests - video and screenshots available
* for instrumentation tests - logs available

robo - minden menut funkciot vegignyomkod, vieoval, screenshottal

insturmentation test - en mondom h mit teszteljen, selectaltabb.