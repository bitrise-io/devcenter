---
title: Screen recording of Android UI testing using Script Steps
redirect_from:
- ''
date: 2019-01-14 12:57:07 +0000
published: false

---
You can run a UI test specific to your app and have the whole process screen recorded with one workflow. This way you can visually validate the app.

1. Add a second `Script` Step from the StepLib by clicking the `+` sign after 

Let's see how to put together a workflow using 3 `Script` Steps to set up screen recording with your specific/tailored unit test!

1. Add the `AVD Manager` Step to your workflow, preferably after any dependency installer step.
2. Add the `Wait for Android Emulator` Step after the `AVD Manager` Step. This Step makes sure the Android emulator has finished booting before recording would start.
3. Add a Script Step after the `Wait for Android Emulator` Step. (In our example workflow, we're calling it `Start screen recording` Step.)
4. Insert the following commands to the `Script content` input field:

       $ANDROID_HOME/platform-tools/adb shell "screenrecord /sdcard/video.mp4 --verbose" &> $BITRISE_DEPLOY_DIR/logs.txt &
       disown
       
       $ANDROID_HOME/platform-tools/adb shell "screencap -p /sdcard/screen.png" &> $BITRISE_DEPLOY_DIR/logs.txt &
       disown

   This Step kills to birds with one stone: will start screen recording while UI test is running and capture a screenshot of the emulator screen. 
5. Add another `Script` Step after the `Start screen recording` Step. (We will call it `Run UI test` Step.) 
6. Specify the UI test in the `Script content` input field that you want to get performed.
7. Add the third `Script` Step (called `Stop Screen recording and get file from emulator` Step) after the `Run UI tests`. This Step stops the screen recoding and gets the recording or the logs from the Emulator. 
8. Add the following script to the `Script content` input field.

       $ANDROID_HOME/platform-tools/adb shell "killall -INT screenrecord"
       sleep 10
       $ANDROID_HOME/platform-tools/adb pull /sdcard/video.mp4 $BITRISE_DEPLOY_DIR/video.mp4
       adb pull /sdcard/screen.png $BITRISE_DEPLOY_DIR/
9. Add the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step to your workflow to export the output of the UI test to the `APPS & ARTIFACTS` section of your Build's page. The step will pull the recording and the screenshot from the repository specified in the previous step.