---
title: Android UI test on virtual devices
date: 2018-10-13 08:39:08 +0000
redirect_from: []
published: false

---
## Enable UI tests on virtual devices

Turn on `Device Testing` on the app's `Settings` tab.

1. Toggle the switch to the right.
2. Add the Virtual Device Testing step to your primary workflow.
3. Check results from the build's page under `APPS & ARTIFACTS`.

   ![](/img/android-vdt-turn-on.jpg)

## Modify your primary workflow

1. Add `Gradle Runner` Step after testing steps before the deploy tests.
2. Add an extra task; `assembleDebugAndroidTest`, to the `Gradle task to run` step input field.

   ![](/img/assembledebugandroidtest.jpg)
3. Add `[BETA] Virtual Device Testing for Android` Step after `Gradle Runner` Step.
4. Set the `Test APK path` of the APK you want to test **in the field**
5. Select the `**Test type**`: `robo` (by default selected), `instrumentation`, `gameloop`

   In this tutorial, we chose `robo`.
6. how to do instrumentation test: [https://discuss.bitrise.io/t/how-to-run-android-ui-tests-on-virtual-devices/2496/4](https://discuss.bitrise.io/t/how-to-run-android-ui-tests-on-virtual-devices/2496/4 "https://discuss.bitrise.io/t/how-to-run-android-ui-tests-on-virtual-devices/2496/4")
7. Select the type of test device in the `Test devices` input field. The format should be the following: `deviceID,version,language,orientation` separated with `,`. You can check the **available test devices** and its versions if you click on the arrow for more information above the step input field.

   ![](/img/test-devices.png)
 8. Start a build.