---
# jp title missing
title: Screen recording of Android UI testing using Script Steps
redirect_from: []
date: 2019-01-14 12:57:07 +0000
published: false

---

{% include not_translated_yet.html %}

You can run a unit test specific to your app and have the whole process screen recorded so that you can visually validate the app. 

Let's see how to put together a workflow using 3 `Script` Steps!

1. Add the first `Script` Step after the `Install missing Android SDK components` workflow from the StepLib by clicking the `+` sign. We're renaming this Step as `Start screen recording` Step. 
2. Insert the following command to the `Script content` input field.

       $ANDROID_HOME/platform-tools/adb shell "screenrecord /sdcard/video.mp4" &> $BITRISE_DEPLOY_DIR/logs.txt &
       disown

   ![](/img/empty-script-content.png) This will start recording the screen while UI test is running. But first, let's add our UI testing Step!
3. Add the second `Script` Step from the StepLib by clicking the `+` sign after the `Start Screen recording`. We will name it `Run UI test` Step as the Step will perform the UI test that you specify in the `Script content` input field. 
4. Add the third `Script` Step (called `Stop Screen recording and get file from emulator` Step) from the StepLib by clicking the `+` sign after the `Run UI tests`. This Step stops the screen recoding and gets the recording or the logs from the Emulator. Add the following script to the `Script content` input field.

       $ANDROID_HOME/platform-tools/adb shell "killall -INT screenrecord"
       sleep 10
       $ANDROID_HOME/platform-tools/adb pull /sdcard/video.mp4 $BITRISE_DEPLOY_DIR/video.mp4
5. Add the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step to your workflow to export the output of the UI test to the `APPS & ARTIFACTS` section of your Build's page.

screenshots, no `AVD Manager` as a first step and then `Wait for Emulator` at the end?
