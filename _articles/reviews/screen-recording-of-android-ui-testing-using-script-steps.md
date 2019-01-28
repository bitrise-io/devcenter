---
title: Screen recording of Android UI testing using Script Steps
redirect_from:
- ''
date: 2019-01-14 12:57:07 +0000
published: false

---
You can run your UI test specific to your app and have the whole process screen recorded using one Bitrise workflow. Let's see how to put together a workflow using our `AVD Manager`, `Wait for Android Emulator` and `Script` Steps! Here is an example workflow containing the steps we will use in this guide:

![](/img/screenrecording-ui-workflow.png)

1. Add the `AVD Manager` Step to your workflow, preferably after any dependency installer step, to create and run an Android Virtual Device.
2. Add the `Wait for Android Emulator` Step after the `AVD Manager` Step. This Step makes sure the Android emulator has finished booting before screen recording would start.
3. Add a `Script` Step after the `Wait for Android Emulator` Step. (We're renaming the inserted `Script` Step as `Start screen recording` to distinguish the functional difference between the 3 `Script` Steps in this workflow.)
   1. Insert the following commands to the `Script content` input field:

          $ANDROID_HOME/platform-tools/adb shell "screenrecord /sdcard/video.mp4 --verbose" &> $BITRISE_DEPLOY_DIR/logs.txt &
          disown
          
          $ANDROID_HOME/platform-tools/adb shell "screencap -p /sdcard/screen.png" &> $BITRISE_DEPLOY_DIR/logs.txt &
          disown

   `Start screen recording` Step kills to birds with one stone:
   * starts screen recording while UI test is running
   * captures a screenshot of the emulator screen
4. Add another `Script` Step after the `Start screen recording` Step. (We will call it `Run UI test` Step.)
   1. Add your script (for example, Maven, npm or Appium tests) in the `Script content` input field to call and run your UI test.

      ![](/img/ui-test-script.png)
5. Insert the third `Script` Step (`Stop Screen recording and get file from emulator` Step) after the `Run UI tests` Step.
   1. Add the following script to the `Script content` input field.

          $ANDROID_HOME/platform-tools/adb shell "killall -INT screenrecord"
          sleep 10
          $ANDROID_HOME/platform-tools/adb pull /sdcard/video.mp4 $BITRISE_DEPLOY_DIR/video.mp4
          adb pull /sdcard/screen.png $BITRISE_DEPLOY_DIR/

   As the title suggests, this Step stops the screen recoding, gets the recording/screenshot/logs from the Emulator and places them at the `BITRISE_DEPLOY_DIR` path.

       /opt/android-sdk-linux/platform-tools/adb shell 'killall -INT screenrecord' killall: screenrecord: No such process

   If you get the above error messages, the screen resolution of the screen recording and the device are in conflict. You can fix the resolution size:
   * in the `Script content` field of the `Start screen recording` Step or
   * check if you have the right resolution set in the `Resolution` field of the `AVD Manager` Step. ![](/img/screen-resolution-avd-manager.png)
6. Add the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step to your workflow to export the output of the UI test to the `APPS & ARTIFACTS` section of your Build's page. The Step will pull the recording and the screenshot from the repository (`BITRISE_DEPLOY_DIR`) specified in the previous step.