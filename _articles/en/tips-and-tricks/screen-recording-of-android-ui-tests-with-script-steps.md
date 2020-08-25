---
title: Screen recording of Android UI tests with Script Steps
redirect_from: []
date: 2019-01-30T13:47:29.000+00:00
menu:
  tips-and-tricks:
    weight: 6
    title: Screen recording of Android UI tests with Script Step

---
You can run your UI test specific to your Android app and have the whole process screen recorded using one Bitrise workflow. Here is an example workflow containing the steps we will use in this guide:

![](/img/screenrecording-workflow.png)

1. Add the `AVD Manager` Step at the beginning of your workflow to create and run an Android Virtual Device.
2. Add the `Wait for Android Emulator` Step after the `AVD Manager` Step. This Step makes sure that the Android emulator has finished booting before the screen recording would start.
3. Add a `Script` Step after the `Wait for Android Emulator` Step. (We're renaming this `Script` Step as `Start screen recording` Step.)
4. Insert the following commands to the `Script content` input field:

          $ANDROID_HOME/platform-tools/adb shell "screenrecord /sdcard/video.mp4 --verbose" &> $BITRISE_DEPLOY_DIR/logs.txt &
          disown
          
          $ANDROID_HOME/platform-tools/adb shell "screencap -p /sdcard/screen.png" &> $BITRISE_DEPLOY_DIR/logs.txt &
          disown

   `Start screen recording` Step kills two birds with one stone:
   * starts screen recording before UI testing
   * captures a screenshot of the emulator screen BEFORE the UI test would start
5. Add another `Script` Step after the `Start screen recording` Step. (We will call it `Run UI test` Step.)
   * Add your script (for example, Maven, npm or Appium tests) in the `Script content` input field to call and run your UI test.
6. Insert the third `Script` Step (`Stop Screen recording & get file from emulator`) after the `Run UI tests` Step.
7. Add the following script to the `Script content` input field.

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
   * gets those Emulator screenshots that had been taken before UI tests started
   * gets the final screenshot of the Emulator screen
   * places these files in the `BITRISE_DEPLOY_DIR` path
8. Add the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step to your workflow to export all files stored in the `BITRISE_DEPLOY_DIR` directory to `APPS & ARTIFACTS`. You can check these files at the `APPS & ARTIFACTS` tab of your Build's page. (Note that if you did not place the files in this directory, they will not be deployed to the `APPS & ARTIFACTS` tab of your Build's page.)

If your build fails due to `No such process` (error message below) or an `Encoder failed (err=-38)` error in your build log, most likely the screen resolution of the screen recording and the device does not match.

    /opt/android-sdk-linux/platform-tools/adb shell 'killall -INT screenrecord' killall: screenrecord: No such process

Here is what to check:

* Check if you have the right resolution set in the `Resolution` field of the `AVD Manager` Step. ![](/img/screen-resolution-avd-manager.png)
* If you're NOT using the `AVD Manager` Step to start the emulator (and use `Script` Step instead), then you can fix the screen size in the `Script content` field of the `Start screen recording` Step by specifying the width and height of the screen: `--size <WIDTHxHEIGHT>`.

{% include banner.html banner_text="Record Android UI tests with Bitrise" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}