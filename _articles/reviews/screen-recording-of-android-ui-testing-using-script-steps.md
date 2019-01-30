---
title: Screen recording of Android UI testing using Script Steps
redirect_from:
- ''
date: 2019-01-14 12:57:07 +0000
published: false

---
You can run your UI test specific to your app and have the whole process screen recorded using one Bitrise workflow. Let's see how to put together a workflow using our `AVD Manager`, `Wait for Android Emulator` and `Script` Steps! Here is an example workflow containing the steps we will use in this guide:

![](/img/screenrecording-workflow.png)

1. Add the `AVD Manager` Step at the beginning of your workflow (as a first step) to create and run an Android Virtual Device.
2. Add the `Wait for Android Emulator` Step after the `AVD Manager` Step. This Step makes sure that the Android emulator has finished booting before the screen recording would start.
3. Add a `Script` Step after the `Wait for Android Emulator` Step. (We're renaming this `Script` Step as `Start screen recording` Step.)
   * Insert the following commands to the `Script content` input field:

          $ANDROID_HOME/platform-tools/adb shell "screenrecord /sdcard/video.mp4 --verbose" &> $BITRISE_DEPLOY_DIR/logs.txt &
          disown
          
          $ANDROID_HOME/platform-tools/adb shell "screencap -p /sdcard/screen.png" &> $BITRISE_DEPLOY_DIR/logs.txt &
          disown

   `Start screen recording` Step kills two birds with one stone:
   * starts screen recording before UI testing
   * captures a screenshot of the emulator screen BEFORE the UI test would start
4. Add another `Script` Step after the `Start screen recording` Step. (We will call it `Run UI test` Step.)
   * Add your script (for example, Maven, npm or Appium tests) in the `Script content` input field to call and run your UI test.
5. Insert the third `Script` Step (`Stop Screen recording & get file from emulator`) after the `Run UI tests` Step.
   * Add the following script to the `Script content` input field.

          $ANDROID_HOME/platform-tools/adb shell "killall -INT screenrecord"
          sleep 10
          $ANDROID_HOME/platform-tools/adb pull /sdcard/video.mp4 $BITRISE_DEPLOY_DIR/video.mp4
          adb pull /sdcard/screen.png $BITRISE_DEPLOY_DIR/
          
          $ANDROID_HOME/platform-tools/adb shell "screencap -p /sdcard/screen2.png" &> $BITRISE_DEPLOY_DIR/logs.txt &
          disown
          
          adb pull /sdcard/screen2.png $BITRISE_DEPLOY_DIR/

   `Stop Screen recording & get file from emulator` Step does the following:
   * stops the screen recoding,
   * gets the screen recording,
   * gets those Emulator screenshots that were taken before UI tests had started
   * gets the final screenshot of the Emulator screen
   * places these files in the `BITRISE_DEPLOY_DIR` path
6. Add the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step to your workflow to export all files stored in the `BITRISE_DEPLOY_DIR` directory. You can check the files at the `APPS & ARTIFACTS` tab of your Build's page. (Note, that if you did not place the files in this directory, they will not be deployed to the APPS & ARTIFACTS tab of your Build's page.)

If you get a `No such process` (below) or an `Encoder failed (err=-38)` error in your build log, most likely the screen resolution of the screen recording and the device does not match.

    /opt/android-sdk-linux/platform-tools/adb shell 'killall -INT screenrecord' killall: screenrecord: No such process

Here is what to check:

* Check if you have the right resolution set in the `Resolution` field of the `AVD Manager` Step. ![](/img/screen-resolution-avd-manager.png)
* If you're NOT using the `AVD Manager` Step (and start the emulator with a `Script` Step), then you can fix the screen size (width and height) in the `Script content` field of the `Start screen recording` Step with `--size <WIDTHxHEIGHT>`